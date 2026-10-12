import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { lazy, Suspense } from "react";

import { getPost, getPosts } from "@/content/writing/posts-collections";
import { markdownHighlightCss } from "@/lib/markdown-highlighter";
import { MdxContent } from "@/content/writing/mdx-components";
import { DraftNotice } from "@/components/draft-badge";
import { ArticleHtml } from "@/components/markdown";
import { absoluteUrl } from "@/lib/site.config";

import "@/styles/editor.css";
import "@/styles/prose-ui.css";

// Client tokenizer, loaded only for articles that opt into the streaming demo.
const StreamingDemo = lazy(() => import("@/components/streaming-demo"));

export const Route = createFileRoute("/writing/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    const publishedPosts = getPosts();
    const postIndex = publishedPosts.findIndex(
      (publishedPost) => publishedPost.slug === post.slug,
    );

    return {
      post,
      newerPost: postIndex > 0 ? publishedPosts[postIndex - 1] : undefined,
      olderPost: postIndex >= 0 ? publishedPosts[postIndex + 1] : undefined,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.post) return {};
    const title = `${loaderData.post.title} — Michael Obasi`;
    const seoTitle = loaderData.post.seoTitle ?? title;
    const seoDescription =
      loaderData.post.seoDescription ?? loaderData.post.description;
    const canonical = absoluteUrl(`/writing/${loaderData.post.slug}`);
    const socialImage = absoluteUrl(
      loaderData.post.socialImage ?? `/og-posts/${loaderData.post.slug}.png`,
    );
    return {
      meta: [
        { title: seoTitle },
        { name: "description", content: seoDescription },
        { property: "og:type", content: "article" },
        { property: "og:title", content: seoTitle },
        { property: "og:description", content: seoDescription },
        { property: "og:url", content: canonical },
        { property: "og:image", content: socialImage },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: seoTitle },
        { name: "twitter:description", content: seoDescription },
        { name: "twitter:image", content: socialImage },
      ],
      links: [{ rel: "canonical", href: canonical }],
      styles: [{ children: markdownHighlightCss }],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { post, newerPost, olderPost } = Route.useLoaderData();
  const mdxPost = getMdxPost(post);

  return (
    <main
      id="main-content"
      className="mx-auto min-h-[calc(100svh-var(--header-height)-var(--footer-height))] max-w-5xl px-6 py-6"
    >
      <article className="py-8 sm:py-14">
        <header className="border-b border-border pb-8 sm:pb-10">
          <Link
            to="/writing"
            className="group inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:text-primary"
          >
            <ArrowLeftIcon
              weight="bold"
              className="size-3.5 transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none"
            />
            All writing
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
            <span className="text-primary">{post.category}</span>
            <span aria-hidden="true" className="size-1 bg-border" />
            <time
              className="font-mono tracking-normal tabular-nums"
              dateTime={post.dateTime}
            >
              {post.date}
            </time>
            <span aria-hidden="true" className="size-1 bg-border" />
            <span className="font-mono tracking-normal normal-case tabular-nums">
              {post.readingTime}
            </span>
          </div>
          <h1 className="mt-5 max-w-4xl font-heading text-4xl leading-[1.04] font-medium tracking-[-0.045em] text-wrap sm:text-6xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-[64ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
            {post.description}
          </p>
          {post.draft ? <DraftNotice className="mt-8 max-w-2xl" /> : null}
        </header>

        <div className="mx-auto max-w-[68ch] py-9 sm:py-12">
          {mdxPost ? (
            <div className="prose-ui markdown-renderer">
              <MdxContent {...mdxPost} />
            </div>
          ) : (
            <ArticleHtml html={String(post.html)} />
          )}
        </div>

        {post.demo && (
          <Suspense fallback={null}>
            <StreamingDemo />
          </Suspense>
        )}

        <nav
          aria-label="More articles"
          className="grid gap-0 border-y border-border sm:grid-cols-2"
        >
          {olderPost ? (
            <Link
              to="/writing/$slug"
              params={{ slug: olderPost.slug }}
              className="group border-b border-border py-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:border-r sm:border-b-0 sm:pr-8"
            >
              <span className="text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
                Older article
              </span>
              <span className="mt-2 block text-base font-medium text-foreground transition-colors group-hover:text-primary">
                {olderPost.title}
              </span>
            </Link>
          ) : (
            <span className="hidden sm:block" aria-hidden="true" />
          )}
          {newerPost ? (
            <Link
              to="/writing/$slug"
              params={{ slug: newerPost.slug }}
              className="group py-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:pl-8 sm:text-right"
            >
              <span className="text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
                Newer article
              </span>
              <span className="mt-2 block text-base font-medium text-foreground transition-colors group-hover:text-primary">
                {newerPost.title}
              </span>
            </Link>
          ) : null}
        </nav>
      </article>
    </main>
  );
}

function getMdxPost(post: NonNullable<ReturnType<typeof getPost>>) {
  if (!post.isMdx) return undefined;
  if (post.content === undefined || post.mdast === undefined) {
    throw new Error(`Missing parsed MDX content for "${post.slug}".`);
  }

  return {
    slug: post.slug,
    markdown: post.content,
    mdast: post.mdast,
  };
}
