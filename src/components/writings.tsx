import type { PostMeta } from "@/content/writing/posts";

import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";

import { CollapsibleCard } from "@/components/collapsible-card";
import { GridFiller } from "@/components/grid-filler";
import { DraftTag } from "@/components/draft-badge";
import { cn } from "@/lib/utils";

export const Writings = ({ posts }: { posts: PostMeta[] }) => {
  return (
    <CollapsibleCard
      title="Writings"
      description="Recent articles, essays, and technical writing."
    >
      <div className="grid grid-cols-1 gap-px border-t bg-border sm:grid-cols-2 md:grid-cols-3">
        {posts.map((article) => (
          <WritingCard article={article} key={article.slug} />
        ))}
        <GridFiller
          className="bg-background"
          totalItems={posts.length}
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
  article: PostMeta;
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
      <div className="flex items-center justify-between gap-2 text-[11px] font-medium tracking-[0.12em] uppercase">
        <span className="text-primary/80">{article.category}</span>
        {article.draft ? <DraftTag /> : null}
      </div>
      <h3 className="mt-4 line-clamp-2 text-sm leading-snug font-medium text-foreground md:text-base">
        {article.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
        {article.description}
      </p>
      <div className="mt-6 flex items-center justify-between gap-2 text-xs">
        <time
          dateTime={article.dateTime}
          className="font-mono text-muted-foreground tabular-nums"
        >
          {article.date}
        </time>
        <span className="inline-flex items-center gap-1 font-medium text-muted-foreground transition-colors group-hover:text-primary">
          Read
          <ArrowUpRightIcon
            weight="bold"
            className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
          />
        </span>
      </div>
    </Link>
  );
}
