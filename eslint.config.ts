import { tanstackConfig } from "@tanstack/eslint-config";

export default [
  ...tanstackConfig,
  {
    rules: {
      "import/no-cycle": "off",
      "import/order": "off",
      "sort-imports": "off",
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/require-await": "off",
      "pnpm/json-enforce-catalog": "off",
    },
  },
  {
    // Byte-exact vendored ThreeUI registered source — must not be rewritten by
    // lint autofix. See docs/THREEUI.md.
    ignores: [
      "eslint.config.ts",
      ".prettierrc",
      "src/shaders/landing-pages/LandingPageFrame.tsx",
      "src/shaders/landing-pages/LandingPages.tsx",
    ],
  },
];
