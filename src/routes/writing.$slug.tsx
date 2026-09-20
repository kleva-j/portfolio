import { ArrowClockwiseIcon, ArrowLeftIcon } from "@phosphor-icons/react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";

import { MarkdownContent, StreamingMarkdown } from "@/components/markdown";
import { FullWidthDivider } from "@/components/full-width-divider";
import { getArticle } from "@/content/writing";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const Route = createFileRoute("/writing/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) return {};
    const title = `${article.title} — Michael Obasi`;
    return {
      meta: [
        { title },
        { name: "description", content: article.description },
        { property: "og:type", content: "article" },
        { property: "og:title", content: title },
        { property: "og:description", content: article.description },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: article.description },
      ],
    };
  },
  component: ArticlePage,
});

// A short streamed response, revealed one character at a time. Each update
// re-parses the accumulated slice — no incremental parser state — so incomplete
// trailing blocks stay predictable until they complete.
const streamed = [
  "## Streaming, statelessly",
  "",
  "The renderer reparses the **accumulated text** on every update — no parser",
  "state is carried between chunks, so re-running a response is deterministic.",
  "",
  "- Incomplete trailing blocks stay suppressed",
  "- Completed prose, lists, and tables never flicker",
  "",
  "```ts",
  'const status = "streaming";',
  "```",
].join("\n");

function StreamingDemo() {
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (length >= streamed.length) return;
    const timeout = window.setTimeout(() => setLength((n) => n + 1), 16);
    return () => window.clearTimeout(timeout);
  }, [length]);

  const done = length >= streamed.length;

  return (
    <section className="mt-16 max-w-[68ch] border-t border-border pt-10">
      <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
        Live demo
      </p>
      <h2 className="mt-4 font-heading text-xl font-medium tracking-tight">
        The same renderer, streaming
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        The block below feeds an accumulating string into the streaming profile.
        Every frame reparses from scratch — press replay to watch it rebuild
        deterministically.
      </p>
      <div className="mt-6 border border-border">
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
          <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
            <span
              aria-hidden="true"
              className={
                done
                  ? "size-1.5 rounded-full bg-primary/40"
                  : "size-1.5 animate-pulse rounded-full bg-primary"
              }
            />
            {done ? "Response complete" : "Streaming…"}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setLength(0)}
            className="h-7 gap-1.5 px-2.5 text-xs"
          >
            <ArrowClockwiseIcon weight="bold" className="size-3.5" />
            Replay
          </Button>
        </div>
        <StreamingMarkdown
          content={streamed.slice(0, length)}
          className="px-4 py-5"
        />
      </div>
    </section>
  );
}

function ArticlePage() {
  const article = Route.useLoaderData();

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
            className="inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:text-primary"
          >
            <ArrowLeftIcon
              weight="bold"
              className="size-3.5 transition-transform group-hover:-translate-x-0.5"
            />
            Writing
          </Link>

          <p className="mt-8 text-xs font-medium tracking-[0.18em] text-primary/80 uppercase">
            {article.category}
          </p>
          <h1 className="mt-4 font-heading text-3xl leading-[1.1] font-medium tracking-tight text-balance sm:text-4xl">
            {article.title}
          </h1>
          <div className="mt-4 flex items-center gap-2 text-[13px] text-muted-foreground">
            <time
              className="font-mono tabular-nums"
              dateTime={article.dateTime}
            >
              {article.date}
            </time>
            <span
              aria-hidden="true"
              className="size-0.5 rounded-full bg-muted-foreground/60"
            />
            <span>{article.readingTime}</span>
          </div>

          <div className="mt-10 max-w-[68ch] border-t border-border pt-10">
            <MarkdownContent lineNumbers>{article.body}</MarkdownContent>
          </div>

          {article.demo ? <StreamingDemo /> : null}
        </article>
      </main>
      <FullWidthDivider />
      <Footer />
    </div>
  );
}
