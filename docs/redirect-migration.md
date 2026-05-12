# Redirect Migration QA

## 1) Build redirect map

- Crawl old site (Screaming Frog or equivalent)
- Map each old URL to new URL
- Fill [`redirects.migration.json`](c:\Users\risha\OneDrive\Desktop\carewellsite\redirects.migration.json)

Accepted keys per row:

- `{ "from": "/old-url", "to": "/new-url", "permanent": true }`
- or Next-style keys `{ "source": "...", "destination": "..." }`

## 2) Validate locally/staging

```bash
npm run redirects:verify
```

Optional base URL:

```bash
set REDIRECT_AUDIT_BASE_URL=https://staging.your-domain.com && npm run redirects:verify
```

## 3) Runtime checks

- Confirm middleware redirect docs in Sanity still work for editorial redirects.
- Confirm migration redirects in `next.config.mjs` work for legacy URLs.
- Verify no critical 404s in Search Console after launch.

