import type { MarkdownDocument, MarkdownInput } from "@tanstack/markdown";
import type {
  MarkdownComponentProps,
  MarkdownComponents,
} from "@tanstack/markdown/react";

import { streamingMarkdownExtension } from "@tanstack/markdown/extensions/streaming";
import { docsMarkdownExtensions } from "@tanstack/markdown/extensions/docs";
import { parseMarkdown } from "@tanstack/markdown/parser";
import { Markdown } from "@tanstack/markdown/react";
import { useMemo } from "react";

import { cn } from "@/lib/utils";
import {
  markdownRendererClassName,
  highlightMarkdownCode,
  markdownHighlightCss,
} from "@/lib/markdown-highlighter";

/**
 * Module-scoped, stable extension sets. Only the extensions this product needs
 * are enabled — the docs preset (callouts, heading collection, comment
 * components, component transforms) for authored content, and the streaming
 * profile for accumulated AI responses. Keeping them at module scope makes
 * parsing and rendering deterministic across renders.
 */
const docsExtensions = docsMarkdownExtensions();
const streamingExtensions = [streamingMarkdownExtension()];

const headingAnchors = { content: "#", className: "heading-anchor" } as const;

/**
 * Component overrides sit on top of the renderer's safe defaults (raw HTML
 * escaped, executable URL protocols stripped). External links open in a new tab
 * with hardened `rel`; in-app relative links are left untouched.
 */
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

/**
 * The generated highlight token theme, hoisted and deduplicated by React 19 via
 * a keyed `precedence` style so multiple renderers on a page share one copy and
 * the colors are present in SSR output.
 */
function HighlightThemeStyle() {
  return (
    <style href="tanstack-markdown-highlight" precedence="low">
      {markdownHighlightCss}
    </style>
  );
}

export type MarkdownContentProps = {
  /** Markdown source, or a pre-parsed, serializable document AST. */
  children: MarkdownInput;
  className?: string;
  /** Render gutter line numbers on fenced code blocks. */
  lineNumbers?: boolean;
};

/**
 * Renders authored technical content.
 *
 * The serializable AST is the durable document model: a string source is parsed
 * exactly once (memoized) into a plain-object tree, and every render draws from
 * that tree. A caller that already holds a cached `MarkdownDocument` can pass it
 * straight through, skipping parsing entirely.
 */
export function MarkdownContent({
  children,
  className,
  lineNumbers = false,
}: MarkdownContentProps) {
  const document: MarkdownDocument = useMemo(
    () =>
      typeof children === "string"
        ? parseMarkdown(children, { extensions: docsExtensions })
        : children,
    [children],
  );

  return (
    <div className={cn(markdownRendererClassName, "md-prose", className)}>
      <HighlightThemeStyle />
      <Markdown
        extensions={docsExtensions}
        components={components}
        highlighter={highlightMarkdownCode}
        headingAnchors={headingAnchors}
        codeLineNumbers={lineNumbers}
      >
        {document}
      </Markdown>
    </div>
  );
}

export type StreamingMarkdownProps = {
  /** The full text accumulated so far from a streamed response. */
  content: string;
  className?: string;
};

/**
 * Renders the accumulated text of a streamed AI response.
 *
 * Each update re-parses the complete accumulated string; no incremental parser
 * state is carried between updates. The streaming profile suppresses incomplete
 * trailing block placeholders, and frontmatter and heading IDs are disabled so a
 * late-arriving delimiter can't reinterpret earlier output or churn element IDs.
 * Safe defaults are preserved — untrusted output keeps raw HTML escaped and
 * executable URLs stripped.
 */
export function StreamingMarkdown({
  content,
  className,
}: StreamingMarkdownProps) {
  return (
    <div className={cn(markdownRendererClassName, "md-prose", className)}>
      <HighlightThemeStyle />
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
