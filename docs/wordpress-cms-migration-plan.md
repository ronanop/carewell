# WordPress → CMS migration plan

**Goal:** Move all 127 legacy sitemap URLs from carewellmedicalcentre.com into the new Next.js site with **exact URL slugs**, **same copy**, **images**, and **readable structure** (headings, lists, FAQs) — served via CMS + catch-all routes, not 92 hand-built `page.tsx` files.

**Target timeline:** 1–2 days bulk import + 1–2 days QA / image pass.

**Status today (June 2026):** 35 URLs live as static pages; 92 missing. Scraper, sync scripts, and import pipeline exist but need upgrades for **HTML + images + legacyPath matching** before high-fidelity import.

---

## What “exact” means (set expectations)

| Dimension | Target | Notes |
|-----------|--------|-------|
| **URL slugs** | Exact match | `/plastic-surgery-in-delhi/liposuction/arms/` etc. via `Service.legacyPath` + `[...path]/page.tsx` |
| **Copy / SEO** | Word-for-word from WP | Title, meta description, H1, body, FAQs from scrape |
| **Structure** | Same hierarchy | H2/H3, paragraphs, bullet lists, tables, inline images |
| **Images** | Same assets, new CDN | Re-host `wp-content/uploads` → Cloudinary; preserve alt text |
| **Typography** | Care Well design system | **Not** WordPress theme fonts (Rishi). Body uses `PortableBody` → `font-heading` / `text-navy` — same as rest of new site |
| **Page chrome** | New site layout | Hero, sidebar, lead form, breadcrumbs — generic `ServicePageSections` unless page is upgraded to a custom component later |

The 35 hand-built pages (liposuction hub, botox, rhinoplasty, etc.) use richer custom sections. Migrated pages use the CMS template first; high-traffic pages can be upgraded to custom `*TreatmentPageSections` in a later sprint.

---

## Architecture

```
WordPress (live)
    │
    ▼
/admin/scraper  ──►  ScrapePreview (HTML + text + images + FAQs)
    │
    ├──► [Phase A] Direct JSON import (recommended after eng work)
    │         └──► PostgreSQL Service (legacyPath + whatIsBody + heroImageId + faqs)
    │
    └──► [Phase B] PDF ZIP → scrape:import (current path; upgrade import script)
              └──► same DB

PostgreSQL Service.legacyPath
    │
    ▼
frontend/(site)/[...path]/page.tsx  →  LegacyServicePage  →  ServicePageSections
```

**Static pages win:** Routes in `PROTECTED_SITE_PATHS` (`next.config.mjs`) keep their dedicated `page.tsx` and are not replaced by CMS.

---

## Pre-flight checklist

- [ ] `.env.local` has `DATABASE_URL`
- [ ] Cloudinary configured: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `CLOUDINARY_FOLDER=carewell-media`
- [ ] `NEXT_PUBLIC_SITE_URL` set to production domain
- [ ] Dev stack runs: `npm run dev` (frontend + backend API for `/admin/scraper`)
- [ ] Old site sitemap saved as `db/seed/legacy-scrape-sitemap.xml` (already present — 127 URLs)
- [ ] Confirm `db/seed/legacy-sitemap-pages.json` matches production sitemap (already synced)

---

## Engineering work (do this before bulk import)

These gaps block **exact content + images** with the current PDF-only pipeline.

### 1. Fix `legacyPath` matching on import (critical — ~1 hr)

**Problem:** `cms:sync-legacy-sitemap` creates slugs like `plastic-surgery-in-delhi--liposuction--arms`, but `scrape:import` keys by short `oldSlug` (`arms`). Result: correct URL shows “Coming Soon” while content sits on a wrong row.

**Fix:** In `backend/scripts/import-scrape-pdfs.mjs` (or new `import-scrape-json.mjs`):

- Upsert by `legacyPath` from scrape metadata, not short slug
- Set `legacyPath`, `seoCanonicalUrl`, and `id` from `slugFromLegacyPath(legacyPath)` (same helper as sync script)
- Never create duplicate rows

### 2. Store HTML body, not plain text only (~3–4 hrs)

**Problem:** `portableTextFromBody()` in `backend/scripts/lib/sanity-portable.mjs` flattens PDF text to paragraphs. **Inline images, lists, tables, and links are lost.**

**Fix:**

- Add `bodyHtml` to `ScrapePreview` in `scraper-parse.ts` — serialize cleaned `.entry-content` inner HTML (strip scripts, nav, cookie banner, FAQ blocks already extracted separately)
- Add server-side `htmlToPortableText` in `backend/scripts/lib/html-to-portable.mjs` (port logic from `frontend/src/lib/portable-text/from-html.ts` using `linkedom` or `jsdom`)
- Import pipeline: `bodyHtml` → portable text with `h2`, `h3`, `ul`, `ol`, `blockquote`, `image` blocks

### 3. Image migration pipeline (~4–6 hrs)

**Problem:** Scraper resolves `data-src` / `src` on treatment cards but **does not** import body images into `whatIsBody` or `heroImageId`.

**Fix — new script `backend/scripts/migrate-wp-images.mjs`:**

1. Input: list of WP image URLs from scrape (hero `og:image`, featured image, all `<img>` in entry content)
2. Download each asset (respect rate limits)
3. `uploadToCloudinary()` (`backend/src/lib/cloudinary.ts`)
4. Create `Media` row; rewrite URLs in portable text to `cloudinary:public_id` or resolved CDN URL
5. Set `Service.heroImageId` from WP featured / first content image

**Interim (faster, lower quality):** Allow `next.config.mjs` `images.remotePatterns` for `www.carewellmedicalcentre.com` and store absolute WP URLs in image blocks until Cloudinary pass completes. Existing static pages already hotlink WP this way (`liposuction-in-delhi.ts`).

### 4. Direct JSON import API (optional but saves hours — ~2–3 hrs)

**Problem:** PDF export → unzip → `scrape:import` adds manual steps and loses structure.

**Fix:** New route `POST /api/admin/scraper/import` that accepts batch `ScrapePreview[]` and writes to DB via `upsertServiceFromAdmin`, including `legacyPath`. Admin UI: “Import to CMS” button after batch scrape.

### 5. Scraper enhancements for WP quirks (~2 hrs)

- Resolve LiteSpeed lazy images (`data-src`, placeholder SVGs)
- Extract `og:image` / `twitter:image` for hero
- Extract YouTube embeds → `youtubeVideoId` on Service row
- Skip cookie banner, hello bar, related posts widgets (already partially in `EXCLUDED_CONTENT_SELECTORS`)
- Run against `backend/scripts/fixtures/scraper-sample-entry.html` + `npm run test:scraper`

### 6. Typography / styles (no WP CSS — ~30 min verify)

CMS content renders through `PortableBody` (`frontend/src/components/content/PortableBody.tsx`):

- H2: `font-heading text-2xl font-bold text-navy`
- Body: `text-navy/90`
- Lists, blockquotes, links already styled

**Action:** After HTML import, spot-check 5 pages. If WP used bold/color inside paragraphs, ensure `strong`, `em`, and `a` marks survive HTML → portable conversion. Extend `htmlToPortableText` if WP uses `<h4>` / `<h5>` (map to `h3` or add styles).

---

## Execution phases

### Phase 0 — Engineering (Day 0, ~1 day)

| Task | Owner | Done when |
|------|-------|-----------|
| legacyPath import fix | Dev | Import updates row at `/plastic-surgery-in-delhi/liposuction/arms` |
| HTML → portable text (server) | Dev | Lists + images appear in `whatIsBody` |
| Image script or WP remotePatterns interim | Dev | Images visible on imported page |
| Test 3 URLs end-to-end | Dev | liposuction/arms, botox/forehead-lines, iv-therapy/glutathione |

### Phase 1 — URL shells (5 min)

```bash
npm run cms:sync-legacy-sitemap
```

Creates 126 `Service` rows with correct `legacyPath`. Pages show “Coming Soon” until content import.

**Do not re-run after import** — it deletes all services.

### Phase 2 — Scrape WordPress (2–4 hrs)

1. Open `/admin/scraper`
2. Upload `db/seed/legacy-scrape-sitemap.xml` (or live sitemap index)
3. **Exclude** URLs already built as static pages if you don’t want to re-scrape (optional — static routes ignore CMS anyway)
4. Batch scrape in chunks of 200 (one batch covers all 127)
5. After eng work in Phase 0: click **Import to CMS** OR download ZIP → `npm run scrape:import`

**Priority order if doing manual batches:**

1. Liposuction sub-pages (9) — parent already live
2. Laser hair removal sub-pages (9)
3. Hair transplant (FUE, FUT, repair, body-hair, graft-calculator, location pages)
4. Plastic surgery gaps (gynecomastia, mommy makeover, breast lift/reduction, etc.)
5. Skin treatments (chemical peel, hydrafacial, laser tattoo removal, …)
6. Whole missing categories: IV therapy, urology, proctology, holistic wellness, hyperbaric

### Phase 3 — Images (4–8 hrs, can parallelize)

```bash
# After script exists:
node backend/scripts/migrate-wp-images.mjs --from-scrape ./path/to/batch-results.json
```

Or bulk Cloudinary fetch from WP uploads folder if you have server/export access.

### Phase 4 — Redirects & sitemap (5 min)

```bash
npm run redirects:legacy
npm run cms:import-redirects
```

Rebuild / redeploy so `sitemap-0.xml` includes CMS paths (`listLegacySitemapPaths` in catch-all `generateStaticParams`).

### Phase 5 — QA (4–8 hrs)

**Per-page checklist (sample 20% + all money pages):**

- [ ] URL returns 200 at exact legacy path (with trailing slash)
- [ ] Title + meta description match WP (view source / SEO tab in admin)
- [ ] H1 matches
- [ ] Body paragraph count within ~5% of WP (word count compare)
- [ ] All images load (no broken `data-src` placeholders)
- [ ] FAQs present and match (accordion + JSON-LD if used)
- [ ] Internal links point to legacy paths on new site (fix `/services/` links in content)
- [ ] Mobile layout readable
- [ ] PageSpeed acceptable (images WebP on Cloudinary)

**Automated helpers (already in repo):**

- `npm run test:scraper` — parser regression
- `backend/scripts/seo-audit.mjs` — key routes

### Phase 6 — Launch / SEO

- Submit updated sitemap in Google Search Console
- Keep old WordPress live until GSC shows new URLs indexed
- 301 only where slug intentionally changed (`/about/dr-sandeep-bhasin` → `/about/dr-bhasin`)
- Monitor Search Console for 404s on legacy paths

---

## Page tiers (what gets custom treatment later)

| Tier | Count | Approach |
|------|-------|----------|
| **A — Already static** | 35 | Keep `page.tsx` + `*TreatmentPageSections`. Optionally re-sync copy from WP into data files if drifted |
| **B — CMS imported** | 92 | `LegacyServicePage` + generic template. Fast migration |
| **C — Upgrade to custom** | Top 10–15 by traffic | After launch: build `LiposuctionArmsTreatmentPageSections` etc. like liposuction hub |

Do **not** block Tier B launch waiting for Tier C.

---

## Commands reference

```bash
# Register all legacy URL shells
npm run cms:sync-legacy-sitemap

# Scrape import (after PDF export or when JSON import exists)
npm run scrape:import
npm run scrape:import -- --dry-run
npm run scrape:import -- --only=plastic-surgery-in-delhi--liposuction--arms

# Redirects
npm run redirects:legacy
npm run cms:import-redirects

# Tests
npm run test:scraper
npm run test:scraper:live
```

---

## Risks & mitigations

| Risk | Mitigation |
|------|------------|
| Plain-text import loses images/lists | Complete Phase 0 HTML pipeline before bulk import |
| legacyPath / slug mismatch | Upsert by `legacyPath`; single source of truth in sync script |
| WP shuts down before images migrated | Cloudinary pass in Phase 3; interim `remotePatterns` for WP domain |
| Generic template looks weaker than WP | Accept for v1; upgrade Tier C pages; hero + before/after blocks via admin |
| `sync-legacy-sitemap` wipes DB | Run once before import; backup DB first |
| Duplicate content on static + CMS | Static routes take precedence; no duplicate URLs |

---

## Definition of done

- [ ] All 127 sitemap paths return 200 (not 404)
- [ ] 92 previously missing pages show full WP copy (not “Coming Soon”)
- [ ] Images hosted on Cloudinary (or approved interim WP hotlink)
- [ ] FAQs and meta tags match WP
- [ ] Typography uses site design system with correct heading/list structure
- [ ] Redirects and sitemap updated
- [ ] QA sample signed off on highest-traffic 20 pages

---

## Next step

Implement **Phase 0 engineering** (legacyPath fix + HTML import + images), then run **Phase 1 → 2** on a **3-page pilot** before full 92-page batch.

Switch to Agent mode and ask to *implement Phase 0* to start execution.
