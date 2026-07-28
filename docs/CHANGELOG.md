# Changelog

All notable changes to SmartFit are documented here. Format based on [Keep a Changelog](https://keepachangelog.com/).

## [2.0.0] — 2026-07-28 — Complete redesign & rebuild

A full, ground-up rebuild from the original dark-theme starter into a premium, production-ready platform.

### Added

- **Design system** — Tailwind v4 `@theme` token layer with semantic light/dark colours, Inter type scale (hero → small), soft elevation, radii and motion tokens.
- **Brand identity** — new SVG logo (heartbeat "S", blue→green), `favicon.svg`, maskable `icon.svg`, wordmark component.
- **Reusable UI kit** — `Button` (polymorphic link/anchor/button), `Card`, `Badge`, `Container`, `Section`/`SectionHeader`, `Input`/`Textarea`, `Modal`, `Tabs`, `Accordion`, `Skeleton`, `Avatar`, `Counter`.
- **Layout** — glass sticky header with mega-menu, animated active route, search (⌘K), dark-mode toggle, profile button, mobile drawer; premium footer with newsletter; scroll-progress bar; back-to-top FAB; scroll restoration; route-transition loader.
- **Pages** — Home (13+ sections), Workouts (filters + spotlight), Nutrition, Calculators, Programs, AI Coach, Blog (search + filter), About (timeline/values/team), Contact (validated form), Dashboard (SVG charts), plus Privacy, Terms, Cookies, Disclaimer, Accessibility, Help, Careers, Press, Sitemap and a custom 404.
- **Calculators** — BMI, BMR (Mifflin-St Jeor), TDEE, calorie target, ideal weight (Devine), body fat (U.S. Navy), lean body mass, protein, macros and water — live results, animated macro donut, BMI scale, and on-demand **PDF report** export.
- **AI Coach** — on-device generator for workouts, meals, weekly plans, goals and motivation, built behind an async, model-swappable interface.
- **SEO** — `Seo` component (title, description, canonical, robots, Open Graph, Twitter) + JSON-LD builders (Organization, Website + SearchAction, Breadcrumb, FAQ, Article); `robots.txt`; `sitemap.xml`.
- **PWA** — installable, offline-capable via `vite-plugin-pwa` + Workbox; web manifest; theme colour.
- **State/data** — TanStack Query provider, React Hook Form + Zod validation, Context API for theme & toasts, localStorage persistence.
- **Animations** — Framer Motion page transitions, scroll reveals, staggered grids, count-ups, floating hero cards, animated charts — all reduced-motion aware.
- **Tooling** — strict TypeScript with project references, ESLint 9 flat config, Prettier, path aliases, manual vendor chunks, `vercel.json` with SPA rewrites and security headers (CSP, X-Frame-Options, etc.).

### Changed

- Migrated from `HashRouter` to `BrowserRouter` with lazy routes.
- Replaced the dark-only palette with a light-first premium theme (`#FAFAF8`) plus a full dark mode.
- Restructured the codebase from a flat layout into a feature-oriented architecture.

### Removed

- Legacy components/pages (`Guide`, `Exercise`, `Diet`, `Plan30Day`, old `Header`/`Footer`/`BMICalculator`) and the outdated Tailwind config.

### Notes

- `npm run build` passes type-check + production build cleanly.
- Bundle is route-split; jsPDF (~118 kB gzip) loads only when a report is downloaded.
