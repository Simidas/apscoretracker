# AP Score Tracker

AP Score Tracker is a local-first practice test tracker for AP students. It lets students choose a subject, enter MCQ/FRQ raw scores, save practice attempts in the browser, review a progress curve, inspect topic strengths, and export their records as JSON.

## Current Scope

- 5 launch subjects: AP Lang, AP Psych, AP Calculus AB, AP Biology, and AP US History
- Raw MCQ + FRQ score input with a weighted estimated 1-5 AP score
- Browser-only persistence via `localStorage`
- Per-subject history list
- Recharts progress curve
- Topic accuracy sliders and average strength heatmap
- JSON export
- Privacy and Terms pages

The score thresholds and weights are MVP estimates for progress tracking. They are not official College Board scoring curves.

## Tech Stack

- Next.js 14 App Router
- React 18
- Tailwind CSS
- Recharts
- Lucide icons
- Static export for Cloudflare Pages

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

The app is configured for static export with output written to `out`.

## Deployment

Cloudflare scripts are available in `package.json`:

```bash
npm run pages:build
npm run pages:deploy
```

## Notes

AP is a registered trademark of College Board. AP Score Tracker is independent and is not affiliated with, endorsed by, or approved by College Board.
