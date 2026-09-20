import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";

import { CollapsibleCard } from "@/components/collapsible-card";
import { GridFiller } from "@/components/grid-filler";
import { articles } from "@/content/writing";
import type { Article } from "@/content/writing";
import { cn } from "@/lib/utils";

export const Writings = () => {
  return (
    <CollapsibleCard
      title="Writings"
      description="Recent articles, essays, and technical writing."
    >
      <div className="grid grid-cols-1 gap-px border-t bg-border sm:grid-cols-2 md:grid-cols-3">
        {articles.map((article) => (
          <WritingCard article={article} key={article.slug} />
        ))}
        <GridFiller
          className="bg-background"
          totalItems={articles.length}
          smColumns={2}
          mdColumns={3}
        />
      </div>
    </CollapsibleCard>
  );
};

function WritingCard({
  article,
  className,
}: {
  article: Article;
  className?: string;
}) {
  return (
    <Link
      to="/writing/$slug"
      params={{ slug: article.slug }}
      className={cn(
        "group flex flex-col bg-background px-5 py-6 transition-colors hover:bg-accent/40 focus-visible:bg-accent/40 focus-visible:outline-none md:px-6",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
        <span className="text-primary/80">{article.category}</span>
        <span
          aria-hidden="true"
          className="size-0.5 rounded-full bg-muted-foreground/60"
        />
        <time
          dateTime={article.dateTime}
          className="font-mono tracking-normal tabular-nums"
        >
          {article.date}
        </time>
      </div>
      <h3 className="mt-3 line-clamp-2 text-sm leading-snug font-medium text-foreground md:text-base">
        {article.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
        {article.description}
      </p>
      <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
        Read
        <ArrowUpRightIcon
          weight="bold"
          className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
        />
      </span>
    </Link>
  );
}
