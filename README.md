# AP Score Tracker

AP Score Tracker is a local-first practice test tracker for AP students. It helps students enter raw MCQ/FRQ scores, estimate an AP 1-5 score, save practice attempts in the browser, and review progress over time.

The current production product is V1.1: no account system, no backend database, and no payment flow. V2.0 development has started with auth, API, D1, and billing scaffolding, but the tracker UI still uses the V1.1 local-first flow until Clerk, D1, and Stripe are configured and integrated end to end.

## Current Product Scope

- Landing page with an embedded score-tracking demo and CTA flow into `/tracker`
- Tracker app at `/tracker`
- 5 supported tracker subjects:
  - AP English Language
  - AP Psychology
  - AP Calculus AB
  - AP Biology
  - AP United States History
- Additional SEO subject pages for AP Biology, AP Calculus AB/BC, AP Chemistry, AP Lang, AP Physics 1, AP Psychology, AP Statistics, and AP US History
- Raw MCQ + FRQ score input with weighted estimated AP score
- Per-subject target score, gap display, and study tips
- Per-subject history list stored in the browser
- Recharts progress curve with target reference line
- Topic accuracy sliders and average topic strength view
- JSON import/export
- Print-friendly tracker styles
- Privacy and Terms pages
- Dynamic `robots.txt` and `sitemap.xml`

The score weights and thresholds are rough progress-tracking estimates. They are not official College Board scoring curves.

## Tech Stack

- Next.js 15.5 App Router
- React 18
- TypeScript 5.9
- Tailwind CSS 3.4
- shadcn/ui-style primitives
- Recharts 3.8
- Lucide React icons
- Local font files via `next/font/local`
- Browser `localStorage` for V1.1 tracker data
- Cloudflare Workers deployment via `@opennextjs/cloudflare`
- Wrangler CLI
- GitHub Actions deploy on push to `main`
- Clerk and Stripe SDKs for V2 development

## Data Storage

V1.1 stores user-entered tracker data only in the browser:

- `apst_records`: saved practice test records
- `apst_targets`: per-subject target AP scores

There is no server-side score storage in the current code. V2.0 plans to replace this with Clerk-authenticated D1 storage for logged-in users.

V2 API and billing scaffolding now exists under `/api/*`, but it requires Clerk environment variables and a Cloudflare D1 `DB` binding before it can be exercised.

## Development

Use Node 22 for local development and Cloudflare tooling. Some current Cloudflare dependencies warn on older Node 20 versions.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and fill Clerk/Stripe values when working on V2 auth or billing.

## Build

Regular Next.js build:

```bash
npm run build
```

Cloudflare Workers/OpenNext build:

```bash
npx opennextjs-cloudflare build
```

The OpenNext build writes generated output to `.open-next/`, including `.open-next/worker.js` and `.open-next/assets`.

## Deployment

The project deploys as a Cloudflare Worker, not as a static Cloudflare Pages export.

```bash
npm run deploy
```

Deployment config:

- `wrangler.jsonc`: Worker entry, assets binding, compatibility flags, image binding
- `open-next.config.ts`: OpenNext Cloudflare adapter config
- `.github/workflows/deploy.yml`: `npm ci` → `npx opennextjs-cloudflare build` → `wrangler deploy`

Required GitHub secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Documentation

- `DEVELOPMENT.md`: current implementation and deployment notes
- `PRD.md`: original MVP product definition, now partly historical
- `docs/V1.1-PRD.md`: V1.1 feature scope
- `docs/V2.0-PRD.md`: next-stage product plan for auth, D1, and subscriptions
- `docs/compliance-report.md`: current V1 local-first compliance notes, to be updated for V2
- `docs/pricing-report.md`: pricing research, partly historical

## Notes

AP is a registered trademark of College Board. AP Score Tracker is independent and is not affiliated with, endorsed by, or approved by College Board.
