# Sanity Seed and Initial Content Plan

Use this after Sanity project setup to load priority launch content.

## 1) Environment

Set these values in `.env.local`:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` (usually `production`)
- `SANITY_API_WRITE_TOKEN` (write-enabled token)

## 2) Run seed

```bash
npm run sanity:seed
```

This creates baseline documents:

- Site settings + navigation
- 5 category hubs
- 12 service pages (including Hindi examples)
- Author + 10 blog posts (pillar/cluster mix)
- Gallery, testimonial, one hyperlocal page
- One redirect sample

## 3) After seed in Studio

- Replace all placeholder copy with approved medical/editorial copy.
- Upload real, consented images (hero, before/after, blog cover).
- Ensure every service has:
  - 8+ FAQs
  - pricing range
  - related services
  - SEO title/description
- Ensure Hindi pages are linked with English equivalents via SEO alternate references.

## 4) High-priority editorial order

1. Top 20 services (English + Hindi where planned)
2. Hair/Vitiligo pillar + cluster blogs
3. About Dr. Bhasin authority content
4. Hyperlocal pages for Faridabad/Noida/Gurgaon

