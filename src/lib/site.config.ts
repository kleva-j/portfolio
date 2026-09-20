const name = "Michael Obasi";
const description = "Michael Obasi — software engineer.";
// Canonical production origin. Used to build absolute canonical/OG URLs so
// alternate URL forms (preview deploys, trailing slashes) aren't indexed
// separately. Update if the production domain changes.
const url = "https://michaelobasi.dev";

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
