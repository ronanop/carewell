# CWV Evidence Pack Checklist

This file tracks the mandatory pre-handover evidence from the brief.

## Automated

1. Build app:
   - `npm run build`
2. Check chunk sizes:
   - `npm run bundle:report`
3. Optional visual bundle analysis:
   - `npm run analyze`

## Manual screenshots (required)

- [ ] PageSpeed Mobile > 85 (Homepage) with URL visible
- [ ] PageSpeed Mobile > 85 (Service page #1) with URL visible
- [ ] PageSpeed Mobile > 85 (Service page #2) with URL visible
- [ ] PageSpeed Desktop > 95 (Homepage) with URL visible

## Manual CWV values

- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] INP < 200ms
- [ ] No render-blocking resources in PSI
- [ ] Hero image optimized (WebP, eager/high priority)
- [ ] Third-party scripts loaded non-blocking

## Artifacts to save

- `docs/evidence/pagespeed-home-mobile.png`
- `docs/evidence/pagespeed-service1-mobile.png`
- `docs/evidence/pagespeed-service2-mobile.png`
- `docs/evidence/pagespeed-home-desktop.png`
- `docs/evidence/cwv-metrics.txt`

