import type {
  HtmlRenderContext,
  InlineNode,
  BlockNode,
} from "@tanstack/markdown";

import { docsMarkdownExtensions } from "@tanstack/markdown/extensions/docs";
import { parseMarkdown, renderHtml } from "@tanstack/markdown";

import { highlightMarkdownCode } from "./markdown-highlighter";

export { cn } from "cn";

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const WORDS_PER_MINUTE = 200;
const MIN_READING_MINUTES = 2;

export function calcReadingTime(body: string): string {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(
    MIN_READING_MINUTES,
    Math.ceil(words / WORDS_PER_MINUTE),
  );
  return `${minutes} min read`;
}

export const compileContent = (content: string) => {
  return renderHtml(
    parseMarkdown(content, {
      frontmatter: false,
      extensions: docsMarkdownExtensions(),
    }),
    {
      highlighter: highlightMarkdownCode,
      codeLineNumbers: true,
      headingAnchors: {
        content: "#",
        className: "heading-anchor",
        ariaHidden: false,
        tabIndex: 0,
      },
      extensions: [
        {
          name: "external-links",
          renderHtml(node: BlockNode | InlineNode, ctx: HtmlRenderContext) {
            if (node.type !== "link") return undefined;
            if (!/^https?:\/\//i.test(node.href)) return undefined;
            const children = node.children.map((child) =>
              ctx.renderInline(child),
            );
            const title = node.title
              ? ` title="${escapeAttr(node.title)}"`
              : "";
            return `<a href="${escapeAttr(node.href)}"${title} target="_blank" rel="nofollow noopener noreferrer">${children.join("")}</a>`;
          },
        },
      ],
    },
  );
};
