import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";

import type { ArenaShowcase } from "@/content/portfolio-data";

import { arenaShowcases } from "@/content/portfolio-data";
import { FeatureCard } from "@/components/feature-card";

export const Arena = () => {
  return (
    <FeatureCard className="p-0">
      <div className="relative z-10">
        <div className="p-6">
          <h3 className="text-lg/[1.1] font-medium text-foreground">Arena</h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Interactive experiments and signature showcases — open one to play.
          </p>
        </div>
        <ul className="grid grid-cols-1 gap-px border-t border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {arenaShowcases.map((showcase) => (
            <li key={showcase.name} className="bg-background">
              <ShowcaseCard showcase={showcase} />
            </li>
          ))}
        </ul>
      </div>
    </FeatureCard>
  );
};

function ShowcaseCard({ showcase }: { showcase: ArenaShowcase }) {
  const { name, tagline, to } = showcase;

  return (
    <Link
      className="group flex h-full flex-col gap-3 p-6 transition-colors hover:bg-accent/40 focus-visible:bg-accent/40 focus-visible:outline-none"
      to={to}
    >
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-sm font-medium text-foreground">{name}</h4>
        <ArrowUpRightIcon
          className="size-3.5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary motion-reduce:transition-none"
          weight="bold"
        />
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">{tagline}</p>
    </Link>
  );
}
