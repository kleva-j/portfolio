# DESIGN.md

Visual identity and interface rules for this portfolio. Use this as the source of
truth when building or reviewing UI.

**Tokens live in `src/styles.css`** (`:root`, `.dark`, `@theme inline`). If a value
here disagrees with `styles.css`, `styles.css` wins — fix this doc, don't fork the
value. `/design-arena` is exempt from everything below; it is governed by
`docs/THREEUI.md`.

## Direction

Editorial, text-forward personal site — reads like a well-set magazine, not a web
app. Warm near-black on warm near-white, one copper accent, square corners,
hairline rules. Content leads; chrome recedes.

## Principles

- Content is the interface. Prefer a confident headline and clean list over cards,
  gradients, and ornament. If a border or box isn't doing work, remove it.
- One accent. Copper is the only brand color and the only pointing device.
- Flat and precise. Hairline borders and whitespace for separation — not shadows.
- Motion is subtle and purposeful. Performance is a design value.

## Color

Authored in OKLCH. Neutrals carry a faint warm tint (low chroma, hue ~50) so
nothing reads as cold gray. Consume tokens (`bg-background`, `text-foreground`,
`text-primary`, `border-border`); never hardcode hex/RGB in components.

| Token | Light value | Use |
| --- | --- | --- |
| `--background` | `oklch(1 0 0)` | Page background |
| `--foreground` | `oklch(0.147 0.004 49.25)` | Body text |
| `--primary` | `oklch(0.555 0.163 48.998)` (≈`#c87046`) | Copper accent: links, primary action, active nav, emphasis |
| `--primary-foreground` | `oklch(0.987 0.022 95.277)` | Text/icon on primary fills |
| `--muted` | `oklch(0.97 0.001 106.424)` | Subtle fills |
| `--muted-foreground` | `oklch(0.553 0.013 58.071)` | Secondary text, metadata, dates |
| `--border` / `--input` | `oklch(0.923 0.003 48.717)` | Rules, dividers, field edges |
| `--ring` | `oklch(0.709 0.01 56.259)` | Focus ring |
| `--destructive` | `oklch(0.577 0.245 27.325)` | Errors / destructive actions only |
| `--secondary` / `--accent` | warm near-white | Quiet surfaces — not a second brand color |

Dark mode inverts these in `.dark`. Keep light and dark in lockstep; a new token
needs both. Reserve copper — if everything is copper, nothing is.

## Typography

- **Body / UI:** Inter (`@fontsource-variable/inter`) → `--font-sans`.
- **Headings:** editorial serif direction (Iowan Old Style voice) → `--font-heading`.
  Currently aliases `--font-sans`; point it at the serif to adopt site-wide. Body
  stays Inter regardless.
- **Code:** monospace stack.
- **Weights:** body 400; UI emphasis 500; display 400–500 (no heavy faux-bold).
- **Measure:** reading column caps 60–72ch; never full-bleed prose on wide screens.
- **Leading:** ~1.6 for prose, tighter for large display.
- **Tracking:** slight negative on large display (~`-0.055em`); default for body.
- Sentence case for headings and UI; Title Case only for proper nouns.

## Layout & spacing

- Spacing unit: Tailwind's 4px scale. No arbitrary pixel values.
- Whitespace is a primary tool — prefer generous vertical space between sections.
- Centered content column with comfortable gutters; narrower column for `/writing`.
- Mostly single-column and text-led; multi-column only for indexes (work/writing)
  at wider breakpoints. Full-bleed only for deliberate moments (hero).

## Shape & elevation

- **Radius `--radius: 0`** — square corners everywhere.
- Borders over shadows. Avoid drop shadows and heavy elevation.
- Visible focus everywhere via `--ring` (`outline-ring/50`, applied globally).
  Never remove focus outlines.

## Motion

- Restrained: ~150–250ms, ease-out. Motion clarifies state (hover, focus, enter);
  it doesn't perform.
- `tw-animate-css` is available; use sparingly.
- Honor `prefers-reduced-motion` — reduce or remove non-essential motion.

## Iconography

`@phosphor-icons/react`, sized to adjacent text (16–20px), `currentColor`,
`regular` weight. Icons accompany labels; they don't replace them for primary
actions.

## Components

- **Primitives:** shadcn/ui + Base UI (`@base-ui/react`), Tailwind v4, tokens above.
  Variants via `class-variance-authority`; merge classes with `cn`
  (`src/lib/utils.ts`). Add components with `pnpm dlx shadcn@latest add <name>`
  into `src/components/ui`.
- **Buttons:** `src/components/ui/button.tsx` is canonical — `default` (copper) for
  the one primary action per view; `outline`/`ghost`/`link` for secondary/inline;
  `destructive` for destructive intent only.
- New components consume tokens, ship focus/hover/disabled states, and are
  responsive from ~360px up.

## Accessibility

- Contrast: WCAG AA — ≥4.5:1 body, ≥3:1 large text and meaningful UI edges — in
  both modes. Verify copper against its backgrounds before shipping new pairings.
- Everything interactive is keyboard-reachable in logical order with a visible ring.
- Correct landmarks and heading order; one `<h1>` per page; alt text on images;
  accessible names on icon-only controls.
- Honor `prefers-reduced-motion`. Never convey state with color alone.

## Responsive

- Mobile-first. Design the single-column reading experience first, then expand
  indexes into columns at wider breakpoints.
- Tailwind breakpoints (`sm` 640 / `md` 768 / `lg` 1024 / `xl` 1280). Test ~360px
  and a wide desktop.

## Do not

- Add a second accent color, gradients, or decorative shadows.
- Introduce raw hex/RGB or arbitrary radius in components — add a token instead.
- Round corners, box content in cards without cause, or crowd sections.
- Remove focus outlines or signal meaning with color alone.
- Restyle `/design-arena` to match this system, or import these tokens into the
  vendored ThreeUI source.

## Changing the system

Edit tokens in `src/styles.css` (`:root`, `.dark`, `@theme inline`), then reflect
the change here. Prefer changing a base value over patching many components.
