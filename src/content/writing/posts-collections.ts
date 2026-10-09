import type { Post as PostMeta } from "content-collections";

import { allPosts } from "content-collections";

export type Post = Omit<PostMeta, "html">;

export function getPosts(): Post[] {
  return allPosts
    .filter((post) => !post.draft)
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      dateTime: post.dateTime,
      category: post.category,
      description: post.description,
      readingTime: post.readingTime,
      demo: post.demo,
      draft: post.draft,
    }))
    .sort((a, b) => b.dateTime.localeCompare(a.dateTime));
}

export function getPost(slug: string): PostMeta | undefined {
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return undefined;
  return {...post };
}
