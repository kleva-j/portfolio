import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

import { calcReadingTime, compileContent } from "@/lib/utils";

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

    // const isMdx = document._meta.extension;
    const isMdx = false;

    let html: string | undefined = "";
    let mdx: string | undefined = "";

    if (isMdx) {
      mdx = await compileMDX(context, document, {
        rehypePlugins: [],
        remarkPlugins: [],
      });
    } else html = compileContent(document.content);

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
