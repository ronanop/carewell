# Care Well Website Backend Context (Built So Far)

This document captures the backend implementation status of the project as it exists today. It is written to be shareable with developers, QA, ops, and stakeholders.

## 1) Backend architecture at a glance

- Framework/runtime: Next.js 14 App Router (`src/app`) with server-rendered routes and route handlers.
- Content backend: Sanity CMS (headless) for most dynamic content and redirect rules.
- API layer: Next.js route handlers under `src/app/api`.
- Data access: centralized through `src/sanity/client.ts` and GROQ queries in `src/sanity/queries.ts`.
- Revalidation strategy: ISR on major content pages (`revalidate = 60`) plus webhook-triggered `revalidatePath`.
- Redirect layer:
  - Build-time redirects from `redirects.migration.json` loaded by `next.config.mjs`.
  - Runtime redirects from Sanity `redirect` documents via `middleware.ts`.
- External backend integrations (env-driven):
  - Lead sinks: Google Sheets webhook, generic webhook, SendGrid email API, WhatsApp webhook.
  - YouTube API read (latest videos helper).
  - Reviews snapshot from file/env (no always-on live Places fetch in app runtime).

## 2) Current backend surface area

### API endpoints

1. `POST /api/lead` (`src/app/api/lead/route.ts`)
   - Validates payload via Zod.
   - Lightweight in-memory per-IP rate limiting.
   - Honeypot field (`website`) to silently block bots.
   - Fan-out delivery to optional channels:
     - `GOOGLE_SHEETS_WEBHOOK_URL`
     - `LEAD_WEBHOOK_URL`
     - SendGrid (`SENDGRID_API_KEY` + mail envs)
     - `LEAD_WHATSAPP_WEBHOOK_URL`
   - Returns channel-wise statuses.

2. `POST /api/revalidate` (`src/app/api/revalidate/route.ts`)
   - Auth via header `x-webhook-secret` matching `SANITY_REVALIDATE_SECRET`.
   - Revalidates baseline paths (`/`, `/blog`, `/gallery`).
   - Can revalidate explicit `paths[]`.
   - Adds dynamic path for `service` and `blogPost` when `slug` is provided.

3. `GET /api/draft` (`src/app/api/draft/route.ts`)
   - Enables Next.js draft mode for Studio Presentation preview.
   - Requires `secret` query param matching `SANITY_PREVIEW_SECRET`.
   - Redirect target comes from `redirect` query param.

4. `GET /api/disable-draft` (`src/app/api/disable-draft/route.ts`)
   - Disables draft mode and redirects to site base URL.

### Middleware

- `middleware.ts`:
  - Skips `_next`, `api`, and `studio` paths.
  - Fetches Sanity `redirect` docs using query API.
  - In-memory cache (TTL 60s) for redirect list.
  - Supports 301/302 behavior based on stored status code.
  - Matches exact and trailing-slash variants.

## 3) Content backend (Sanity)

### Configuration and embedding

- `sanity.config.ts`
  - Studio embedded at `/studio` (`basePath: "/studio"`).
  - Uses Structure tool, Presentation tool, Vision tool.
  - Preview mode wired to `/api/draft`.
- Studio route component: `src/app/studio/[[...tool]]/page.tsx`.

### Environment and client

- `src/sanity/env.ts`
  - `apiVersion = "2024-01-01"`.
  - Dataset/project values derived from env.
- `src/sanity/client.ts`
  - Lazy singleton Sanity client.
  - `useCdn: true` for reads.
  - `sanityFetch` helper returns `null` on failure to keep rendering resilient.

### Schema currently defined

From `sanity/schemaTypes/index.ts`:

- Documents:
  - `siteSettings`
  - `navigation`
  - `redirect`
  - `serviceCategory`
  - `service`
  - `blogPost`
  - `author`
  - `galleryItem`
  - `testimonial`
  - `hyperlocalPage`
- Objects:
  - `seo`
  - `quickFact`
  - `howItWorksStep`
  - `faqItem`
  - `beforeAfterCase`
  - `blockContent`

### Query layer

- GROQ queries are centralized in `src/sanity/queries.ts`.
- This file powers:
  - global settings/navigation,
  - service/category pages,
  - blog listing/article pages,
  - gallery/testimonials/hyperlocal pages,
  - redirect extraction.

## 4) Rendering and caching model

### ISR usage

Pages like home, service detail, blog detail set `revalidate = 60`, so they:
- serve static output,
- refresh at most every 60s after stale request,
- can be manually revalidated via `/api/revalidate`.

### Static params generation

- Service/blog dynamic routes prebuild slugs via Sanity queries (`generateStaticParams`).
- This gives pre-rendering for known content while retaining ISR updates.

### Metadata generation

- Dynamic metadata (`generateMetadata`) is derived from CMS content for canonical + SEO fields.

## 5) Lead pipeline (current behavior)

### Input contract

`/api/lead` expects:
- `name`
- `mobile`
- `treatment`
- optional attribution/context fields: `pageUrl`, `utmSource`, `utmMedium`, `utmCampaign`, `source`, `website`

### Processing flow

1. Determine client IP from headers.
2. Apply in-memory rate-limit guard.
3. Parse JSON + validate with Zod schema.
4. Build payload with `createdAt`.
5. Bot short-circuit if honeypot field is filled.
6. Execute outbound jobs in parallel (`Promise.allSettled`).
7. Return `ok + statuses`.

### Delivery characteristics

- Channel integration is optional and non-blocking.
- One failing channel does not fail the entire request.
- Status matrix returned per channel: `sent`, `failed`, `skipped`.

## 6) Redirect system (dual-layer)

### A) Build-time migration redirects

- Source map: `data/legacy-url-map.json`.
- Generator script: `scripts/sync-legacy-redirects.mjs`.
- Output: `redirects.migration.json`.
- Next.js loads this in `next.config.mjs` via `redirects()`.

### B) Runtime CMS redirects

- Source of truth: Sanity `redirect` documents.
- Applied by `middleware.ts`.
- Useful for post-deploy redirect updates without code deploy.

## 7) Auxiliary backend data sources

### Reviews

- `src/lib/reviews.ts`
  - Read order:
    1. `data/reviews-snapshot.json` (if present)
    2. `GOOGLE_PLACES_JSON` env
    3. hardcoded fallback

### YouTube

- `src/lib/youtube.ts`
  - Reads latest videos from YouTube API when keys exist.
  - Uses fetch revalidation of 3600 seconds.
  - Returns fallback placeholder when not configured.

## 8) SEO backend outputs

- `src/app/sitemap.ts`
  - Builds sitemap entries from static routes + CMS service/blog slugs.
- `src/app/robots.ts`
  - Allows all crawlers except `/studio/` and `/api/`.
  - Publishes sitemap and host values based on `getSiteUrl()`.

## 9) Environment variables (backend-relevant)

From `.env.example` and usage:

- Core site/runtime:
  - `SITE_URL`
  - `NEXT_PUBLIC_SITE_URL`
- Sanity:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `SANITY_API_WRITE_TOKEN` (scripts/seed writes)
  - `SANITY_PREVIEW_SECRET`
  - `SANITY_REVALIDATE_SECRET` (used in code, should be present in deployment env)
- Lead pipeline:
  - `GOOGLE_SHEETS_WEBHOOK_URL`
  - `LEAD_WEBHOOK_URL`
  - `SENDGRID_API_KEY`
  - `SENDGRID_FROM_EMAIL`
  - `SENDGRID_TO_EMAIL`
  - `LEAD_WHATSAPP_WEBHOOK_URL`
- Content enrichers:
  - `GOOGLE_PLACES_JSON`
  - `YOUTUBE_API_KEY`
  - `YOUTUBE_CHANNEL_ID`

## 10) Scripts that act as backend operations

From `package.json`:

- `npm run sanity:seed`
  - Seeds baseline CMS documents (settings, nav, categories, services, blogs, etc.).
  - Also seeds legacy-mapped services if mapping file exists.
- `npm run redirects:legacy`
  - Rebuilds `redirects.migration.json` from legacy map.
- `npm run redirects:verify`
  - Validates redirect behavior (script exists in repo).
- `npm run reviews:fetch`
  - Pulls review snapshot through helper script.
- `npm run sanity:list-services`
  - Utility for content migration/listing.
- `npm run youtube:latest`
  - Tests YouTube latest pull setup.

## 11) Security and reliability notes (current state)

- `api/lead` protections are basic:
  - in-memory rate limiting (resets on cold start/redeploy; not shared across instances),
  - honeypot field,
  - no CAPTCHA currently.
- Secrets are env-driven, but:
  - `/api/revalidate` secret is code-dependent and should be explicitly set in all environments.
- `sanityFetch` swallows query errors and returns null:
  - improves resilience,
  - but can hide observability unless logs/monitoring are added.
- Middleware redirect fetch uses public Sanity query endpoint with no-store; cache is process-local only.

## 12) What is complete vs pending

### Built and operational in code

- End-to-end CMS-backed content model and read path.
- Embedded Studio + preview draft mode endpoints.
- ISR + webhook revalidation endpoint.
- Lead capture endpoint with multi-channel fan-out.
- Dual redirect architecture (build + runtime).
- Sitemap/robots generated from backend data.

### Partially implemented or operationally pending

- Live review ingestion is not native runtime; currently snapshot/env based.
- YouTube feed is helper-based and env-dependent; no background sync pipeline.
- Lead abuse prevention is basic; no persistent distributed rate limiter.
- Formal observability pipeline (structured logs/alerts) is not defined in code.
- Content volume targets (127+ services / 200+ blogs) depend on editorial scale-up, not template limits.

## 13) End-to-end request/data flow examples

### Service page load

1. Request hits route `/services/[slug]`.
2. Page fetches service document via GROQ (`serviceBySlugQuery`).
3. Page fetches site settings (`siteSettingsQuery`) for contact context.
4. ISR cache serves/stales per 60s policy.
5. If content changes in Sanity, webhook can trigger `/api/revalidate` to refresh specific paths.

### Lead submission

1. Browser submits form to `/api/lead`.
2. Payload validated + anti-abuse checks.
3. Backend fans out to enabled channels.
4. Response returns channel statuses.
5. Frontend flow continues to thank-you and optional downstream tracking.

### Legacy URL handling

1. Static redirect from Next config may resolve immediately (build-time map).
2. If not covered there, middleware checks live Sanity redirect docs.
3. Matching runtime rule redirects user with 301/302.

## 14) Suggested handover talking points

- Backend is CMS-first and mostly server-rendered with ISR.
- Business-critical backend endpoints are `lead`, `revalidate`, and draft-mode toggles.
- Redirect control is intentionally split: bulk migration redirects in code, day-to-day redirects in CMS.
- Operations team should own env secret management and webhook configuration.
- Next hardening step is production-grade rate limiting + monitoring around lead and revalidation endpoints.

