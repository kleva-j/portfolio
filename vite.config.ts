import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { devtools } from "@tanstack/devtools-vite";
import { defineConfig, loadEnv } from "vite";
import { fileURLToPath } from "node:url";
import { nitro } from "nitro/vite";

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

// The env dir is this config file's directory (the project root). Deriving it
// from import.meta.url avoids referencing the Node `process` global, which isn't
// typed under `types: ["vite/client"]`.
const envDir = fileURLToPath(new URL(".", import.meta.url));

// Deployment platforms expose the assigned origin under different names. Fall
// back through them so the client bundle carries the correct canonical/OG origin
// (Vercel, Cloudflare Pages, …). Consumed by resolveSiteUrl() in
// src/lib/site.config.ts, which normalizes the protocol and trailing slash.
function platformSiteUrl(
  env: Record<string, string | undefined>,
): string | undefined {
  return (
    env.SITE_URL ?? // generic manual override
    env.VERCEL_PROJECT_PRODUCTION_URL ?? // Vercel: stable production domain
    env.CF_PAGES_URL ?? // Cloudflare Pages
    env.VERCEL_URL // Vercel: per-deployment fallback
  );
}

const config = defineConfig(({ mode }) => {
  // loadEnv(mode, dir, "") loads every key from the mode's .env* files AND merges
  // all of process.env (an empty prefix matches everything), so an explicit
  // VITE_SITE_URL — whether set in .env.production or the ambient build env —
  // always wins. Only inject the platform fallback when none is present; the
  // widened annotation keeps index access typed as string | undefined.
  const env: Record<string, string | undefined> = loadEnv(mode, envDir, "");
  const siteUrl = env.VITE_SITE_URL ? undefined : platformSiteUrl(env);

  return {
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
  };
});

export default config;
