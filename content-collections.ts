import { defineCollection, defineConfig } from "@content-collections/core";
import { docsMarkdownExtensions } from "@tanstack/markdown/extensions/docs";
import { highlightMarkdownCode } from "@/lib/markdown-highlighter";
import { parseMarkdown, renderHtml } from "@tanstack/markdown";
import { calcReadingTime, escapeAttr } from "@/lib/utils";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

const posts = defineCollection({
  name: "posts",
  directory: "src/content/writing",
  include: "**/*.{md,mdx}",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    content: z.string(),
    dateTime: z.string(),
    category: z.string(),
    description: z.string(),
    demo: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
  transform: async (document, context) => {
    const meta = {
      slug: document._meta.path.replace(/\.md$/, ""),
      title: document.title,
      date: document.date,
      dateTime: document.dateTime,
      category: document.category,
      description: document.description,
      demo: document.demo,
      draft: document.draft,
    };

    const isMdx = document._meta.path.endsWith(".mdx");
    console.log({ isMdx });

    let html: string | undefined = "";
    let mdx: string | undefined = "";

    if (isMdx) {
      mdx = await compileMDX(context, document, {
        rehypePlugins: [],
        remarkPlugins: [],
      });
    } else {
      // Parse markdown body
      const markdownDoc = parseMarkdown(document.content, {
        frontmatter: false, // Already parsed by content-collections
        extensions: docsMarkdownExtensions(),
      });

      // Render HTML with existing extensions
      html = renderHtml(markdownDoc, {
        highlighter: highlightMarkdownCode,
        codeLineNumbers: true,
        headingAnchors: {
          content: "#",
          className: "heading-anchor",
          ariaHidden: false,
          tabIndex: 0,
        },
        extensions: [
          // External links extension (preserve from posts.server.ts)
          {
            name: "external-links",
            renderHtml(node, ctx) {
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
      });
    }

    console.log({ isMdx });

    return {
      ...meta,
      html,
      isMdx,
      mdx,
      readingTime: calcReadingTime(document.content),
    };
  },
});

export default defineConfig({ content: [posts] });
