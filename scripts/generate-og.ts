import { mkdir, readFile, readdir, rename, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { renderStill, selectComposition } from "@remotion/renderer";
import { bundle } from "@remotion/bundler";
import { z } from "zod";

import matter from "gray-matter";

import { postFrontmatterSchema } from "../src/content/writing/post-schema.ts";
import type { PostOgProps } from "../src/remotion/post-og.tsx";

const root = process.cwd();
const contentDirectory = resolve(root, "src/content/writing");
const outputDirectory = resolve(root, "public/og-posts");
const manifestPath = resolve(outputDirectory, "og-metadata.json");
const entryPoint = resolve(root, "src/remotion/root.tsx");
const manifestVersion = 2;

type Manifest = {
  version: number;
  posts: Record<string, { hash: string; file: string }>;
};

const manifestSchema = z.object({
  version: z.number().int(),
  posts: z.record(z.string(), z.object({ hash: z.string(), file: z.string() })),
});

const savedManifest = existsSync(manifestPath)
  ? manifestSchema.parse(JSON.parse(await readFile(manifestPath, "utf8")))
  : { version: manifestVersion, posts: {} };

const previousManifest: Manifest =
  savedManifest.version === manifestVersion
    ? savedManifest
    : { version: manifestVersion, posts: {} };

const contentFiles = (await readdir(contentDirectory))
  .filter((file) => /\.(md|mdx)$/.test(file))
  .sort();

const posts: PostOgProps[] = [];

for (const file of contentFiles) {
  const source = await readFile(resolve(contentDirectory, file), "utf8");
  const parsed = matter(source);
  const frontmatter = postFrontmatterSchema.parse({
    ...parsed.data,
    dateTime:
      parsed.data.dateTime instanceof Date
        ? parsed.data.dateTime.toISOString().slice(0, 10)
        : parsed.data.dateTime,
  });

  if (frontmatter.draft) continue;

  posts.push({
    title: frontmatter.title,
    category: frontmatter.category,
    date: frontmatter.date,
    slug: file.replace(/\.(md|mdx)$/, ""),
  });
}

await mkdir(outputDirectory, { recursive: true });

const outputs = posts.map((post) => {
  const file = `${post.slug}.png`;
  const hash = createHash("sha256")
    .update(JSON.stringify({ version: manifestVersion, post }))
    .digest("hex");

  return { post, file, hash };
});

const changed = outputs.filter(
  ({ post, file, hash }) =>
    !Object.hasOwn(previousManifest.posts, post.slug) ||
    previousManifest.posts[post.slug].hash !== hash ||
    !existsSync(resolve(outputDirectory, file)),
);

if (changed.length > 0) {
  const serveUrl = await bundle({ entryPoint });

  for (const { post, file } of changed) {
    const composition = await selectComposition({
      serveUrl,
      id: "PostOg",
      inputProps: post,
    });

    await renderStill({
      composition,
      serveUrl,
      output: resolve(outputDirectory, file),
      inputProps: post,
      imageFormat: "png",
    });
  }
}

const manifest: Manifest = {
  version: manifestVersion,
  posts: Object.fromEntries(
    outputs.map(({ post, file, hash }) => [post.slug, { hash, file }]),
  ),
};

const temporaryManifest = `${manifestPath}.tmp`;

await writeFile(
  temporaryManifest,
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8",
);

await rename(temporaryManifest, manifestPath);

console.log(
  `OG images: rendered ${changed.length}, unchanged ${outputs.length - changed.length}.`,
);
