import type { PageTypographyRecipe } from "./pageTypography";

/**
 * Typographic recipe for the Working Volumes bookshelf page.
 *
 * The defaults mirror the authored `complete-shelf-v2.html` document exactly —
 * its `:root` declares `--serif: "Iowan Old Style", …`, `--mono: "Inter", …`
 * and `--accent: #c87046` — and the `vars` map names the three custom
 * properties that page reads for its typographic identity. Because the recipe
 * defaults equal the authored values, the pristine page renders unchanged until
 * a prop overrides one of them.
 */
export const COMPLETE_SHELF_TYPOGRAPHY: PageTypographyRecipe = {
  headingFont: "iowan-old-style",
  bodyFont: "inter",
  headingWeight: 400,
  bodyWeight: 400,
  primaryColor: "#c87046",
  headingSize: 60,
  bodySize: 12,
  headingLetterSpacing: -0.055,
  vars: {
    headingFamily: "--serif",
    bodyFamily: "--mono",
    accent: "--accent",
  },
};
