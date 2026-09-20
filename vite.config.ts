import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { devtools } from "@tanstack/devtools-vite";
import { nitro } from "nitro/vite";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// The ThreeUI catalog component is vendored under src/shaders. These aliases let
// the configured usage import it through its published package specifier.
const threeuiEntry = fileURLToPath(
  new URL("./src/shaders/landing-pages/index.ts", import.meta.url),
);
const threeuiStyle = fileURLToPath(
  new URL("./src/shaders/threeui.css", import.meta.url),
);

// Inline the deployment platform's assigned origin into VITE_SITE_URL at build
// time so the client bundle carries the correct canonical/OG origin (Vercel,
// Cloudflare Pages, …). Skipped when VITE_SITE_URL is already set — Vite inlines
// that itself. The value is consumed by resolveSiteUrl() in
// src/lib/site.config.ts, which normalizes the protocol and trailing slash.
// `process` is read via globalThis so this file needs no Node type globals.
function buildTimeSiteUrl(): string | undefined {
  const env = (
    globalThis as {
      process?: { env?: Record<string, string | undefined> };
    }
  ).process?.env;
  if (!env || env.VITE_SITE_URL) return undefined;
  return (
    env.SITE_URL ?? // generic manual override
    env.VERCEL_PROJECT_PRODUCTION_URL ?? // Vercel: stable production domain
    env.CF_PAGES_URL ?? // Cloudflare Pages
    env.VERCEL_URL // Vercel: per-deployment fallback
  );
}

const siteUrl = buildTimeSiteUrl();

const config = defineConfig({
  define: siteUrl
    ? { "import.meta.env.VITE_SITE_URL": JSON.stringify(siteUrl) }
    : {},
  resolve: {
    tsconfigPaths: true,
    alias: [
      { find: "@designcodeio/threeui/style.css", replacement: threeuiStyle },
      { find: /^@designcodeio\/threeui$/, replacement: threeuiEntry },
    ],
  },
  plugins: [devtools(), tailwindcss(), tanstackStart(), nitro(), viteReact()],
});

export default config;
