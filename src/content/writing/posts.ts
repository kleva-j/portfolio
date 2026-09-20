// Client-safe import surface for the Writing content. The heavy work lives in
// `posts.server.ts`; here we only re-export its types (erased at build) and wrap
// its readers in server functions whose handler bodies are stripped from the
// client bundle. Nothing in this module pulls the parser or highlighter into the
// client graph.
import { createServerFn } from "@tanstack/react-start";
import { notFound } from "@tanstack/react-router";

export type { Post, PostMeta } from "./posts.server";

/** Post metadata for the /writing index and the home Writing section. */
export const getPosts = createServerFn().handler(async () => {
  const { listPosts } = await import("./posts.server");
  return listPosts();
});

/**
 * A single rendered post plus its highlight-theme CSS. The article route injects
 * `css` via `head().styles`, which keeps the theme generator server-only. Throws
 * a 404 for an unknown slug.
 */
export const getPost = createServerFn()
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const { readPost } = await import("./posts.server");
    const post = readPost(slug);
    if (!post) throw notFound();
    const { markdownHighlightCss } = await import("@/lib/markdown-highlighter");
    return { ...post, css: markdownHighlightCss };
  });
