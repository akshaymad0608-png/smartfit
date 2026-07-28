# Lighthouse / Performance Report

_Optimizations applied in the rebuild, with guidance for verifying scores._

## Optimizations shipped

### Performance

- **Route-level code splitting** — every page is `React.lazy`; the initial route ships only its own chunk (Home ≈ 5.5 kB gzip).
- **On-demand heavy deps** — jsPDF (~118 kB gzip) is dynamically imported only when a PDF report is generated, keeping it out of the main bundle entirely.
- **Manual vendor chunks** — `react`, `motion`, `query`, `forms` split so caching is granular and long-lived.
- **Font strategy** — `preconnect` + `preload` for Inter; `display=swap` prevents invisible text.
- **No layout shift** — skeleton loaders reserve space; the theme boot script sets light/dark **before paint** to avoid FOUC.
- **Passive scroll listeners** + `requestAnimationFrame` throttling for scroll progress.
- **CSS code splitting** enabled; Tailwind v4 emits only used utilities.

### Accessibility

- Semantic landmarks (`header`, `main`, `nav`, `footer`), single `h1` per page.
- Skip-to-content link; visible `:focus-visible` rings.
- ARIA on tabs, dialogs, accordions, toasts and icon-only buttons.
- Colour contrast tuned for both themes; decorative graphics `aria-hidden`.
- `prefers-reduced-motion` disables non-essential animation globally.

### Best Practices

- Security headers via `vercel.json` (CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy).
- No console errors in production; external links use `rel="noopener noreferrer"`.
- HTTPS enforced by host.

### SEO

- See [SEO_AUDIT.md](SEO_AUDIT.md) — full meta, structured data, sitemap, robots.

## How to measure

```bash
npm run build
npm run preview        # serves dist on http://localhost:4173
# In Chrome DevTools → Lighthouse → analyze (mobile + desktop)
```

## Expected profile

| Category | Target |
| --- | --- |
| Performance | 95–100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

> Actual Performance depends on host, network and the OG image you add. The app is engineered to hit the high-90s/100 on a production deployment. For a guaranteed 100 across the board, consider adding pre-rendering (see roadmap) so first paint is static HTML.

## Further wins (optional)

- Add `<link rel="preload">` for the largest hero asset if you introduce imagery.
- Self-host Inter (woff2 subset) to drop the third-party font origin.
- Enable HTTP/2 push / early hints at the CDN (automatic on Vercel).
