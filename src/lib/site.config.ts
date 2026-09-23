const name = "Michael Obasi";
const description = "Michael Obasi — software engineer.";

// Canonical origin for absolute canonical/OG URLs. Resolved from the env so it
// works across platforms: VITE_SITE_URL (explicit, build-time inlined) →
// platform origin (server runtime) → localhost. Protocol defaults to https;
// trailing slashes are dropped.
function normalizeOrigin(value: string): string {
  const withProtocol = /^[a-z][a-z0-9+.-]*:\/\//i.test(value)
    ? value
    : `https://${value}`;
  return withProtocol.replace(/\/+$/, "");
}

function resolveSiteUrl(): string {
  const explicit = import.meta.env.VITE_SITE_URL;
  if (explicit) return normalizeOrigin(explicit);

  // `globalThis.process` is undefined on the client, so this yields localhost
  // there; the meaningful value resolves on the server.
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
  resume: "/michael-obasi-resume.pdf",
  externalLinks: {
    linkedin: "https://www.linkedin.com/in/michael-obasi-808806140/",
    project: "https://github.com/kleva-j/pairsync",
    github: "https://github.com/kleva-j",
  },
  mailto: "mailto:kasmickleva@gmail.com",
};

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}
