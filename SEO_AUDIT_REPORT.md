# SEO audit report — FitSmart

Audited 2026-10-04. Origin: https://fitsmart.space

## Scope and method

- **Stack:** Vite + React SPA with `prerender.mjs` (35 routes; blog bodies are read from `src/data/content.ts`), PWA service worker, strict CSP (`script-src 'self'`), deployed on Vercel.
- **Static validation:** `scripts/seo-validate.mjs` over the production build (what a crawler sees without running JavaScript).
- **Lab performance:** Lighthouse 12 (mobile preset, simulated throttling), Chromium headless, against a plain local static server serving the build. A plain `python3 -m http.server` does **not** gzip/brotli, so the "enable text compression" findings and the absolute LCP are pessimistic compared with production hosting. Treat the numbers as a baseline to compare against after changes, not as field data.
- **Not verified here:** indexing status, rankings and Core Web Vitals field data (INP is only measurable in the field). Those come from Search Console.
- Real data for the last 30 days (free plan limit) was pulled and is summarised below.

## Results at a glance

| Pages built | Indexable | `noindex` | Sitemap URLs | Errors | Warnings | Notes |
|---|---|---|---|---|---|---|
| 38 | 36 | 2 | 36 | 0 | 18 | 10 |

### Validator findings (after this PR's fixes)

| Severity | Check | Count | Example |
|---|---|---|---|
| warn | `thin-static-content` | 18 | `/about — 101 visible words in static HTML` |
| info | `one-inbound-link` | 10 | `/blog/calories-you-need — only linked from /blog` |

### Lighthouse (mobile, local baseline)

| Category | Score |
|---|---|
| Performance | 64 |
| Accessibility | 97 |
| Best practices | 96 |
| SEO | 100 |

Lab metrics (home page): LCP **6.1 s**, FCP 4.9 s, TBT 100 ms, CLS 0.

## Issues found and fixed so far

- Earlier work (PRs #6–#11): removed fake testimonials/avatars/team and "premium" claims; set `/careers` and `/press` to `noindex`; fixed the HIIT blog route and added the sleep article route; rendered full article text into the static HTML; added working BMI and protein calculators to the two India guide pages; added crawlable links from akshay.website.
- Real Search Console data (30 days to 4 Oct 2026): 94 impressions, 1 click. Branded-looking queries ("fitsmart", "fit smart") rank 11–17 but the name collides with other businesses (Smart Fit gyms, a Norwegian "Smart trening"), so most impressions are for unrelated intent.

## Issues still open

- 18 pages are thin in static HTML (about, legal pages, program pages at ~100 words). The four `/programs/*` pages only have a summary and highlights: they need real, visible week-by-week content (sessions, exercises, progression). This is a content task, not something to fake in the prerender.
- `/programs` has 106 impressions at average position 47: the clearest opportunity once the program pages have real content.
- Lighthouse LCP element is the decorative 5%-opacity `hero-bg.jpg`. Either drop it, serve it as a small WebP, or preload it on `/` only. React 18 does not recognise the camelCase `fetchPriority` prop, so use a plain `<link rel="preload">` injected for the home route by `prerender.mjs`.
- Brand collision: consider a more distinctive brand phrase in titles/H1 (for example "FitSmart India fitness calculators") and keep building real backlinks.

## What this audit deliberately does not claim

- No ranking, traffic or indexing improvement is promised. Rankings depend on content quality, links and competition.
- Structured data uses only facts visible on the site; no review/rating markup is emitted without real reviews.
