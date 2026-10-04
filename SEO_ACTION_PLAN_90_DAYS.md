# 90-day SEO action plan — FitSmart

Baseline Search Console (30 days to 4 Oct 2026): **1 click, 94 impressions**; `/programs` 106 impressions at position 46.9; home page 31 impressions at position 13.0.
Baseline Lighthouse (mobile, local, uncompressed): performance 64, LCP 6.1 s, TBT 100 ms, CLS 0.

Goal: more qualified organic visits through better indexing, clearer intent match and faster pages. Rankings cannot be guaranteed; progress is judged by the metrics below.

## Days 0–30: foundations and measurement

- [ ] Merge this PR; confirm the `SEO checks` workflow is green on `main`.
- [ ] Verify the Search Console property and submit the sitemap; record the baseline (clicks, impressions, indexed pages, average position).
- [ ] Export the first CSVs and run `npm run seo:gsc`; save the report.
- [ ] 18 pages are thin in static HTML (about, legal pages, program pages at ~100 words). The four `/programs/*` pages only have a summary and highlights: they need real, visible week-by-week content (sessions, exercises, progression). This is a content task, not something to fake in the prerender.
- [ ] `/programs` has 106 impressions at average position 47: the clearest opportunity once the program pages have real content.
- [ ] Fix every **error** the validator reports; keep warnings trending down.
- [ ] Re-run Lighthouse against the deployed URL (real compression and CDN) and record LCP/TBT/CLS; read the Core Web Vitals report in Search Console for field data (including INP).

## Days 31–60: content and intent

- [ ] From `reports/gsc-opportunities.md`, take the top 10 *striking distance* queries and improve the ranking page: answer the query under a matching heading, add a short FAQ for question queries, add 2–3 descriptive internal links.
- [ ] Rewrite titles/descriptions for the top low-CTR pages (benefit first, distinct per page, no keyword stuffing).
- [ ] Resolve cannibalisation: one page per query.
- [ ] Lighthouse LCP element is the decorative 5%-opacity `hero-bg.jpg`. Either drop it, serve it as a small WebP, or preload it on `/` only. React 18 does not recognise the camelCase `fetchPriority` prop, so use a plain `<link rel="preload">` injected for the home route by `prerender.mjs`.
- [ ] Brand collision: consider a more distinctive brand phrase in titles/H1 (for example "FitSmart India fitness calculators") and keep building real backlinks.
- [ ] Publish at most 2–4 genuinely useful new pages/guides from the question and long-tail lists; skip topics you cannot answer better than what already ranks.
- [ ] Earn real links: directories relevant to the niche, communities where the tool is genuinely useful, a short launch post. No paid or spam links.

## Days 61–90: compounding and cleanup

- [ ] Re-export Search Console data; compare with the day-0 baseline and the `previous/` folder to find declining pages.
- [ ] Refresh the five most-visited pages (accuracy, date, examples), update `lastmod` only when content really changed.
- [ ] Prune or merge pages that stay "Crawled – currently not indexed" after improvements.
- [ ] Re-audit with `npm run seo:report`; update this plan.

## Metrics to track

| Metric | Source | 30 days | 60 days | 90 days |
|---|---|---|---|---|
| Indexed pages vs indexable pages | Search Console → Pages | ≥ 50% of indexable | ≥ 75% | ≥ 90% |
| Impressions (non-branded) | Performance, branded filter excluded | rising vs baseline | +25% vs day 30 | +50% vs day 30 |
| Clicks | Performance | first non-branded clicks | steady weekly growth | 2× baseline or better |
| Average CTR on top 10 pages | Performance | baseline recorded | +0.5 pt | +1 pt |
| Queries in positions 1–10 | Performance → Queries | baseline recorded | +20% | +40% |
| LCP / INP / CLS (field) | Core Web Vitals report | "Good" LCP and CLS | INP good | all three good |
| Validator errors / warnings | `npm run seo:validate` | 0 errors | warnings −50% | warnings −75% |
| Referring domains | Search Console → Links | +3 | +8 | +15 |

Targets are directional guides for a young site, not promises; adjust them after the baseline is known.
