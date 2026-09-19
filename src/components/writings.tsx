import { ArrowUpRightIcon } from "@phosphor-icons/react";

import { CollapsibleCard } from "@/components/collapsible-card";
import { GridFiller } from "@/components/grid-filler";
import { cn } from "@/lib/utils";

type WritingType = {
  title: string;
  date: string;
  description: string;
  category: string;
  href: string;
};

const writeups: WritingType[] = [
  {
    title: "Designing PairSync's sync protocol without a server",
    date: "Jun 2026",
    category: "Engineering",
    description:
      "How I built conflict-free file and clipboard sync over a direct peer connection — no cloud, no relay, no accounts.",
    href: "#",
  },
  {
    title: "Type as interface: designing an editorial portfolio",
    date: "Apr 2026",
    category: "Design",
    description:
      "Notes on letting typography and whitespace carry the UI, and cutting every border that wasn't doing real work.",
    href: "#",
  },
  {
    title: "Shipping a Three.js showcase without tanking performance",
    date: "Feb 2026",
    category: "Engineering",
    description:
      "Lessons from the interactive bookshelf: instancing, texture atlases, and knowing when to stop rendering.",
    href: "#",
  },
  {
    title: "Reaching for fewer dependencies",
    date: "Dec 2025",
    category: "Notes",
    description:
      "Every package is a small bet on someone else's roadmap. A few heuristics I now use before adding one.",
    href: "#",
  },
  {
    title: "Cross-platform without Electron",
    date: "Oct 2025",
    category: "Engineering",
    description:
      "Why I moved to a native core with thin platform clients, and what that traded away.",
    href: "#",
  },
];

export const Writings = () => {
  return (
    <CollapsibleCard
      title="Writings"
      description="Recent articles, essays, and technical writing."
    >
      <div className="grid grid-cols-1 gap-px border-t bg-border sm:grid-cols-2 md:grid-cols-3">
        {writeups.map((writeup) => (
          <WritingCard {...writeup} key={writeup.title} />
        ))}
        <GridFiller
          className="bg-background"
          totalItems={writeups.length}
          smColumns={2}
          mdColumns={3}
        />
      </div>
    </CollapsibleCard>
  );
};

function WritingCard({
  title,
  date,
  description,
  category,
  className,
  ...props
}: React.ComponentProps<"a"> & WritingType) {
  return (
    <a
      className={cn(
        "group flex flex-col bg-background px-5 py-6 transition-colors hover:bg-accent/40 md:px-6",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
        <span className="text-primary/80">{category}</span>
        <span
          aria-hidden="true"
          className="size-0.5 rounded-full bg-muted-foreground/60"
        />
        <time className="tracking-normal tabular-nums">{date}</time>
      </div>
      <h3 className="mt-3 line-clamp-2 text-sm leading-snug font-medium text-foreground md:text-base">
        {title}
      </h3>
      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>
      <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
        Read
        <ArrowUpRightIcon
          weight="bold"
          className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
        />
      </span>
    </a>
  );
}
