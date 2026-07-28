# Future Roadmap

The current release is a complete, production-ready **front end**. Everything below is designed to layer on without re-architecting.

## 1. Authentication

- Email + OAuth (Google/Apple) sign-in; session management.
- The header already links a profile/`/dashboard`; wire it to a real auth context.
- **Suggested:** Clerk, Auth0 or Supabase Auth for the fastest path.
- Gate the Dashboard and saved plans behind an auth guard component.

## 2. Backend & data

- Replace `src/data/*` and localStorage with a real API (workouts, programs, blog, progress).
- **Suggested stack:** Supabase or a Node/Hono + Postgres API; TanStack Query is already wired for caching, retries and optimistic updates.
- Persist calculator history, workout logs, streaks and goals per user.

## 3. AI APIs

- `src/features/ai/generator.ts` is already async and interface-stable. Swap its body for a real model call — e.g. the **Anthropic Claude API** — behind a serverless function that holds the key.
- Add streaming responses, conversation memory and personalization from the user's profile/metrics.
- Extend modes: form-check tips, plateau troubleshooting, grocery lists from meal plans.

## 4. Admin panel & CMS

- Author workouts, programs and blog posts without deploys.
- **Suggested:** Sanity, Contentful or a lightweight custom admin on the same backend.
- Role-based access (admin/coach/member); publish workflow for blog + Article JSON-LD.

## 5. Payments & membership

- Free vs Premium tiers (advanced programs, unlimited AI, PDF history).
- **Suggested:** Stripe Checkout + customer portal; webhook-driven entitlement.
- Gate premium routes/components via a subscription context.

## 6. Product depth

- Blog detail pages (`/blog/:slug`) with reading progress, share buttons and related posts.
- Workout detail pages (`/workouts/:slug`) with real video, sets/timer, and logging.
- Global command palette upgrade (recent items, actions, keyboard nav).
- Notifications, achievements engine and progress photos.
- i18n (the copy is centralized enough to localize).
- SSR/pre-render (Vite SSR or migrate to Next/Astro) for guaranteed crawler HTML and top Core Web Vitals.

## 7. Quality & ops

- Unit tests (Vitest + Testing Library) and E2E (Playwright).
- CI: lint, type-check, build, Lighthouse-CI budget on every PR.
- Error monitoring (Sentry) and privacy-friendly analytics (Plausible/Umami).
- Husky pre-commit hooks (lint-staged + Prettier).

---

**Guiding principle:** keep the front end calm, fast and accessible. Add capability in thin, well-typed layers — never at the cost of the core experience.
