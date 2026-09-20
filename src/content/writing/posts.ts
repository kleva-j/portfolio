// Client-safe surface for the Writing content: re-exports server-only types and
// wraps the readers in server functions whose bodies are stripped from the
// client bundle, so the parser/highlighter never enter the client graph.
import { createServerFn } from "@tanstack/react-start";
import { notFound } from "@tanstack/react-router";

export type { Post, PostMeta } from "./posts.server";

export const getPosts = createServerFn().handler(async () => {
  const { listPosts } = await import("./posts.server");
  return listPosts();
});

export const getPost = createServerFn()
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const { readPost } = await import("./posts.server");
    const post = readPost(slug);
    if (!post) throw notFound();
    const { markdownHighlightCss } = await import("@/lib/markdown-highlighter");
    return { ...post, css: markdownHighlightCss };
  });
