# AP Score Tracker

AP Score Tracker is a cloud-synced practice test tracker for AP students. It helps students enter raw MCQ/FRQ scores, estimate an AP 1-5 score, save practice attempts, and review progress over time.

The current development branch includes the V2 Clerk authentication and Cloudflare D1 data flow. Visitors can try score estimates without an account; signed-in users can save records, targets, and history to D1. Stripe billing remains under development.

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
- Clerk-authenticated per-subject history stored in Cloudflare D1
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
- Clerk authentication and account controls
- Cloudflare D1 for signed-in tracker records and targets
- Cloudflare Workers deployment via `@opennextjs/cloudflare`
- Wrangler CLI
- GitHub Actions deploy on push to `main`
- Stripe SDKs and billing API scaffolding for V2 development

## Data Storage

Signed-in tracker data is stored in Cloudflare D1:

- `users`: Clerk user mapping and subscription state
- `exam_records`: saved practice test records
- `target_scores`: per-subject target AP scores
- `stripe_events`: billing webhook idempotency

The V1 `apst_records` and `apst_targets` localStorage keys are no longer written by the V2 tracker. Existing users can export their V1 data and import the JSON backup after signing in.

## Development

Use Node 22 for local development and Cloudflare tooling. Some current Cloudflare dependencies warn on older Node 20 versions.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Use `clerk env pull --file .env.local` for local Clerk development. Fill the Stripe values from `.env.example` when working on billing.

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

- `wrangler.jsonc`: Worker entry, assets, D1, compatibility flags, and image bindings
- `open-next.config.ts`: OpenNext Cloudflare adapter config
- `.github/workflows/deploy.yml`: `npm ci` → `npx opennextjs-cloudflare build` → `wrangler deploy`

Required GitHub secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Documentation

- `DEVELOPMENT.md`: current implementation and deployment notes
- `PRD.md`: original MVP product definition, now partly historical
- `docs/V1.1-PRD.md`: V1.1 feature scope
- `docs/V2.0-PRD.md`: V2 implementation plan for auth, D1, limits, and subscriptions
- `docs/compliance-report.md`: historical V1 audit; the live Privacy and Terms pages reflect the V2 data flow
- `docs/pricing-report.md`: pricing research, partly historical

## Notes

AP is a registered trademark of College Board. AP Score Tracker is independent and is not affiliated with, endorsed by, or approved by College Board.
