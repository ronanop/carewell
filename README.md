# Care Well Medical Centre

Marketing and patient-acquisition website for Care Well Medical Centre, built with **Next.js 14 (App Router)** and **Sanity** as the headless CMS. Includes a lead-capture pipeline, an OpenAI-powered skin-scan endpoint, programmatic SEO with `next-sitemap`, and a content/redirect migration workflow.

---

## Tech stack

- **Framework**: Next.js 14 (App Router, RSC)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, custom design tokens, Framer Motion
- **CMS**: Sanity (Studio mounted at `/studio`)
- **Forms**: React Hook Form + Zod
- **SEO**: `next-seo`, `next-sitemap`, JSON-LD
- **Analytics**: GTM (env-driven)
- **AI**: OpenAI vision (skin-scan endpoint)
- **Deploy target**: Vercel (Mumbai / `ap-south-1`)

---

## Getting started

### Prerequisites

- Node.js **>= 18.17** (Next 14 requirement)
- npm (lockfile is `package-lock.json`)

### Install and run

```bash
npm install
cp .env.example .env.local      # fill in values (see "Environment" below)
npm run dev                     # http://localhost:3000
```

Sanity Studio is served at <http://localhost:3000/studio> by the same Next dev server.

---

## Environment

All variables live in `.env.local` (gitignored). The template is `.env.example`.

| Variable                                      | Required | Purpose                                                                 |
| --------------------------------------------- | -------- | ----------------------------------------------------------------------- |
| `SITE_URL`                                    | yes (prod) | Canonical site URL used by `next-sitemap`                              |
| `NEXT_PUBLIC_SITE_URL`                        | yes      | Public base URL used client-side                                        |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`               | yes      | Sanity project id                                                       |
| `NEXT_PUBLIC_SANITY_DATASET`                  | yes      | Sanity dataset (default `production`)                                   |
| `SANITY_API_WRITE_TOKEN`                      | yes (writes) | Server-only token used by seed/patch scripts                        |
| `SANITY_PREVIEW_SECRET`                       | optional | Shared secret for Studio Presentation preview                           |
| `STUDIO_BASIC_AUTH_USER` / `_PASS`            | prod     | HTTP Basic Auth in front of `/studio` in production                     |
| `NEXT_PUBLIC_CLINIC_MAP_EMBED_URL`            | optional | Google Maps embed iframe `src`                                          |
| `GOOGLE_SHEETS_WEBHOOK_URL`                   | optional | Lead pipeline sink                                                      |
| `LEAD_WEBHOOK_URL`                            | optional | Lead pipeline sink                                                      |
| `SENDGRID_API_KEY` / `_FROM_EMAIL` / `_TO_EMAIL` | optional | Email notifications for leads                                        |
| `LEAD_WHATSAPP_WEBHOOK_URL`                   | optional | WhatsApp lead notifier                                                  |
| `GOOGLE_PLACES_JSON`                          | optional | Inline JSON snapshot of Google reviews (fallback when no Places fetch) |
| `OPENAI_API_KEY`                              | required for `/skin-scan` | OpenAI key for vision analysis (**server-only**)        |
| `OPENAI_SKIN_MODEL`                           | optional | Vision-capable model override (default `gpt-4o`)                        |
| `OPENAI_BASE_URL`                             | optional | Custom OpenAI base (Azure / proxy)                                      |
| `YOUTUBE_API_KEY` / `YOUTUBE_CHANNEL_ID`      | optional | Latest YouTube videos block                                             |
| `NEXT_PUBLIC_GTM_ID`                          | optional | Google Tag Manager container id                                         |

> **Security**: never commit real secrets. `.env`, `.env.local`, and `.env.*` are all gitignored. Only `.env.example` is tracked.

---

## NPM scripts

| Script                          | What it does                                              |
| ------------------------------- | --------------------------------------------------------- |
| `npm run dev`                   | Next dev server on `:3000`                                |
| `npm run build`                 | Production build (runs `next-sitemap` via `postbuild`)    |
| `npm start`                     | Run the built app                                         |
| `npm run lint`                  | ESLint                                                    |
| `npm run studio`                | Standalone Sanity Studio (`sanity dev`)                   |
| `npm run sanity:build`          | Build the Studio bundle                                   |
| `npm run sanity:seed`           | Seed content into Sanity (requires `SANITY_API_WRITE_TOKEN`) |
| `npm run sanity:list-services`  | List existing service docs for an import                  |
| `npm run seo:audit`             | Scripted SEO checks                                       |
| `npm run redirects:verify`      | Validate `redirects.migration.json`                       |
| `npm run redirects:legacy`      | Sync legacy redirect rules into the migration file        |
| `npm run bundle:report`         | Print Next bundle sizes                                   |
| `npm run reviews:fetch`         | Snapshot Google reviews to local JSON                     |
| `npm run youtube:latest`        | Example call to YouTube Data API                          |
| `npm run analyze`               | Build with `@next/bundle-analyzer`                        |

---

## Project structure

```
src/
  app/                 # Next App Router pages, route handlers, middleware
    (site)/            # Marketing site routes (home, services, blog, etc.)
    api/               # Lead, revalidate, skin-scan, draft-mode endpoints
    studio/            # Embedded Sanity Studio
  components/          # UI + page sections
  lib/                 # Helpers (analytics, motion, reviews, hreflang, ...)
  sanity/              # Queries, structure, schema imports
sanity/                # Schema types (documents, objects)
scripts/               # One-off CLIs (seed, audits, migrations)
docs/                  # Operational runbooks (SEO, lead pipeline, UAT, ...)
data/                  # Static data (legacy URL map, review snapshot template)
public/                # Static assets
middleware.ts          # Sanity-driven redirects
next.config.mjs        # Build-time redirects + bundle analyzer
next-sitemap.config.js # Sitemap generation
```

Operational runbooks (UAT, analytics QA, redirect migration, SEO validation, CWV evidence) live under `docs/`.

---

## Deployment (Vercel)

1. Push this repo to GitHub (see below).
2. In Vercel, **Import Project** from the GitHub repository.
3. Framework preset: **Next.js** (auto-detected). Build command and output dir are defaults.
4. Set the **Production Region** to `Mumbai (bom1 / ap-south-1)`.
5. Add every variable from `.env.example` under **Project Settings → Environment Variables**:
   - Use the real values from your local `.env.local`.
   - Mark `OPENAI_API_KEY`, `SANITY_API_WRITE_TOKEN`, `STUDIO_BASIC_AUTH_*`, `SENDGRID_API_KEY`, and webhook URLs as **Sensitive**.
6. Deploy. The `postbuild` step regenerates `sitemap.xml` automatically.
7. After the first deploy, set up:
   - A custom domain + HTTPS (in Vercel).
   - Sanity Studio CORS origins (`Sanity Manage → API → CORS Origins`) for the production domain.
   - Studio Basic Auth (`STUDIO_BASIC_AUTH_USER` / `_PASS`) so `/studio` isn't public.

> Reviewing changes from PRs: enable Vercel Preview Deployments — every GitHub PR gets a preview URL.

---

## Pushing to GitHub

This repo is already initialised with git. To publish it:

```bash
# 1. Create an empty private repository on GitHub (no README, no .gitignore, no license).
# 2. Link it as the remote:
git remote add origin git@github.com:<your-org>/<your-repo>.git
# or with HTTPS:
git remote add origin https://github.com/<your-org>/<your-repo>.git

# 3. Stage & commit any pending changes
git add -A
git commit -m "Prep repo for GitHub deploy"

# 4. Push
git branch -M main
git push -u origin main
```

If you're using GitHub CLI:

```bash
gh repo create <your-org>/<your-repo> --private --source . --remote origin --push
```

---

## Pre-launch checklist

See [`HANDOVER.txt`](./HANDOVER.txt) for the full developer handover checklist (PageSpeed targets, Rich Results Test, Search Console submission, CMS training, etc.).

---

## License

Proprietary — All Rights Reserved. See [`LICENSE`](./LICENSE).
#   c a r e w e l l  
 