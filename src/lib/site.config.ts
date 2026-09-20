const name = "Michael Obasi";
const description = "Michael Obasi — software engineer.";

// Production origin used to build absolute canonical/OG URLs. Deployment targets
// (Vercel, Cloudflare Pages, …) assign this dynamically, so it is resolved from
// the environment instead of being hard-coded, in priority order:
//
//   1. VITE_SITE_URL — explicit override, inlined into the client + server
//      bundle at build time. Set this for a stable canonical across every
//      environment (recommended, and required for correct client-side values).
//   2. Platform-provided origins, read from the server runtime environment.
//   3. http://localhost:3000 — local dev fallback.
//
// A value without a protocol is assumed https; trailing slashes are dropped.
function normalizeOrigin(value: string): string {
  const withProtocol = /^[a-z][a-z0-9+.-]*:\/\//i.test(value)
    ? value
    : `https://${value}`;
  return withProtocol.replace(/\/+$/, "");
}

function resolveSiteUrl(): string {
  const explicit = import.meta.env.VITE_SITE_URL;
  if (explicit) return normalizeOrigin(explicit);

  // Read `process.env` without depending on Node globals in the type surface.
  // On the client `globalThis.process` is undefined, so this yields the
  // localhost fallback there; the meaningful (SSR) value resolves on the server.
  const env = (
    globalThis as {
      process?: { env?: Record<string, string | undefined> };
    }
  ).process?.env;

  const platform =
    env?.SITE_URL ?? // generic manual override (e.g. Cloudflare Workers)
    env?.VERCEL_PROJECT_PRODUCTION_URL ?? // Vercel: stable production domain
    env?.CF_PAGES_URL ?? // Cloudflare Pages
    env?.VERCEL_URL; // Vercel: per-deployment fallback
  if (platform) return normalizeOrigin(platform);

  return "http://localhost:3000";
}

// Canonical production origin. Resolved once at module load.
const url = resolveSiteUrl();

export const siteConfig = {
  name,
  title: name,
  description,
  url,
  meta: { title: name, description },
  navigation: {
    home: "/",
    about: "/about",
    projects: "/projects",
    writing: "/writing",
  },
  externalLinks: {
    linkedin: "https://www.linkedin.com/in/michael-obasi-808806140/",
    project: "https://github.com/kleva-j/pairsync",
    github: "https://github.com/kleva-j",
  },
  mailto: "mailto:kasmickleva@gmail.com",
};

/** Build an absolute URL on the canonical origin from a root-relative path. */
export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}
