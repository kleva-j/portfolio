import { markdownRendererClassName } from "@/lib/markdown-theme";
import { cn } from "@/lib/utils";

export type ArticleHtmlProps = {
  html: string;
  className?: string;
};

export function ArticleHtml({ html, className }: ArticleHtmlProps) {
  return (
    <div className={cn(markdownRendererClassName, "md-prose", className)}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
