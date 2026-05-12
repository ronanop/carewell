# SEO and Schema Validation

## Prerequisites

- App running locally: `npm run dev`
- Seed/content published in Sanity

## Automated check

```bash
npm run seo:audit
```

Optional base URL:

```bash
set SEO_AUDIT_BASE_URL=https://staging.your-domain.com && npm run seo:audit
```

## What it validates

- HTTP status = 200 for key routes
- Canonical tag exists
- Breadcrumb JSON-LD exists
- Service pages include FAQPage + MedicalProcedure JSON-LD
- Blog article pages include BlogPosting JSON-LD
- Service pages include `hi-IN` hreflang tag

## Manual validation (required before launch)

1. Test Rich Results on:
   - `/`
   - `/services/[slug]`
   - `/blog/[slug]`
   - `/about/dr-bhasin`
2. Validate sitemap URLs:
   - `/sitemap.xml`
   - `/sitemap-0.xml`
3. Confirm page-level metadata in browser source:
   - title
   - meta description
   - canonical
   - OG tags

