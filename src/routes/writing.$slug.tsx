import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { lazy, Suspense } from "react";

import { FullWidthDivider } from "@/components/full-width-divider";
import { ArticleHtml } from "@/components/markdown";
import { absoluteUrl } from "@/lib/site.config";
import { getPost } from "@/content/writing/posts";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// Client tokenizer, loaded only for articles that opt into the streaming demo.
const StreamingDemo = lazy(() => import("@/components/streaming-demo"));

export const Route = createFileRoute("/writing/$slug")({
  loader: async ({ params }) => await getPost({ data: params.slug }),
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const title = `${loaderData.title} — Michael Obasi`;
    const canonical = absoluteUrl(`/writing/${loaderData.slug}`);
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.description },
        { property: "og:type", content: "article" },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.description },
        { property: "og:url", content: canonical },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: loaderData.description },
      ],
      links: [{ rel: "canonical", href: canonical }],
      // The highlight theme travels with the loader data so `createThemeCss`
      // stays server-only. React 19 dedupes the hoisted style across articles.
      styles: [{ children: loaderData.css }],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const post = Route.useLoaderData();

  return (
    <div>
      <Header />
      <main
        id="main-content"
        className="mx-auto min-h-[calc(100svh-var(--header-height)-var(--footer-height))] max-w-3xl px-6 py-6"
      >
        <article className="py-8 sm:py-14">
          <Link
            to="/writing"
            className="group inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:text-primary"
          >
            <ArrowLeftIcon
              weight="bold"
              className="size-3.5 transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none"
            />
            Writing
          </Link>

          <p className="mt-8 text-xs font-medium tracking-[0.18em] text-primary/80 uppercase">
            {post.category}
          </p>
          <h1 className="mt-4 font-heading text-3xl leading-[1.1] font-medium tracking-tight text-balance sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-2 text-[13px] text-muted-foreground">
            <time className="font-mono tabular-nums" dateTime={post.dateTime}>
              {post.date}
            </time>
            <span
              aria-hidden="true"
              className="size-0.5 rounded-full bg-muted-foreground/60"
            />
            <span>{post.readingTime}</span>
          </div>

          <div className="mt-10 max-w-[68ch] border-t border-border pt-10">
            <ArticleHtml html={post.html} />
          </div>

          {post.demo ? (
            <Suspense fallback={null}>
              <StreamingDemo />
            </Suspense>
          ) : null}
        </article>
      </main>
      <FullWidthDivider />
      <Footer />
    </div>
  );
}
