import { createFileRoute } from "@tanstack/react-router";

import { getPosts } from "@/content/writing/posts-collections";
import { buildRssFeed } from "@/content/writing/rss";
import { siteConfig } from "@/lib/site.config";

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildRssFeed(getPosts(), siteConfig.url), {
          headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
          },
        }),
    },
  },
});
