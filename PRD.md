# PRD — Personal Developer Portfolio

> Product Requirements Document. Describes _what_ this site is for and _what_ it
> must do. For _how_ it should look and feel, see `DESIGN.md`. For _how_ it's
> built, see `AGENTS.md`.
>
> **Status:** living document. The codebase is early — the `/design-arena`
> showcase is built; most content surfaces below are planned. Sections marked
> _Planned_ are not yet implemented.

## 1. Summary

A fast, editorial, server-rendered personal site for a software developer. It
answers three questions for anyone who lands on it — _Who is this person? What
have they built? What do they think?_ — and does so with enough craft that the
site itself is evidence of the answer.

One signature interactive piece (the ThreeUI "Working Volumes" 3D bookshelf at
`/design-arena`) demonstrates front-end range without turning the whole site
into a tech demo.

## 2. Problem & motivation

Developers are routinely evaluated by strangers — recruiters, hiring managers,
potential collaborators, conference organizers — who arrive with a specific
question and little patience. A generic résumé or a template site answers slowly
and says nothing about taste or ability.

This portfolio exists to answer those questions fast, credibly, and memorably,
and to be a durable home for the owner's writing and work that they fully
control (no platform lock-in).

## 3. Goals & non-goals

### Goals

- **G1 — Communicate identity in one screen.** A first-time visitor understands
  who the owner is and what they do before scrolling.
- **G2 — Showcase work with depth.** Selected projects each get a real
  case-study surface, not just a logo wall.
- **G3 — Host writing.** A durable, ownable place for essays/notes with a clean
  reading experience.
- **G4 — Demonstrate craft.** The site's performance, polish, and the
  `/design-arena` showcase are themselves a portfolio piece.
- **G5 — Be trivially contactable.** Every page offers an obvious next step to
  get in touch.

### Non-goals

- Not a CMS, SaaS, or multi-tenant product.
- Not a blogging platform for other authors.
- Not a place for exhaustive life history — curation over completeness.
- No account system, comments, or user-generated content in v1.
- Not attempting to showcase _every_ project; selectivity is a feature.

## 4. Audience & personas

| Persona | Arrives via | Primary question | Wants within 30s |
| --- | --- | --- | --- |
| **Hiring manager / recruiter** | LinkedIn, referral | "Can they do the job?" | Role, seniority, proof of shipped work, contact |
| **Fellow engineer / collaborator** | GitHub, a shared link | "Is this person's work interesting/rigorous?" | Depth: how something was built, writing |
| **Conference / community organizer** | Search, social | "Can they speak/write credibly?" | Bio, talks/writing, a way to reach out |
| **Curious peer** | Social share of the showcase | "Who made this?" | Delight, then a path back to the rest of the site |

Primary persona is the **hiring manager**; the site is optimized so their
question is answered fastest, without dumbing down depth for engineers.

## 5. Success metrics

- **Clarity:** a first-time viewer can state the owner's role and one shipped
  project after ~30 seconds (validate via informal user tests).
- **Engagement:** median session reaches at least one work case study _or_ one
  written piece.
- **Contact:** measurable outbound contacts (email/social) attributable to the
  site.
- **Performance:** Lighthouse ≥ 95 across Performance / Accessibility / Best
  Practices / SEO on the content routes; initial content paint is SSR (no blank
  hydration flash).
- **Reach:** the `/design-arena` showcase is shareable and renders correctly when
  unfurled (Open Graph image + title).

## 6. Information architecture

Routes are file-based under `src/routes/**` (see `AGENTS.md`). Target IA:

- `/` — **Home.** Identity, one-line positioning, featured work, latest writing,
  contact. _Planned_ (currently a starter placeholder).
- `/work` — **Work index.** Curated list of selected projects. _Planned._
- `/work/$slug` — **Case study.** Per-project deep dive. _Planned._
- `/writing` — **Writing index.** Chronological, lightly categorized (e.g.
  Engineering / Product / Notes). _Planned._
- `/writing/$slug` — **Essay/note.** Reading-optimized. _Planned._
- `/about` — **About.** Longer bio, background, current focus, résumé link.
  _Planned._
- `/design-arena` — **Showcase.** The ThreeUI "Working Volumes" interactive 3D
  bookshelf. **Built.** See `docs/THREEUI.md`.
- `404` — Handled by the root route's `notFoundComponent`.

## 7. Functional requirements

### 7.1 Home (`/`) — _Planned_

- Above the fold: name, role/positioning line, and a primary call to action.
- Featured work: 2–4 curated projects with title, one-line outcome, link.
- Latest writing: 2–3 most recent pieces with date + category.
- Persistent, unobtrusive site navigation and a footer with contact/social.

### 7.2 Work (`/work`, `/work/$slug`) — _Planned_

- Index lists selected projects, each with role, timeframe, and a one-line
  result. Order is curated, not purely chronological.
- A case study supports: problem/context, the owner's role and contributions,
  approach and notable decisions, outcome/impact, visuals, and links (live /
  repo / writeup).
- Content authored in a repo-friendly format (e.g. MDX/Markdown) rather than a
  database.

### 7.3 Writing (`/writing`, `/writing/$slug`) — _Planned_

- Index is reverse-chronological with title, date, category, and short excerpt.
- Reading view is typography-first (see `DESIGN.md`), with generous measure and
  clear hierarchy; code blocks are syntax-highlighted.
- Each piece has a canonical URL and Open Graph metadata for sharing.

### 7.4 About (`/about`) — _Planned_

- Narrative bio, current focus, and a downloadable/linkable résumé.
- Clear contact affordance.

### 7.5 Design Arena (`/design-arena`) — _Built_

- Renders `<CompleteShelfLandingPage />` (vendored ThreeUI) via `Scene.tsx`
  through the configured props. Full-viewport stage (`.shader-frame`).
- The authored 3D experience — seven "tools" as books, spine markers,
  selection/open interactions, responsive editorial UI — must be preserved
  byte-exact per `docs/THREEUI.md`. **Do not recreate or restyle it.**

### 7.6 Cross-cutting

- **SEO/metadata:** per-route title, description, and Open Graph image.
- **Accessibility:** meets the bar in `DESIGN.md` (keyboard nav, contrast,
  reduced-motion honored).
- **Responsive:** all content routes work from ~360px to wide desktop.
- **Performance:** SSR-first; ship minimal JS on content routes; keep the heavy
  Three.js payload isolated to `/design-arena`.
- **Contact:** email and primary social links reachable from every page.

## 8. Content model (planned)

Project and writing entries live as repo content (Markdown/MDX + frontmatter) so
they version with the code and require no backend:

- **Project:** `title`, `slug`, `role`, `period`, `summary`, `featured`,
  `links[]`, `cover`, body.
- **Writing:** `title`, `slug`, `date`, `category`, `excerpt`, `draft`, body.

## 9. Technical constraints

- Server-rendered via TanStack Start; routes file-based (never hand-edit
  `routeTree.gen.ts`).
- `pnpm` only. `pnpm typecheck` must pass before any change is considered done.
- The `/design-arena` showcase depends on vendored, byte-exact ThreeUI source and
  a local `@designcodeio/threeui` alias — see `AGENTS.md` and `docs/THREEUI.md`.
- No secrets in the client; if a contact form is added later it must post to a
  server route/function, not a third-party key in the bundle.

## 10. Milestones

1. **M1 — Foundation.** Global layout shell, navigation, footer, design tokens
   applied from `DESIGN.md`; replace the starter home placeholder.
2. **M2 — Home.** Real hero, featured work, latest writing, contact.
3. **M3 — Work.** Work index + case-study template + first 2–3 case studies.
4. **M4 — Writing.** Writing index + reading view + first posts; RSS.
5. **M5 — About & polish.** About page, résumé, metadata/OG images, a11y +
   performance pass to hit the metrics in §5.
6. **Ongoing.** Keep `/design-arena` current with ThreeUI source revisions.

## 11. Open questions

- Owner identity details (name, role line, socials, résumé) — fill in as content
  lands.
- Is `/design-arena` linked from primary navigation, or kept as an
  "easter-egg"/shared-link showcase?
- Writing categories and whether tags are needed beyond a small fixed set.
- Analytics: which privacy-respecting tool (if any) measures §5.
