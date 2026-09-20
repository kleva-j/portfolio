// Server-only: pulls the Markdown parser, extensions, and highlighter at load.
// Reach it only through the server functions in `posts.ts`, never the client.
import type { MarkdownExtension } from "@tanstack/markdown";

import { docsMarkdownExtensions } from "@tanstack/markdown/extensions/docs";
import { parseMarkdown } from "@tanstack/markdown/parser";
import { renderHtml } from "@tanstack/markdown/html";

import { highlightMarkdownCode } from "@/lib/markdown-highlighter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  dateTime: string;
  category: string;
  description: string;
  readingTime: string;
  demo?: boolean;
};

export type Post = PostMeta & { html: string };

const sources = import.meta.glob<string>("./*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const parseExtensions = docsMarkdownExtensions();

// Harden external links: emit the anchor with target/rel that urlTransform
// cannot add, falling back to the core renderer otherwise.
const externalLinks: MarkdownExtension = {
  name: "external-links",
  renderHtml(node, ctx) {
    if (node.type !== "link") return undefined;
    if (!/^https?:\/\//i.test(node.href)) return undefined;
    const children = node.children.map((child) => ctx.renderInline(child));
    const title = node.title ? ` title="${escapeAttr(node.title)}"` : "";
    return `<a href="${escapeAttr(node.href)}"${title} target="_blank" rel="nofollow noopener noreferrer">${children.join("")}</a>`;
  },
};

// Keep aria-hidden/tabIndex explicit so the permalink stays focusable and
// announced (the renderer defaults them off).
const headingAnchors = {
  content: "#",
  className: "heading-anchor",
  ariaHidden: false,
  tabIndex: 0,
} as const;

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function parseFrontmatter(
  raw: string,
  slug: string,
): Omit<PostMeta, "readingTime"> {
  const fields = new Map<string, string>();
  for (const line of raw.split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    if (!key) continue;
    let value = line.slice(separator + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    fields.set(key, value);
  }

  return {
    slug,
    title: fields.get("title") ?? slug,
    date: fields.get("date") ?? "",
    dateTime: fields.get("dateTime") ?? "",
    category: fields.get("category") ?? "",
    description: fields.get("description") ?? "",
    demo: fields.get("demo") === "true" ? true : undefined,
  };
}

// ~200 wpm, rounded up, with a two-minute floor. Measured on the body only.
const WORDS_PER_MINUTE = 200;
const MIN_READING_MINUTES = 2;

function readingTime(body: string): string {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(
    MIN_READING_MINUTES,
    Math.ceil(words / WORDS_PER_MINUTE),
  );
  return `${minutes} min read`;
}

function stripFrontmatter(source: string): string {
  return source.replace(/^---\n[\s\S]*?\n---\n?/, "");
}

function stripHtml(post: Post): PostMeta {
  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    dateTime: post.dateTime,
    category: post.category,
    description: post.description,
    readingTime: post.readingTime,
    demo: post.demo,
  };
}

// Parse + render every post once at load, newest first.
function buildPosts(): Map<string, Post> {
  const posts: Post[] = [];

  for (const [path, source] of Object.entries(sources)) {
    const slug = path.replace(/^\.\//, "").replace(/\.md$/, "");
    const document = parseMarkdown(source, {
      frontmatter: true,
      extensions: parseExtensions,
    });
    const meta = parseFrontmatter(document.frontmatter ?? "", slug);
    const html = renderHtml(document, {
      highlighter: highlightMarkdownCode,
      codeLineNumbers: true,
      headingAnchors,
      extensions: [externalLinks],
    });

    posts.push({
      ...meta,
      readingTime: readingTime(stripFrontmatter(source)),
      html,
    });
  }

  posts.sort((a, b) => b.dateTime.localeCompare(a.dateTime));
  return new Map(posts.map((post) => [post.slug, post]));
}

const postsBySlug = buildPosts();

export function listPosts(): PostMeta[] {
  return [...postsBySlug.values()].map(stripHtml);
}

export function readPost(slug: string): Post | undefined {
  return postsBySlug.get(slug);
}
