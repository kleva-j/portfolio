import type { ComponentProps } from "react";

import { createMdxComponents } from "@prose-ui/react";
import { SafeMdxRenderer } from "safe-mdx";

import { highlightMarkdownCode } from "@/lib/markdown-highlighter";

type SafeMdxAst = NonNullable<ComponentProps<typeof SafeMdxRenderer>["mdast"]>;

const mdxComponents = createMdxComponents();

type MdxContentProps = {
  slug: string;
  markdown: string;
  mdast: unknown;
};

export function MdxContent({ slug, markdown, mdast }: MdxContentProps) {
  return (
    <SafeMdxRenderer
      markdown={markdown}
      mdast={mdast as SafeMdxAst}
      components={mdxComponents}
      renderNode={(node) => {
        if (node.type !== "code") return undefined;
        const language = node.lang ?? undefined;

        return (
          <pre className="tm-code tm-code--line-numbers" data-lang={language}>
            <code
              className={language ? `language-${language}` : undefined}
              dangerouslySetInnerHTML={{
                __html: highlightMarkdownCode(node.value, language, {
                  lineNumbers: true,
                }),
              }}
            />
          </pre>
        );
      }}
      onError={(error) => {
        const location = error.line ? ` at line ${error.line}` : "";
        throw new Error(
          `safe-mdx failed to render "${slug}"${location}: ${error.message}`,
        );
      }}
    />
  );
}
