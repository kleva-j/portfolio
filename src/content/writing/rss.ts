import type { Post } from "./posts-collections";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function buildRssFeed(posts: Post[], siteUrl: string): string {
  const feedUrl = new URL("/rss.xml", siteUrl).toString();
  const items = posts
    .map((post) => {
      const url = new URL(`/writing/${post.slug}`, siteUrl).toString();
      const dateTime = /^\d{4}-\d{2}$/.test(post.dateTime)
        ? `${post.dateTime}-01`
        : post.dateTime;
      const publicationDate = new Date(dateTime);

      if (Number.isNaN(publicationDate.valueOf())) {
        throw new Error(`Invalid publication date for post "${post.slug}".`);
      }

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(post.description)}</description>
      <category>${escapeXml(post.category)}</category>
      <pubDate>${publicationDate.toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml("Michael Obasi — Writing")}</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>${escapeXml("Essays and technical writing on engineering, design, and the tools behind PairSync.")}</description>
    <language>en</language>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
}
