# DESIGN.md

The design language for this portfolio: the vocabulary of color, type, space, and
motion that every surface should share. It exists so that a human or an agent can
build a new page and have it feel like the same site.

> **Tokens are the source of truth.** The values below are documented in prose,
> but they _live_ as CSS custom properties in `src/styles.css` (`:root`, `.dark`,
> and the `@theme inline` map). When a value here disagrees with `styles.css`,
> `styles.css` wins — update this doc to match, don't fork the values.

## 1. Principles

1. **Editorial, not "web-app."** The site reads like a well-set magazine: strong
   type, generous whitespace, a clear reading column. Chrome recedes; content
   leads. (Reference feel: personal, text-forward sites like conordewey.com.)
2. **Content is the interface.** Prefer a confident headline and clean list over
   cards, gradients, and ornament. If a border or box isn't doing work, remove it.
3. **Warm and quiet.** Near-black on near-white, warmed slightly, with a single
   copper accent doing all the pointing. No second accent color.
4. **Sharp and precise.** Corners are square (`--radius: 0`). Hairline rules, not
   shadows. The precision _is_ the brand.
5. **Craft is legible.** Motion is subtle and purposeful; performance is a design
   value. The one exception — the `/design-arena` showcase — is deliberately
   maximal, and that contrast is the point.
6. **Accessible by default.** Every choice below is constrained by §10.

## 2. Voice & tone

- **Confident, plain, specific.** Short sentences. Concrete outcomes over
  adjectives ("cut build times 40%," not "blazing-fast").
- **First person, low ceremony.** It's a personal site; write like a person.
- **Let the work carry the boast.** Show shipped things; don't oversell.
- Sentence case for UI and headings. Title Case only for proper nouns.

## 3. Color

Colors are authored in **OKLCH** for perceptual consistency. Neutrals carry a
faint warm tint (low chroma around hue ~50) so nothing reads as cold gray.

### Roles (light mode — see `:root` in `src/styles.css`)

| Token | Value | Use |
| --- | --- | --- |
| `--background` | `oklch(1 0 0)` | Page background (near-white) |
| `--foreground` | `oklch(0.147 0.004 49.25)` | Body text (warm near-black) |
| `--primary` | `oklch(0.555 0.163 48.998)` | **The copper accent** — links, primary actions, emphasis |
| `--primary-foreground` | `oklch(0.987 0.022 95.277)` | Text/icon on primary fills |
| `--muted` | `oklch(0.97 0.001 106.424)` | Subtle fills / zebra |
| `--muted-foreground` | `oklch(0.553 0.013 58.071)` | Secondary text, metadata, dates |
| `--border` / `--input` | `oklch(0.923 0.003 48.717)` | Hairline rules, dividers, field edges |
| `--ring` | `oklch(0.709 0.01 56.259)` | Focus ring |
| `--destructive` | `oklch(0.577 0.245 27.325)` | Errors / destructive actions only |
| `--secondary`, `--accent` | warm near-white | Quiet surfaces; **not** a second brand color |

Dark mode inverts these in `.dark` (warm near-black background, near-white text,
a slightly deeper copper primary). Both modes are maintained in `styles.css`.

### The copper accent

The copper (`--primary`, ≈ `#c87046`) is the site's one pointing device and is
intentionally shared with the `/design-arena` showcase's `primaryColor`. Use it
for: links, the primary button, active nav, and small moments of emphasis.
Reserve it — if everything is copper, nothing is.

### Rules

- Don't introduce raw hex/RGB in components; consume tokens
  (`bg-background`, `text-foreground`, `text-primary`, `border-border`, …).
- Body text uses `--foreground`; supporting text uses `--muted-foreground`.
- Never signal meaning with color alone (see §10).
- New semantic needs get a **new token in `styles.css`**, not an inline color.

## 4. Typography

- **Body / UI:** Inter (`Inter Variable`, loaded via
  `@fontsource-variable/inter`), mapped to `--font-sans`.
- **Display / headings — design direction:** an editorial **serif** for large
  headings, pairing with Inter for body. The showcase already establishes this
  voice (Iowan Old Style). Today `--font-heading` aliases `--font-sans` in
  `styles.css`; point `--font-heading` at the serif to adopt the pairing
  site-wide. Keep body in Inter regardless.
- **Numerals & code:** a monospace stack for code blocks and inline code.

### Scale & rhythm

- Fluid, editorial scale. Headings are large and few; hierarchy comes from size
  and weight contrast, not from many colors or boxes.
- **Weights:** body 400; UI emphasis 500; display headings 400–500 (let the
  serif's shape carry weight, avoid heavy faux-bold).
- **Measure:** long-form reading column caps around **60–72ch**; never let prose
  run full-bleed on wide screens.
- **Leading:** relaxed for prose (~1.6), tighter for large display headings.
- **Tracking:** slight negative tracking on large display type (the showcase uses
  ~`-0.055em`); default tracking for body.

## 5. Spacing & layout

- **Spacing unit:** Tailwind's 4px scale. Compose from the scale; avoid arbitrary
  pixel values.
- **Rhythm:** whitespace is a primary tool. Prefer more vertical space between
  sections than feels necessary; density is earned, not default.
- **Container:** centered content column with comfortable gutters; a narrower
  reading column for `/writing`. Full-bleed is reserved for deliberate moments
  (hero, `/design-arena`).
- **Grid:** simple, mostly single-column and text-led; multi-column only for
  indexes (work/writing lists) at wider breakpoints.

## 6. Shape, borders & elevation

- **Radius: `--radius: 0`.** Square corners everywhere by default. The `--radius-*`
  steps in `@theme inline` are **multiplicative** factors of this base
  (`sm` ×0.6, `md` ×0.8, `lg` ×1, `xl` ×1.4, `2xl` ×1.8, `3xl` ×2.2, `4xl` ×2.6),
  so at `--radius: 0` every step resolves to `0` and corners stay square
  site-wide. Raising the base reshapes the whole system from one value while the
  ratios between steps hold.
- **Borders over shadows.** Separation comes from hairline `--border` rules and
  whitespace. Avoid drop shadows and heavy elevation; this is a flat, printed
  aesthetic.
- **Focus:** visible focus everywhere via `--ring` (`outline-ring/50` is applied
  globally in the base layer). Never remove focus outlines.

## 7. Motion

- **Restrained and quick.** Transitions ~150–250ms, ease-out. Motion clarifies
  state (hover, focus, enter) — it doesn't perform.
- **`tw-animate-css`** is available for utility animations; use sparingly.
- **Respect `prefers-reduced-motion`.** Non-essential motion must be reduced or
  removed when requested.
- **The exception:** `/design-arena` is an authored, immersive Three.js piece. Its
  motion is intentional and lives entirely inside the vendored source — it is
  governed by `docs/THREEUI.md`, not by this section, and must not be trimmed to
  match the calm of the rest of the site.

## 8. Iconography

- **`@phosphor-icons/react`**, sized to the text it sits with (typically 16–20px),
  `currentColor`, consistent weight (default `regular`). Icons support labels; they
  don't replace them for primary actions.

## 9. Components

- **Primitives:** shadcn/ui + Base UI (`@base-ui/react`), styled with Tailwind v4
  and the tokens above. Variants use `class-variance-authority`; merge classes
  with the `cn` helper (`src/lib/utils.ts`). Add shadcn components with
  `pnpm dlx shadcn@latest add <name>` into `src/components/ui`.
- **Buttons:** the existing `Button` (`src/components/ui/button.tsx`) is the
  canonical example — `default` (copper primary) for the single primary action
  per view; `outline`/`ghost`/`link` for secondary and inline actions;
  `destructive` only for destructive intent. One primary action per screen.
- **New components** should consume tokens (never hardcode color/radius),ship
  with sensible focus/hover/disabled states, and be responsive from ~360px up.

## 10. Accessibility

- **Contrast:** meet WCAG AA — ≥ 4.5:1 for body text, ≥ 3:1 for large text and
  meaningful UI edges — in **both** light and dark modes. Verify the copper
  primary against its backgrounds before shipping new pairings.
- **Keyboard:** everything interactive is reachable and operable by keyboard, in
  a logical order, with a visible focus ring.
- **Semantics:** correct landmarks and heading order; one `<h1>` per page; images
  have alt text; icon-only controls have accessible names.
- **Motion:** honor `prefers-reduced-motion` (§7).
- **Never rely on color alone** to convey state or meaning.

## 11. Responsive

- **Mobile-first.** Design the single-column reading experience first, then let
  indexes expand into columns at wider breakpoints.
- Use Tailwind's default breakpoints (`sm` 640 / `md` 768 / `lg` 1024 / `xl`
  1280). Test the real floor at ~360px and a wide desktop.
- `/design-arena` has its own authored responsive behavior (see
  `docs/THREEUI.md`); the mobile layout is verified as part of that integration.

## 12. Changing the system

- Edit tokens in **`src/styles.css`** — `:root`, `.dark`, and the `@theme inline`
  map — then reflect the change here. Because radius and color scales derive from
  a few base tokens, prefer changing a base value over patching many components.
- Keep light and dark in lockstep; a new token needs both.
- Don't restyle `/design-arena` to match this system, and don't import these
  tokens into the vendored ThreeUI source.
