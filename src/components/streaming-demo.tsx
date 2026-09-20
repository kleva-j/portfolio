import type {
  MarkdownComponentProps,
  MarkdownComponents,
} from "@tanstack/markdown/react";

import { streamingMarkdownExtension } from "@tanstack/markdown/extensions/streaming";
import { ArrowClockwiseIcon } from "@phosphor-icons/react";
import { Markdown } from "@tanstack/markdown/react";
import { useEffect, useState } from "react";

import { highlightMarkdownCode } from "@/lib/markdown-highlighter";
import { markdownRendererClassName } from "@/lib/markdown-theme";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const streamingExtensions = [streamingMarkdownExtension()];

const components = {
  a(props: MarkdownComponentProps<"a">) {
    const external = /^https?:\/\//i.test(props.href ?? "");
    return (
      <a
        {...props}
        rel={external ? "nofollow noopener noreferrer" : props.rel}
        target={external ? "_blank" : props.target}
      />
    );
  },
} satisfies MarkdownComponents;

function StreamingMarkdown({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div className={cn(markdownRendererClassName, "md-prose", className)}>
      <Markdown
        extensions={streamingExtensions}
        components={components}
        highlighter={highlightMarkdownCode}
        frontmatter={false}
        headingIds={false}
      >
        {content}
      </Markdown>
    </div>
  );
}

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
    // Reduced motion: reveal the finished sample instead of running the timer.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      setLength(streamed.length);
      return;
    }
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
          <span
            role="status"
            aria-live="polite"
            className="flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase"
          >
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

export default StreamingDemo;
