import crossPlatformWithoutElectron from "./cross-platform-without-electron.md?raw";
import threejsShowcasePerformance from "./threejs-showcase-performance.md?raw";
import pairsyncSyncProtocol from "./pairsync-sync-protocol.md?raw";
import fewerDependencies from "./fewer-dependencies.md?raw";
import typeAsInterface from "./type-as-interface.md?raw";

export type Article = {
  slug: string;
  title: string;
  /** Display date, e.g. "Dec 2025". */
  date: string;
  /** Machine-readable date for the `datetime` attribute. */
  dateTime: string;
  category: string;
  description: string;
  readingTime: string;
  /** Markdown source, rendered through the durable-AST renderer. */
  body: string;
  /** Show the live streaming-renderer demo at the end of the article. */
  demo?: boolean;
};

// Newest first. This is the single source of truth for both the /writing index
// and each /writing/$slug detail page, so the section and the routes never drift.
export const articles: Article[] = [
  {
    slug: "pairsync-sync-protocol",
    title: "Designing PairSync's sync protocol without a server",
    date: "Jun 2026",
    dateTime: "2026-06",
    category: "Engineering",
    description:
      "How I built conflict-free file and clipboard sync over a direct peer connection — no cloud, no relay, no accounts.",
    readingTime: "5 min read",
    body: pairsyncSyncProtocol,
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
    body: typeAsInterface,
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
    body: threejsShowcasePerformance,
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
    body: fewerDependencies,
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
    body: crossPlatformWithoutElectron,
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
