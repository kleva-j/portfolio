import { defineCollection, defineConfig } from "@content-collections/core";
import { remarkMarkAndUnravel } from "safe-mdx/parse";
import { remarkPlugins } from "@prose-ui/core";
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

export default defineConfig({ content: [posts] });
