# AGENTS.md

A personal developer portfolio: a fast, editorial, SSR-rendered site that presents
who the owner is, the work they've shipped, and things they've written — with a few
signature interactive 3D showcase.

## Stack & tooling

- **Package manager: `pnpm`** (not npm). A `pnpm-workspace.yaml` is present.
- **Framework:** TanStack Start (SSR) + TanStack Router (file-based) + React 19 + Vite 8.
- **Styling:** Tailwind CSS v4 (config-in-CSS) + shadcn/ui + Base UI. Design tokens
  live in `src/styles.css` as CSS custom properties.

## Commands

- `pnpm dev` — dev server on port 3000 (also regenerates the route tree).
- `pnpm build` — production build.
- `pnpm typecheck` — `tsc --noEmit`. Run before finishing any change.
- `pnpm test` — Vitest.
- `pnpm lint` / `pnpm format` — ESLint / Prettier.

## Things that will bite you

- **`src/routeTree.gen.ts` is generated. Never edit it by hand.** Routes are
  file-based in `src/routes/**`; the Vite plugin rewrites the tree (and syncs each
  route's path to its filename) on `pnpm dev`/`build`.
- **`src/shaders/**` vendors the ThreeUI `CompleteShelfLandingPage` component, plus
  `public/landing-pages/complete-shelf-v2.html`. Several of these files are
  byte-exact registered source and must not be reformatted or "cleaned up."**
  Read `docs/THREEUI.md` before touching anything under `src/shaders/` or that
  HTML asset. It renders at the `/design-arena` route.
- The `@designcodeio/threeui` import specifier is a local alias (see
  `vite.config.ts` and `tsconfig.json`), not an installed package.

## Where to look

- **Product intent, scope, and roadmap:** `PRD.md`.
- **Design language — color, type, spacing, motion, voice:** `DESIGN.md`.
- **Vendored ThreeUI integration & its byte-exact constraints:** `docs/THREEUI.md`.

Prefer discovering current file structure yourself over trusting a path written in
these docs — the source is the source of truth.
