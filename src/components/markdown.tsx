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

const docsExtensions = docsMarkdownExtensions();
const streamingExtensions = [streamingMarkdownExtension()];

const headingAnchors = { content: "#", className: "heading-anchor" } as const;

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

function HighlightThemeStyle() {
  return (
    <style href="tanstack-markdown-highlight" precedence="low">
      {markdownHighlightCss}
    </style>
  );
}

export type MarkdownContentProps = {
  children: MarkdownInput;
  className?: string;
  lineNumbers?: boolean;
};

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
  content: string;
  className?: string;
};

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
