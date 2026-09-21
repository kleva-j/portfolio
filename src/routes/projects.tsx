import type { Project } from "@/content/projects";

import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRightIcon } from "@phosphor-icons/react";

import { FullWidthDivider } from "@/components/full-width-divider";
import { projects } from "@/content/projects";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const pageTitle = "Projects — Michael Obasi";
const pageDescription =
  "A fuller catalogue of the things Michael Obasi has designed, built, and shipped — from PairSync to full-stack products and mobile apps.";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDescription },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDescription },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: pageDescription },
    ],
  }),
  component: ProjectsIndex,
});

function ProjectsIndex() {
  return (
    <div>
      <Header />
      <main
        id="main-content"
        className="mx-auto min-h-[calc(100svh-var(--header-height)-var(--footer-height))] max-w-3xl px-6 py-6"
      >
        <section className="py-8 sm:py-14">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Projects
          </p>
          <h1 className="mt-5 font-heading text-3xl leading-[1.1] font-medium tracking-tight text-balance sm:text-4xl">
            Things I've designed, built, and shipped.
          </h1>
          <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
            A fuller catalogue of my work — open-source tools, full-stack
            products, and mobile apps. Open any to explore the live app or the
            source.
          </p>

          <ul className="mt-12 border-t border-border">
            {projects.map((project) => (
              <li key={project.name}>
                <ProjectRow project={project} />
              </li>
            ))}
          </ul>
        </section>
      </main>
      <FullWidthDivider />
      <Footer />
    </div>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const { name, year, role, summary, stack, href, external } = project;

  const linkProps = external
    ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
    : { href };

  return (
    <a
      className="group flex flex-col gap-2 border-b border-border py-7 transition-colors hover:bg-accent/30 focus-visible:bg-accent/30 focus-visible:outline-none sm:flex-row sm:items-baseline sm:gap-8"
      {...linkProps}
    >
      <div className="flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase sm:w-40 sm:shrink-0 sm:flex-col sm:items-start sm:gap-1.5">
        <span className="text-primary/80">{role}</span>
        <span className="font-mono tracking-normal tabular-nums">{year}</span>
      </div>
      <div className="min-w-0">
        <h2 className="flex items-start gap-1.5 text-lg leading-snug font-medium text-foreground">
          <span className="transition-colors group-hover:text-primary">
            {name}
          </span>
          <ArrowUpRightIcon
            weight="bold"
            className="mt-1 size-3.5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary motion-reduce:transition-none"
          />
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {summary}
        </p>
        <p className="mt-3 text-[11px] tracking-wide text-muted-foreground/70">
          {stack.join("  ·  ")}
        </p>
      </div>
    </a>
  );
}
