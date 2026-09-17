import { useMemo } from "react"

/**
 * Typography seam for the ThreeUI landing-page frame.
 *
 * The registered component bundle imports `applyPageCustomization`,
 * `postPageCustomization`, `splitTypographyProps`, `usePageTypography`,
 * `PageTypographyProps` and `LandingPageCustomization` from this module, but the
 * module itself is internal to ThreeUI and is not part of the published file
 * set. It is reconstructed here against the exact contract the registered
 * `LandingPageFrame` and `LandingPages` files rely on:
 *
 *   const [type, frame] = splitTypographyProps(props);
 *   const customization = usePageTypography(RECIPE, type);
 *   <LandingPageFrame {...frame} customization={customization} ... />
 *
 * and, inside the frame, on every load / change:
 *
 *   applyPageCustomization(frame, customization);   // same-origin (src) pages
 *   postPageCustomization(frame, customization);    // sandboxed (srcDoc) pages
 *
 * The customization only ever writes the CSS custom properties an authored page
 * actually exposes for its typographic identity — the packaged HTML on disk is
 * never rewritten, so it stays byte-exact. `complete-shelf-v2.html` reads
 * `--serif`, `--mono` and `--accent`, which its recipe maps onto.
 */

/**
 * Font tokens the recipes reference, resolved to the exact stacks the authored
 * pages declare for their own CSS variables. An unknown token is used as-is, so
 * a raw family name also works.
 */
const FONT_STACKS: Record<string, string> = {
  "iowan-old-style":
    '"Iowan Old Style", "Baskerville", "Times New Roman", serif',
  inter:
    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  baskerville: '"Baskerville", "Iowan Old Style", "Times New Roman", serif',
  georgia: 'Georgia, "Times New Roman", serif',
  "helvetica-neue": '"Helvetica Neue", Helvetica, Arial, sans-serif',
  "system-sans":
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
}

function resolveFontStack(token: string): string {
  return FONT_STACKS[token] ?? token
}

export type PageTypographyProps = {
  headingFont?: string
  bodyFont?: string
  headingWeight?: string | number
  bodyWeight?: string | number
  primaryColor?: string
  headingSize?: number
  bodySize?: number
  headingLetterSpacing?: number
}

const TYPOGRAPHY_KEYS = [
  "headingFont",
  "bodyFont",
  "headingWeight",
  "bodyWeight",
  "primaryColor",
  "headingSize",
  "bodySize",
  "headingLetterSpacing",
] as const satisfies ReadonlyArray<keyof PageTypographyProps>

/**
 * The CSS custom properties an authored page exposes for its typographic
 * identity. A page only reacts to the variables it actually reads; a variable
 * left undefined here is never written, so authored values stand untouched.
 */
export type PageTypographyVars = {
  headingFamily?: string
  bodyFamily?: string
  accent?: string
  headingWeight?: string
  bodyWeight?: string
  headingSize?: string
  bodySize?: string
  headingLetterSpacing?: string
}

export type PageTypographyRecipe = {
  headingFont: string
  bodyFont: string
  headingWeight: number
  bodyWeight: number
  primaryColor: string
  headingSize: number
  bodySize: number
  headingLetterSpacing: number
  vars: PageTypographyVars
}

export type ResolvedTypography = {
  headingFamily: string
  bodyFamily: string
  headingWeight: number
  bodyWeight: number
  primaryColor: string
  headingSize: number
  bodySize: number
  headingLetterSpacing: number
}

export type LandingPageCustomization = {
  /** `<style>` text appended to the loaded document's head. */
  css: string
  /** The concrete resolved values, also forwarded to sandboxed pages. */
  values: ResolvedTypography
}

/**
 * Lifts the typography props out so the rest can go on to the frame untouched.
 * Only defined typography props are carried, so an omitted prop falls through to
 * the recipe default rather than overwriting it with `undefined`.
 */
export function splitTypographyProps<T extends PageTypographyProps>(
  props: T
): [PageTypographyProps, Omit<T, keyof PageTypographyProps>] {
  const type: PageTypographyProps = {}
  const frame = { ...props } as Record<string, unknown>
  for (const key of TYPOGRAPHY_KEYS) {
    if (props[key] !== undefined) {
      ;(type as Record<string, unknown>)[key] = props[key]
    }
    delete frame[key]
  }
  return [type, frame as Omit<T, keyof PageTypographyProps>]
}

function toNumber(
  value: string | number | undefined,
  fallback: number
): number {
  if (value === undefined) return fallback
  const parsed = typeof value === "number" ? value : Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function buildCustomization(
  recipe: PageTypographyRecipe,
  overrides: PageTypographyProps
): LandingPageCustomization {
  const values: ResolvedTypography = {
    headingFamily: resolveFontStack(
      overrides.headingFont ?? recipe.headingFont
    ),
    bodyFamily: resolveFontStack(overrides.bodyFont ?? recipe.bodyFont),
    headingWeight: toNumber(overrides.headingWeight, recipe.headingWeight),
    bodyWeight: toNumber(overrides.bodyWeight, recipe.bodyWeight),
    primaryColor: overrides.primaryColor ?? recipe.primaryColor,
    headingSize: toNumber(overrides.headingSize, recipe.headingSize),
    bodySize: toNumber(overrides.bodySize, recipe.bodySize),
    headingLetterSpacing: toNumber(
      overrides.headingLetterSpacing,
      recipe.headingLetterSpacing
    ),
  }

  const vars = recipe.vars
  const declarations: string[] = []
  if (vars.headingFamily)
    declarations.push(`${vars.headingFamily}: ${values.headingFamily};`)
  if (vars.bodyFamily)
    declarations.push(`${vars.bodyFamily}: ${values.bodyFamily};`)
  if (vars.accent) declarations.push(`${vars.accent}: ${values.primaryColor};`)
  if (vars.headingWeight)
    declarations.push(`${vars.headingWeight}: ${values.headingWeight};`)
  if (vars.bodyWeight)
    declarations.push(`${vars.bodyWeight}: ${values.bodyWeight};`)
  if (vars.headingSize)
    declarations.push(`${vars.headingSize}: ${values.headingSize}px;`)
  if (vars.bodySize)
    declarations.push(`${vars.bodySize}: ${values.bodySize}px;`)
  if (vars.headingLetterSpacing)
    declarations.push(
      `${vars.headingLetterSpacing}: ${values.headingLetterSpacing}em;`
    )

  const css = declarations.length ? `:root { ${declarations.join(" ")} }` : ""
  return { css, values }
}

/**
 * Re-computed only when the recipe or the overrides actually change, so the
 * frame effect that consumes it re-runs on a prop change and on nothing else.
 */
export function usePageTypography(
  recipe: PageTypographyRecipe,
  overrides: PageTypographyProps
): LandingPageCustomization {
  const signature = JSON.stringify({ recipe, overrides })
  return useMemo(() => buildCustomization(recipe, overrides), [signature])
}

const CUSTOMIZATION_STYLE_ID = "threeui-page-typography"

/**
 * Appends (or updates) the customization `<style>` in a same-origin frame's
 * head. A cross-origin / sandboxed srcDoc frame throws on `contentDocument`
 * access; that case is served by `postPageCustomization` instead.
 */
export function applyPageCustomization(
  frame: HTMLIFrameElement | null,
  customization?: LandingPageCustomization
) {
  if (!frame || !customization) return

  let doc: Document | null = null
  try {
    doc = frame.contentDocument
  } catch {
    doc = null
  }
  const head = doc?.head
  if (!doc || !head) return

  const existing = doc.getElementById(
    CUSTOMIZATION_STYLE_ID
  ) as HTMLStyleElement | null
  if (!customization.css) {
    existing?.remove()
    return
  }

  const style = existing ?? doc.createElement("style")
  if (!existing) {
    style.id = CUSTOMIZATION_STYLE_ID
    head.appendChild(style)
  }
  if (style.textContent !== customization.css) {
    style.textContent = customization.css
  }
}

/**
 * Forwards the customization to a page that receives it over postMessage. This
 * is the seam a sandboxed srcDoc page (opaque origin) uses, since its head can
 * never be reached directly. Pages that do not listen simply ignore it.
 */
export function postPageCustomization(
  frame: HTMLIFrameElement | null,
  customization?: LandingPageCustomization
) {
  if (!frame || !customization) return
  frame.contentWindow?.postMessage(
    { type: "threeui-page-typography", customization },
    "*"
  )
}
