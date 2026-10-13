import { mdxParse } from "safe-mdx/parse";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { MdxContent } from "./mdx-components";

describe("MdxContent", () => {
  it("uses the site Markdown highlighter for fenced code blocks", () => {
    const markdown = "```ts\nconst answer = 42;\n```";
    const html = renderToStaticMarkup(
      <MdxContent slug="test" markdown={markdown} mdast={mdxParse(markdown)} />,
    );

    expect(html).toContain('class="tm-code tm-code--line-numbers"');
    expect(html).toContain('class="language-ts"');
    expect(html).toContain('class="th-token th-keyword">const</span>');
    expect(html).not.toContain('class="shiki custom"');
  });

  it("uses the site Markdown highlighter for Prose UI CodeBlock components", () => {
    const markdown =
      '<CodeBlock language="ts" code="const answer = 42;" showLineNumbers />';
    const html = renderToStaticMarkup(
      <MdxContent slug="test" markdown={markdown} mdast={mdxParse(markdown)} />,
    );

    expect(html).toContain('class="tm-code tm-code--line-numbers"');
    expect(html).toContain('class="language-ts"');
    expect(html).toContain('class="th-token th-keyword">const</span>');
    expect(html).not.toContain('class="shiki custom"');
  });
});
