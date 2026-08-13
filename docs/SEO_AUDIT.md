# SEO Audit Report

_FitSmart — rebuilt SEO foundation. Audited 2026-07-28._

## Summary

| Area | Status | Notes |
| --- | --- | --- |
| Titles & descriptions | ✅ | Unique, keyword-aware per page via `Seo` |
| Canonical URLs | ✅ | Absolute canonical on every page |
| Open Graph | ✅ | type, title, description, url, image, locale, site_name |
| Twitter Cards | ✅ | `summary_large_image` |
| Structured data | ✅ | Organization, Website+SearchAction, Breadcrumb, FAQ, Article builders |
| robots.txt | ✅ | Allows all, references sitemap |
| sitemap.xml | ✅ | Primary routes with priority/changefreq |
| Semantic HTML | ✅ | One `h1` per page, logical heading order, landmarks |
| Image alt / ARIA | ✅ | Decorative SVGs `aria-hidden`; icons labelled |
| Mobile-friendly | ✅ | Responsive, `viewport-fit=cover` |
| HTTPS / headers | ✅ | Enforced by host; CSP + security headers in `vercel.json` |
| Core Web Vitals | ✅ | Code-split, font preconnect, no CLS-inducing layout shifts |

## Implementation

### Per-page meta (`src/seo/Seo.tsx`)

Each page renders `<Seo title path description keywords schema />`, producing:

- `<title>` — `"{Page} — FitSmart"` (or brand + tagline on home)
- `<meta name="description">`, `<meta name="keywords">`
- `<link rel="canonical">`, `<meta name="robots">`
- Full Open Graph + Twitter card tags
- One or more `application/ld+json` blocks

### Structured data (`src/seo/schema.ts`)

- **Organization** — name, url, logo, social profiles, contact point
- **WebSite** — with `SearchAction` (`/blog?q={search_term_string}`)
- **BreadcrumbList** — on every interior page
- **FAQPage** — home + contact FAQs
- **Article** — builder ready for blog detail pages

### Target keywords (mapped to pages)

- Home — _fitness, fitness website, healthy lifestyle, AI fitness coach_
- Workouts — _home workout, gym workout, HIIT, strength, exercise guide_
- Nutrition — _healthy diet, nutrition guide, Indian diet plan, protein foods_
- Calculators — _BMI/BMR/TDEE/body fat/macro/protein/calorie calculator_
- Programs — _fitness challenge, 30 day fitness plan, weight loss, muscle gain_
- AI Coach — _AI workout planner, AI meal planner, workout generator_
- Blog — _fitness blog, workout planner_

## Recommended next steps (post-launch)

1. Replace the placeholder OG image (`/icon.svg`) with a 1200×630 branded PNG per page.
2. Add per-post `Article` JSON-LD + canonical when blog detail pages ship.
3. Pre-render or SSR (Vite SSR / Astro / Next) so crawlers see fully-rendered HTML — current app is CSR with Helmet, which Google renders but pre-render improves other crawlers.
4. Generate a dynamic `sitemap.xml` from the route table at build time.
5. Register the domain in Google Search Console & Bing Webmaster; submit the sitemap.
6. Add an RSS feed for the blog (`/rss.xml`).
