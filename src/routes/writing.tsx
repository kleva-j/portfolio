import { ArrowClockwiseIcon } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

import { MarkdownContent, StreamingMarkdown } from "@/components/markdown";
import { FullWidthDivider } from "@/components/full-width-divider";
import { siteConfig } from "@/lib/site.config";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const pageTitle = "Writing — Michael Obasi";
const pageDescription =
  "A technical content renderer built on TanStack Markdown: a serializable AST as the durable document model, opt-in extensions, and explicit syntax highlighting.";

export const Route = createFileRoute("/writing")({
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDescription },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDescription },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: pageDescription },
    ],
  }),
  component: Writing,
});

/**
 * Representative technical article. Authored once as Markdown source and parsed
 * a single time into the durable AST by `MarkdownContent`. It exercises the
 * enabled surface: headings with anchors, external/relative links, lists, a
 * table, a docs-preset callout, inline code, and highlighted fenced blocks.
 */
const article = `Every package you add is a small, quiet bet on someone else's roadmap.
Sometimes that bet pays for itself in an afternoon. Sometimes it compounds into a
migration you never chose. Here is the checklist I now run before reaching for a
dependency — and why the [portfolio](/) itself renders through one I trust.

## Read the shape before the README

A dependency's real interface is its exported types, not its marketing. For a
renderer, I want a document model I can hold onto:

\`\`\`ts file="parse-once.ts" {3}
import { parseMarkdown } from "@tanstack/markdown/parser";

const document = parseMarkdown(source);
const cached = JSON.stringify(document); // plain objects, safe to store
\`\`\`

That \`document\` is plain data — no classes, no closures — so it serializes,
caches, and re-renders deterministically. Parse once, render many.

> [!TIP] Treat the AST as the source of truth
> Render HTML on the server, React on the client, and the same tree drives both.
> Presentation changes never force a reparse.

## Enable only what you need

Broad Markdown stacks pull in an ecosystem. I opt into a small set instead:

| Concern | Extension | Cost |
| --- | --- | --- |
| Callouts + headings | \`extensions/docs\` | 2.3 KB |
| Streaming responses | \`extensions/streaming\` | 0.2 KB |
| Syntax highlighting | external adapter | opt-in |

The rules I keep coming back to:

- Prefer a **narrow entry point** over a convenient default barrel.
- Keep unsafe behavior *explicit* — raw HTML stays escaped unless I say otherwise.
- Push presentation concerns, like highlighting, to the edge of the system.

## Keep highlighting at the boundary

Highlighting is the classic dependency that wants to live everywhere. Registering
only the languages this site publishes keeps unknown fences as escaped text and
the client bundle small:

\`\`\`tsx file="highlighter.ts" {2,5}
const highlighter = createHighlighter({
  languages: [ts, tsx, json, shell], // nothing speculative
});

export const highlight = createTanStackMarkdownHighlighter(highlighter);
\`\`\`

When a dependency finally does need to change, the diff stays boring — which is
exactly what you want from infrastructure:

\`\`\`diff
- import remark from "remark";
+ import { parseMarkdown } from "@tanstack/markdown/parser";
\`\`\`

Fewer bets, held deliberately. That is the whole trick.`;

/**
 * A short streamed response, revealed one character at a time. Each update
 * re-parses the accumulated slice — there is no incremental parser state — so
 * incomplete trailing blocks stay predictable until they complete.
 */
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
  );
}

function Writing() {
  return (
    <div>
      <Header />
      <main
        id="main-content"
        className="mx-auto min-h-[calc(100svh-var(--header-height)-var(--footer-height))] max-w-3xl px-6 py-6"
      >
        <article className="py-8 sm:py-14">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Engineering
          </p>
          <h1 className="mt-5 font-heading text-3xl leading-[1.1] font-medium tracking-tight text-balance sm:text-4xl">
            Reaching for fewer dependencies
          </h1>
          <div className="mt-4 flex items-center gap-2 text-[13px] text-muted-foreground">
            <time className="font-mono tabular-nums" dateTime="2025-12">
              Dec 2025
            </time>
            <span
              aria-hidden="true"
              className="size-0.5 rounded-full bg-muted-foreground/60"
            />
            <span>4 min read</span>
          </div>

          <div className="mt-10 max-w-[68ch] border-t border-border pt-10">
            <MarkdownContent lineNumbers>{article}</MarkdownContent>
          </div>

          <section className="mt-16 max-w-[68ch] border-t border-border pt-10">
            <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
              Live demo
            </p>
            <h2 className="mt-4 font-heading text-xl font-medium tracking-tight">
              The same renderer, streaming
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The block below feeds an accumulating string into the streaming
              profile. Every frame reparses from scratch — press replay to watch
              it rebuild deterministically.
            </p>
            <StreamingDemo />
          </section>

          <p className="mt-14 text-sm text-muted-foreground">
            Prefer email?{" "}
            <a
              href={siteConfig.mailto}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Get in touch
            </a>
            .
          </p>
        </article>
      </main>
      <FullWidthDivider />
      <Footer />
    </div>
  );
}
