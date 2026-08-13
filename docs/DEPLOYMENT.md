# Deployment Guide

FitSmart is a static SPA — it builds to `dist/` and deploys anywhere that serves static files. Vercel is the recommended target and works with zero extra config.

## Prerequisites

- Node.js 18+ (20 LTS recommended)
- `npm install` completed

## Build locally

```bash
npm run build      # type-check + production build → dist/
npm run preview    # verify the built app on http://localhost:4173
```

## Deploy to Vercel (recommended)

### Option A — Dashboard

1. Push the repo to GitHub/GitLab/Bitbucket.
2. In Vercel → **New Project** → import the repo.
3. Framework preset: **Vite** (auto-detected).
4. Build command `npm run build`, output `dist` (already in `vercel.json`).
5. **Deploy.**

### Option B — CLI

```bash
npm i -g vercel
vercel            # preview deployment
vercel --prod     # production deployment
```

`vercel.json` already provides:

- SPA rewrites (all routes → `index.html`) so client-side routing works on refresh/deep links.
- Long-lived immutable caching for hashed assets.
- Security headers (CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy).

## Other hosts

| Host | Notes |
| --- | --- |
| **Netlify** | Build `npm run build`, publish `dist`. Add a SPA redirect: `/* /index.html 200`. |
| **Cloudflare Pages** | Build `npm run build`, output `dist`. SPA fallback on. |
| **GitHub Pages** | Works, but set Vite `base` to the repo path and add a 404→index fallback. |
| **Any static/Nginx** | Serve `dist`; rewrite unknown paths to `/index.html`. |

## Environment variables

None required today — the app runs fully client-side. When the backend/AI API lands, add keys as `VITE_`-prefixed env vars in the host dashboard and read them via `import.meta.env`.

## Custom domain & post-deploy checklist

- [ ] Point DNS to the host; enable HTTPS (automatic on Vercel/Netlify/Cloudflare).
- [ ] Update `site.url` in `src/config/site.ts` to the live domain (drives canonical/OG/JSON-LD).
- [ ] Update absolute URLs in `public/sitemap.xml` and `public/robots.txt`.
- [ ] Submit the sitemap in Google Search Console.
- [ ] Run Lighthouse against the production URL.
- [ ] Add a real 1200×630 OG image and update `Seo`'s default `image`.

## PWA

The service worker (`vite-plugin-pwa`, `registerType: autoUpdate`) is generated at build and auto-registers. Users can install FitSmart from the browser; updates roll out automatically on next load.
