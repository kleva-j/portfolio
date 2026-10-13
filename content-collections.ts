import { defineCollection, defineConfig } from "@content-collections/core";
import { remarkMarkAndUnravel } from "safe-mdx/parse";
import { remarkPlugins } from "@prose-ui/core";
import { parse as parseYaml } from "yaml";
import { remark } from "remark";
import { z } from "zod";

import remarkCodeBlock from "@prose-ui/core/remark-code-block";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdx from "remark-mdx";

import { postFrontmatterSchema } from "@/content/writing/post-schema";
import { calcReadingTime, compileContent } from "@/lib/utils";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

const jsonValueSchema: z.ZodType<JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.array(jsonValueSchema),
    z.record(z.string(), jsonValueSchema),
  ]),
);

const yamlDocumentSchema = z.object({ content: z.string() });

const authorDataSchema = z.object({
  items: z.array(
    z.object({
      name: z.string(),
      slug: z.string(),
      role: z.string().optional(),
      location: z.string().optional(),
      bio: z.string().optional(),
      website: z.url().optional(),
      github: z.url().optional(),
      linkedin: z.url().optional(),
      x: z.url().optional(),
      avatar: z.string().optional(),
      featured: z.boolean().default(false),
      order: z.number(),
    }),
  ),
});

const projectDataSchema = z.object({
  items: z.array(
    z.object({
      name: z.string(),
      year: z.string(),
      role: z.string(),
      summary: z.string(),
      stack: z.array(z.string()),
      href: z.string(),
      external: z.boolean().default(false),
      featured: z.boolean().default(false),
      featuredOrder: z.number().optional(),
      order: z.number(),
      status: z.enum(["active", "shipped", "archived", "draft"]).optional(),
      collaborators: z.array(z.string()).optional(),
    }),
  ),
});

const arenaDataSchema = z.object({
  items: z.array(
    z.object({
      name: z.string(),
      tagline: z.string(),
      to: z.enum([
        "/arena/design-arena",
        "/arena/canvas-crowd",
        "/arena/activity-heatmap",
        "/arena/periodic-table",
      ]),
      order: z.number(),
      status: z.enum(["published", "draft"]).default("published"),
    }),
  ),
});

const careerDataSchema = z.object({
  items: z.array(
    z.object({
      role: z.string(),
      company: z.string().optional(),
      period: z.string(),
      date: z.string(),
      current: z.boolean().default(false),
      description: z.string().optional(),
      stack: z.array(z.string()).default([]),
      showInAbout: z.boolean().default(true),
      showInTimeline: z.boolean().default(true),
      order: z.number(),
    }),
  ),
});

function parseYamlData<T extends z.ZodType>(content: string, schema: T): z.output<T> {
  return schema.parse(parseYaml(content));
}

const proseRemarkPlugins = remarkPlugins().filter(
  (plugin) => plugin !== remarkCodeBlock,
);

const mdxProcessor = remark()
  .use(remarkMdx)
  .use(remarkFrontmatter, ["yaml"])
  .use(proseRemarkPlugins)
  .use(remarkMarkAndUnravel)
  .use(() => (tree, file) => {
    file.data.ast = tree;
  });

async function parseMdxAst(content: string): Promise<JsonValue> {
  const file = await mdxProcessor.process(content);
  const ast: unknown = file.data.ast;

  if (ast === undefined) {
    throw new Error("The Remark processor did not produce an MDX AST.");
  }

  return jsonValueSchema.parse(JSON.parse(JSON.stringify(ast)));
}

const authors = defineCollection({
  name: "authors",
  directory: "src/content",
  include: "authors.yaml",
  schema: yamlDocumentSchema,
  transform: (document) => parseYamlData(document.content, authorDataSchema),
});

const projects = defineCollection({
  name: "projects",
  directory: "src/content",
  include: "projects.yaml",
  schema: yamlDocumentSchema,
  transform: (document) => parseYamlData(document.content, projectDataSchema),
});

const arena = defineCollection({
  name: "arena",
  directory: "src/content",
  include: "arena.yaml",
  schema: yamlDocumentSchema,
  transform: (document) => parseYamlData(document.content, arenaDataSchema),
});

const career = defineCollection({
  name: "career",
  directory: "src/content",
  include: "career.yaml",
  schema: yamlDocumentSchema,
  transform: (document) => parseYamlData(document.content, careerDataSchema),
});

const posts = defineCollection({
  name: "posts",
  directory: "src/content/writing",
  include: "**/*.{md,mdx}",
  schema: postFrontmatterSchema.extend({ content: z.string() }),
  transform: async (document) => {
    const meta = {
      slug: document._meta.path.replace(/\.(md|mdx)$/, ""),
      title: document.title,
      date: document.date,
      dateTime: document.dateTime,
      category: document.category,
      description: document.description,
      seoTitle: document.seoTitle,
      seoDescription: document.seoDescription,
      socialImage: document.socialImage,
      demo: document.demo,
      draft: document.draft,
    };

    const isMdx = document._meta.extension === "mdx";
    const html = isMdx ? undefined : compileContent(document.content);
    const mdast = isMdx ? await parseMdxAst(document.content) : undefined;

    return {
      ...meta,
      html,
      content: isMdx ? document.content : undefined,
      mdast,
      isMdx,
      readingTime: calcReadingTime(document.content),
    };
  },
});

export default defineConfig({
  content: [authors, projects, arena, career, posts],
});
