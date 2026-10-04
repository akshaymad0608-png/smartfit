# SEO implementation report — FitSmart

Implemented 2026-10-04 on branch `claude/seo-toolkit`.

## What was added

| File | Purpose |
|---|---|
| `scripts/seo-validate.mjs` | Zero-dependency validator for the build output: titles, descriptions, duplicates, canonicals, robots/googlebot directives, headings, Open Graph/Twitter, images without `alt`, JSON-LD validity and pitfalls, sitemap consistency (noindex pages, missing files, wrong host, collapse), broken internal links, orphan pages, `robots.txt`, `ads.txt`, important pages being indexable. Exit code 1 on errors. |
| `scripts/gsc-analyze.mjs` | Reads Search Console CSV exports and writes `reports/gsc-opportunities.md`: branded vs non-branded, low-CTR, positions 5–20, zero-click, question and long-tail queries, declining pages (with a previous export), cannibalisation and intent mismatches (with `QueryPage.csv`). |
| `scripts/seo-report.mjs` | Builds a self-contained local dashboard `reports/seo-dashboard.html` from the two reports. No server, no credentials, not deployed. |
| `seo.config.json` | Origin, build folder, important pages, sitemap floor, brand terms. |
| `.github/workflows/seo.yml` | Runs the validator in CI on every PR and on `main`. |
| `SEO_*.md` | These four documents. |
| `package.json` | `seo:validate`, `seo:gsc`, `seo:report` scripts. |
| `.gitignore` | `reports/` and `seo-data/` (generated output and private exports) are not committed. |

## Site changes in this pass

- `package.json`: `seo:*` scripts. `.gitignore`: `reports/`, `seo-data/`.

## Validation

Command: `npm run build && node scripts/seo-validate.mjs`

- 38 pages scanned (36 indexable, 2 noindex), 36 sitemap URLs.
- **0 errors**, 18 warnings, 10 notes (full list in `SEO_AUDIT_REPORT.md`).
- Production build passes.
- Lighthouse (local baseline) is recorded in `SEO_AUDIT_REPORT.md`; no improvement is claimed from this PR because it does not change performance.

## Remaining technical issues

- 18 pages are thin in static HTML (about, legal pages, program pages at ~100 words). The four `/programs/*` pages only have a summary and highlights: they need real, visible week-by-week content (sessions, exercises, progression). This is a content task, not something to fake in the prerender.
- `/programs` has 106 impressions at average position 47: the clearest opportunity once the program pages have real content.
- Lighthouse LCP element is the decorative 5%-opacity `hero-bg.jpg`. Either drop it, serve it as a small WebP, or preload it on `/` only. React 18 does not recognise the camelCase `fetchPriority` prop, so use a plain `<link rel="preload">` injected for the home route by `prerender.mjs`.
- Brand collision: consider a more distinctive brand phrase in titles/H1 (for example "FitSmart India fitness calculators") and keep building real backlinks.

## Search Console setup

1. Open <https://search.google.com/search-console> and add a **Domain** property for `fitsmart.space` (DNS TXT verification) so http/https/www variants are all covered. A URL-prefix property for `https://fitsmart.space/` also works.
2. **Sitemaps** → submit `https://fitsmart.space/sitemap.xml`. Status should read "Success"; compare "Discovered URLs" with the sitemap count above.
3. **Settings → Users and permissions**: add any tool/service account that needs read access.
4. **Pages (Indexing)**: for each excluded reason, compare with the intended `noindex` pages. "Crawled – currently not indexed" on a page you care about is a content-quality signal; improve the page, then use **URL Inspection → Request indexing** (about 10 per day).
5. Export data for the analyser: **Performance → Search results**, date range last 3–6 months, **Export → Download CSV**; unzip into `seo-data/current/`. For a decline comparison export the previous equal period into `seo-data/previous/`.
6. Run `npm run seo:gsc` (or `node scripts/gsc-analyze.mjs`), then `npm run seo:report` and open `reports/seo-dashboard.html`.
7. Optional: **Links**, **Core Web Vitals** and **Enhancements** (breadcrumbs, FAQ, etc.) should show no errors; fix any that appear.

## Recommended next steps

See `SEO_ACTION_PLAN_90_DAYS.md`.
