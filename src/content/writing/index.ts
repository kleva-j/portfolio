export type ArticleMeta = {
  slug: string;
  title: string;
  /** Display date, e.g. "Dec 2025". */
  date: string;
  /** Machine-readable date for the `datetime` attribute. */
  dateTime: string;
  category: string;
  description: string;
  readingTime: string;
  /** Show the live streaming-renderer demo at the end of the article. */
  demo?: boolean;
};

/** Article metadata plus its resolved Markdown source. */
export type Article = ArticleMeta & {
  /** Markdown source, rendered through the durable-AST renderer. */
  body: string;
};

// Per-slug body loaders. Each `?raw` import is dynamic, so Vite code-splits the
// article bodies into their own chunks: metadata-only consumers (the /writing
// index and the home Writings section) never pull a post body into their
// bundle, and the archive can grow without bloating those pages.
const articleBodies = new Map<string, () => Promise<string>>([
  [
    "pairsync-sync-protocol",
    () => import("./pairsync-sync-protocol.md?raw").then((m) => m.default),
  ],
  [
    "type-as-interface",
    () => import("./type-as-interface.md?raw").then((m) => m.default),
  ],
  [
    "threejs-showcase-performance",
    () => import("./threejs-showcase-performance.md?raw").then((m) => m.default),
  ],
  [
    "fewer-dependencies",
    () => import("./fewer-dependencies.md?raw").then((m) => m.default),
  ],
  [
    "cross-platform-without-electron",
    () =>
      import("./cross-platform-without-electron.md?raw").then((m) => m.default),
  ],
]);

// Newest first. This is the single source of truth for both the /writing index
// and each /writing/$slug detail page, so the section and the routes never
// drift. Bodies are loaded lazily via `getArticle`.
export const articles: ArticleMeta[] = [
  {
    slug: "pairsync-sync-protocol",
    title: "Designing PairSync's sync protocol without a server",
    date: "Jun 2026",
    dateTime: "2026-06",
    category: "Engineering",
    description:
      "How I built conflict-free file and clipboard sync over a direct peer connection — no cloud, no relay, no accounts.",
    readingTime: "5 min read",
  },
  {
    slug: "type-as-interface",
    title: "Type as interface: designing an editorial portfolio",
    date: "Apr 2026",
    dateTime: "2026-04",
    category: "Design",
    description:
      "Notes on letting typography and whitespace carry the UI, and cutting every border that wasn't doing real work.",
    readingTime: "4 min read",
  },
  {
    slug: "threejs-showcase-performance",
    title: "Shipping a Three.js showcase without tanking performance",
    date: "Feb 2026",
    dateTime: "2026-02",
    category: "Engineering",
    description:
      "Lessons from the interactive bookshelf: instancing, texture atlases, and knowing when to stop rendering.",
    readingTime: "5 min read",
  },
  {
    slug: "fewer-dependencies",
    title: "Reaching for fewer dependencies",
    date: "Dec 2025",
    dateTime: "2025-12",
    category: "Notes",
    description:
      "Every package is a small bet on someone else's roadmap. A few heuristics I now use before adding one.",
    readingTime: "4 min read",
    demo: true,
  },
  {
    slug: "cross-platform-without-electron",
    title: "Cross-platform without Electron",
    date: "Oct 2025",
    dateTime: "2025-10",
    category: "Engineering",
    description:
      "Why I moved to a native core with thin platform clients, and what that traded away.",
    readingTime: "6 min read",
  },
];

/** Look up article metadata (no body). Safe for index/list rendering and `head`. */
export function getArticleMeta(slug: string): ArticleMeta | undefined {
  return articles.find((article) => article.slug === slug);
}

/**
 * Resolve an article and its body. The body chunk is fetched on demand, so only
 * the detail route pays for it. Returns `undefined` for an unknown slug.
 */
export async function getArticle(slug: string): Promise<Article | undefined> {
  const meta = getArticleMeta(slug);
  const loadBody = articleBodies.get(slug);
  if (!meta || !loadBody) return undefined;
  return { ...meta, body: await loadBody() };
}
