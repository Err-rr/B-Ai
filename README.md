# Bootcamp AI

Frontend for Bootcamp AI — an AI-assisted startup bootcamp platform for secondary school student founders, run by Young Founders School.

This is a frontend-only build: no backend, no external calls. All app data comes from a typed mock data layer (`src/lib/data/`) that will later be swapped for real API calls without touching any component. See `docs/PIPELINE.md` for the seam.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- `/` — the public Dashboard (landing page)
- `/design` — the design token / component showcase

## Scripts

| Command                | Purpose                    |
| ---------------------- | -------------------------- |
| `npm run dev`          | Start the dev server       |
| `npm run build`        | Production build           |
| `npm run start`        | Serve the production build |
| `npm run lint`         | ESLint                     |
| `npm run format`       | Prettier, writes changes   |
| `npm run format:check` | Prettier, check only       |
| `npm run typecheck`    | TypeScript, no emit        |

## Documentation

- `docs/DECISIONS.md` — the decision log; read this before questioning why something is built the way it is.
- `docs/PIPELINE.md` — build phase order, how to extend the project, where the backend seam is.
- `docs/DESIGN-SYSTEM.md` — token reference and component inventory.

## Stack

Next.js (App Router) · TypeScript (strict) · Tailwind CSS v4 · Framer Motion · lucide-react · next/font (Outfit + Inter)
