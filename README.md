# ML Curriculum Tracker

A self-hosted tracker for working through a 12-week machine learning curriculum. Track problems, deliverables, and weekly progress against a start date.

## Features

- **Curriculum view** — weekly accordion of topics, problems, and deliverables with overall completion progress.
- **Dashboard** — progress overview at a glance.
- **Admin** — set the curriculum start date so the current week is computed automatically.
- Progress persists locally in the browser (Zustand store).

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router)
- React 18 + TypeScript
- [Zustand](https://github.com/pmndrs/zustand) for state
- [Radix UI](https://www.radix-ui.com/) primitives
- Tailwind CSS

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

> This project uses **pnpm**. The dev script also runs via `npm run dev`, but install with `pnpm` to keep `node_modules` consistent.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run ESLint |

## Routes

| Path | Purpose |
| --- | --- |
| `/` | Curriculum tracker |
| `/dashboard` | Progress overview |
| `/admin` | Set start date / settings |
