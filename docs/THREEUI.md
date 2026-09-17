# ThreeUI integration — `CompleteShelfLandingPage`

The `/design-arena` route renders a vendored ThreeUI component: the "Working
Volumes" interactive 3D bookshelf (`CompleteShelfLandingPage`, full HTML +
DOM/CSS + Three.js r165). This doc explains what is byte-exact registered source
(**do not touch**), what is local glue (safe to edit carefully), and how to
verify and update it.

Read this before editing anything under `src/shaders/**` or the shelf HTML asset.

## What renders it

- **Route:** `src/routes/design-arena.tsx` → `/design-arena`, component
  `Scene`.
- **Usage:** `src/components/Scene.tsx` uses the configured variant/props verbatim
  and imports through the published specifier:

  ```tsx
  import { CompleteShelfLandingPage } from "@designcodeio/threeui"
  import "@designcodeio/threeui/style.css"
  // …props: headingFont, bodyFont, headingWeight, bodyWeight,
  //         primaryColor="#c87046", headingSize, bodySize, headingLetterSpacing
  ```

- The component mounts a sandboxed same-origin `<iframe>` that loads the authored
  page (`/landing-pages/complete-shelf-v2.html`) and injects a small `<style>`
  into its head to apply the typography/color props.

## Registered source — DO NOT reformat

Everything below is registered ThreeUI source. **Never reformat, "clean up,"
re-indent, or let Prettier/ESLint rewrite any of it.** The `.tsx` files are
excluded from Prettier (`.prettierignore`) and ESLint (`eslint.config.ts`) for
exactly this reason — keep them there.

Two groups, because two of the files are shipped verbatim and two are registered
source that had to be adapted for local vendoring.

### Group A — byte-exact assets (verify by SHA-256)

These are shipped verbatim and **must** match these sums. If they don't, the
asset has been corrupted — restore it.

| Path | SHA-256 |
| --- | --- |
| `public/landing-pages/complete-shelf-v2.html` | `606f200fed8602c243f40a11c8c364f0e625c57f80e7c97dc76419da207f198e` |
| `src/shaders/threeui.css` | `efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf` |

Verify with, e.g.:

```bash
shasum -a 256 public/landing-pages/complete-shelf-v2.html src/shaders/threeui.css
```

### Group B — registered source, locally adapted

These mirror the registered component but reference the local seam and drop
unpublished siblings, so their on-disk SHA **intentionally differs** from the
registered (upstream) SHA. Preserve their behavior; don't reformat them.

| Path | Registered (provenance) SHA-256 | On-disk SHA-256 | Why it differs |
| --- | --- | --- | --- |
| `src/shaders/landing-pages/LandingPageFrame.tsx` | `61de2cc50888aac4ac5557420b07fa47ed3543bb57c1e0055fafdefa53dbaa78` | `87fde743eea01e1c53c65ea5a291deab5a9fa6eee984cf07c82b5201df3386c4` | Imports the reconstructed local `./pageTypography` seam |
| `src/shaders/landing-pages/LandingPages.tsx` | `4d379461ad00eb4de7900df312878035383de7e1ed4e13283b8143a2eea9d30a` | `1d583e2699d9ca67de7a9e5756a36e554a351db2f8141b21bfa28fac7324030c` | Trimmed to `CompleteShelfLandingPage` + frame re-exports |

> **`LandingPages.tsx`:** the full registered file imports ~20 sibling scene
> modules that ThreeUI does not publish, so the vendored copy is trimmed to only
> `CompleteShelfLandingPage` plus the frame re-exports. The
> `CompleteShelfLandingPage` function body is byte-identical to the registered
> source; only the surrounding unused imports are omitted so the build resolves.
> Keep the function body identical to upstream.
>
> **`LandingPageFrame.tsx`:** the registered frame reads its customization from
> ThreeUI's own module layout; the vendored copy points those imports at the
> local `./pageTypography` seam (§ *Local glue*). That import rewrite is the only
> intended divergence — the rest of the file must stay as registered.

## Local glue — safe to edit, preserve the contract

These are **not** published by ThreeUI; they were reconstructed to satisfy the
component's observed interface. Edit with care and keep their exported contract
stable.

- `src/shaders/landing-pages/pageTypography.tsx` — the customization seam. Exports
  `PageTypographyProps`, `LandingPageCustomization`, `splitTypographyProps`,
  `usePageTypography`, `applyPageCustomization`, `postPageCustomization`,
  `PageTypographyRecipe`. It injects `<style id="threeui-page-typography">` into
  the same-origin iframe head, overriding only the CSS custom properties the page
  reads.
- `src/shaders/landing-pages/pageRecipes.tsx` — `COMPLETE_SHELF_TYPOGRAPHY`. Its
  defaults equal the authored page's own defaults, so a prop-free render is
  pristine. Maps props to vars: `headingFamily → --serif`, `bodyFamily → --mono`,
  `accent → --accent`.
- `src/shaders/landing-pages/index.ts` — barrel (`export * from "./LandingPages"`),
  the module the `@designcodeio/threeui` alias resolves to.

## Resolution plumbing

The `@designcodeio/threeui` specifier is a **local alias**, not an installed
package:

- `vite.config.ts` — `resolve.alias` maps
  `@designcodeio/threeui` → `src/shaders/landing-pages/index.ts` and
  `@designcodeio/threeui/style.css` → `src/shaders/threeui.css`.
- `tsconfig.json` — `paths` maps `@designcodeio/threeui` to the same entry.
- `src/threeui.d.ts` — ambient `declare module "@designcodeio/threeui/style.css"`
  so the side-effect CSS import typechecks.
- `src/styles.css` — `.shader-frame` is the full-viewport stage the frame fills.

If you move the vendored files, update all four of these together.

## How props reach the authored page

`Scene.tsx` props → `splitTypographyProps` separates typography props from frame
props → `usePageTypography(COMPLETE_SHELF_TYPOGRAPHY, …)` builds a
`customization` → `LandingPageFrame` injects it as a `<style>` in the iframe head
on load. The page consumes `--serif`, `--mono`, and `--accent`.

**Gotcha:** the page's own `applyBookTheme()` overwrites `--accent` per selected
book (`book.foil`). To confirm the injection worked, inspect the text of the
`#threeui-page-typography` style element — **do not** assert on the computed
`--accent`, which the page changes as the selection changes.

## Verifying in a browser

The iframe is same-origin (sandbox includes `allow-same-origin`), so a headless
browser can pierce it. A good smoke test loads `/design-arena`, reaches into the
frame's document, and asserts:

- `#scene` canvas exists with non-zero size and a live WebGL context;
- `.marker` spine markers are present (there are **7** — one per tool);
- the `#threeui-page-typography` style contains the `--serif` / `--mono` /
  `--accent` overrides;
- no console errors.

Also screenshot desktop and a ~390px mobile viewport to confirm the responsive
editorial UI. (Selectors like `.bookshelf__canvas` / `.is-ready` are from the
shared shell CSS and do **not** apply to this authored document — use `#scene`
and `.marker`.)

## Updating to a new source revision

1. Re-fetch the registered bundle and the canonical HTML from ThreeUI.
2. Overwrite the Group A assets and re-verify their SHA-256 sums; re-apply the
   Group B adaptations (local `./pageTypography` import in the frame; trim
   `LandingPages.tsx` to `CompleteShelfLandingPage` + frame re-exports) and
   record the new on-disk SHAs in the table above.
3. Re-check that the reconstructed glue still matches the component's interface
   (prop split, recipe vars, the CSS custom properties the new HTML reads).
4. `pnpm typecheck`, then re-run the browser smoke test above.
