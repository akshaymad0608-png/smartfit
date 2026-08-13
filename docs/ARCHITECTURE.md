# Architecture & Folder Structure

FitSmart follows a feature-oriented, scalable structure. Shared primitives live under `components/`, domain logic under `features/`, and cross-cutting concerns (SEO, contexts, hooks, config) each get a dedicated folder.

```
fitsmart/
├── public/
│   ├── favicon.svg            # Brand mark (heartbeat "S")
│   ├── icon.svg               # Maskable PWA/app icon
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── main.tsx               # Entry — Helmet + App
│   ├── App.tsx                # Providers: Query, Theme, Toast, Router
│   ├── routes.tsx             # Route table with lazy-loaded pages
│   ├── vite-env.d.ts
│   │
│   ├── styles/
│   │   └── index.css          # Tailwind v4 @theme tokens (light + dark)
│   │
│   ├── config/
│   │   └── site.ts            # Branding, SEO defaults, navigation
│   │
│   ├── types/
│   │   └── index.ts           # Shared domain types
│   │
│   ├── lib/
│   │   └── cn.ts              # clsx + tailwind-merge helper
│   │
│   ├── seo/
│   │   ├── Seo.tsx            # Helmet wrapper (meta, OG, Twitter, JSON-LD)
│   │   └── schema.ts          # JSON-LD builders
│   │
│   ├── contexts/
│   │   ├── ThemeContext.tsx   # Light/dark, persisted + system-aware
│   │   └── ToastContext.tsx   # Toast notifications
│   │
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   ├── useScrollProgress.ts
│   │   ├── useCountUp.ts
│   │   └── useMediaQuery.ts
│   │
│   ├── components/
│   │   ├── ui/                # Reusable primitives (Button, Card, Modal…)
│   │   ├── layout/            # Header, Footer, Drawer, ScrollProgress, Layout…
│   │   ├── cards/             # WorkoutCard, ProgramCard, BlogCard, TestimonialCard
│   │   ├── brand/             # Logo
│   │   └── motion/            # Reveal, PageTransition, stagger variants
│   │
│   ├── features/
│   │   ├── calculators/       # Formulas, CalculatorSuite, MacroDonut, PDF export
│   │   ├── ai/                # AI Coach generation engine (API-ready)
│   │   └── home/              # Hero, NewsletterForm
│   │
│   ├── data/
│   │   ├── workouts.ts
│   │   └── content.ts         # Programs, blog, testimonials, FAQs, stats
│   │
│   └── pages/
│       ├── Home.tsx           # 13+ sections
│       ├── Workouts.tsx       # Filters + spotlight + grid
│       ├── Nutrition.tsx
│       ├── Calculators.tsx
│       ├── Programs.tsx
│       ├── AICoach.tsx
│       ├── Blog.tsx
│       ├── About.tsx
│       ├── Contact.tsx
│       ├── Dashboard.tsx      # SVG charts
│       ├── ContentPage.tsx    # Reusable long-form page
│       ├── legal.tsx          # Privacy, Terms, Cookies, Disclaimer, Accessibility, Help, Careers, Press, Sitemap
│       └── NotFound.tsx
│
├── docs/                      # Changelog, SEO audit, Lighthouse, deployment, roadmap
├── vercel.json                # SPA rewrites + security headers
├── vite.config.ts            # React, PWA, aliases, manual chunks
├── tsconfig*.json            # Strict, project references
├── eslint.config.js
└── .prettierrc
```

## Conventions

- **Path alias** — `@/…` maps to `src/…`.
- **Type-only imports** — enforced by `verbatimModuleSyntax`.
- **Semantic Tailwind tokens** — components use `bg-surface`, `text-heading`, `border-line`, etc. so a single token swap re-themes everything.
- **Code splitting** — every page is `React.lazy`; jsPDF is dynamically imported only on download.
- **Motion** — all animation flows through `components/motion` and respects `prefers-reduced-motion`.
