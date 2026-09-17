# Portfolio

A personal developer portfolio — a fast, editorial, server-rendered site built
with TanStack Start, featuring an interactive 3D "Working Volumes" bookshelf
showcase at `/design-arena`.

## Getting started

Uses **pnpm**.

```bash
pnpm install
pnpm dev        # dev server on http://localhost:3000
```

Other commands:

```bash
pnpm build      # production build
pnpm typecheck  # tsc --noEmit (run before finishing a change)
pnpm test       # Vitest
pnpm lint       # ESLint
pnpm format     # Prettier
```

## Tech

TanStack Start (SSR) + TanStack Router (file-based routes) + React 19 + Vite 8,
styled with Tailwind CSS v4, shadcn/ui, and Base UI. Design tokens live in
`src/styles.css`.

## Documentation

- **`AGENTS.md`** — working agreement for humans and AI agents: stack, commands,
  and the sharp edges of this repo.
- **`PRD.md`** — product intent, scope, audience, and roadmap.
- **`DESIGN.md`** — the design language: color, type, spacing, motion, voice.
- **`docs/THREEUI.md`** — the vendored ThreeUI showcase and its byte-exact
  constraints. Read before touching `src/shaders/**` or the shelf HTML asset.

## Routes

- `/` — home _(starter placeholder; see `PRD.md`)_.
- `/design-arena` — the ThreeUI 3D bookshelf showcase.

Routes are file-based in `src/routes/**`; `src/routeTree.gen.ts` is generated —
never edit it by hand.
