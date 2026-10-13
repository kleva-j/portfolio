import { describe, expect, it } from "vitest";

import { buildRssFeed } from "./rss";
import type { Post } from "./posts-collections";

const post = {
  slug: "xml-safety",
  title: `Testing <RSS> & "quotes"`,
  date: "Oct 2026",
  dateTime: "2026-10-12",
  category: "Engineering & design",
  description: `Use <safe> text & apostrophes.`,
  seoTitle: undefined,
  seoDescription: undefined,
  socialImage: undefined,
  demo: false,
  draft: false,
  readingTime: "2 min read",
} satisfies Post;

describe("buildRssFeed", () => {
  it("builds valid RSS items with absolute canonical links and escaped XML", () => {
    const feed = buildRssFeed([post], "https://example.com");

    expect(feed).toContain('<rss version="2.0"');
    expect(feed).toContain(
      "<title>Testing &lt;RSS&gt; &amp; &quot;quotes&quot;</title>",
    );
    expect(feed).toContain(
      "<link>https://example.com/writing/xml-safety</link>",
    );
    expect(feed).toContain(
      "<description>Use &lt;safe&gt; text &amp; apostrophes.</description>",
    );
    expect(feed).toContain("<pubDate>Mon, 12 Oct 2026 00:00:00 GMT</pubDate>");
  });
});
