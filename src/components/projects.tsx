import { ArrowUpRightIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";

import type { Project } from "@/content/projects";

import { FeatureCard } from "@/components/feature-card";
import { featuredProjects } from "@/content/projects";

export const Projects = () => {
  return (
    <FeatureCard className="p-0">
      <div className="relative z-10">
        <div className="p-6">
          <h3 className="text-lg/[1.1] font-medium text-foreground">
            Selected work
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            A few things I've designed, built, and shipped.
          </p>
        </div>
        <ul className="divide-y divide-border border-t border-border">
          {featuredProjects.map((project, index) => (
            <li key={project.name}>
              <ProjectRow index={index + 1} project={project} />
            </li>
          ))}
        </ul>
        <Link
          to="/projects"
          className="group flex items-center justify-between gap-2 border-t border-border px-6 py-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/40 hover:text-primary focus-visible:bg-accent/40 focus-visible:outline-none"
        >
          View all projects
          <ArrowRightIcon
            className="size-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
            weight="bold"
          />
        </Link>
      </div>
    </FeatureCard>
  );
};

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { name, year, role, summary, stack, href, external } = project;

  const linkProps = external
    ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
    : { href };

  return (
    <a
      className="group grid grid-cols-[1.25rem_1fr] items-start gap-x-3 px-6 py-5 transition-colors hover:bg-accent/40 focus-visible:bg-accent/40 focus-visible:outline-none sm:gap-x-4"
      {...linkProps}
    >
      <span className="mt-1 font-mono text-[11px] font-medium text-primary/70 tabular-nums">
        {String(index).padStart(2, "0")}
      </span>
      <div className="min-w-0">
        <div className="flex items-baseline gap-x-2.5">
          <h4 className="text-sm font-medium text-foreground md:text-base">
            {name}
          </h4>
          <span className="hidden text-[11px] tracking-[0.1em] text-muted-foreground uppercase sm:inline">
            {role}
          </span>
          <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] text-muted-foreground tabular-nums">
            {year}
            <ArrowUpRightIcon
              className="size-3.5 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary motion-reduce:transition-none"
              weight="bold"
            />
          </span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {summary}
        </p>
        <p className="mt-3 text-[11px] tracking-wide text-muted-foreground/70">
          {stack.join("  ·  ")}
        </p>
      </div>
    </a>
  );
}
