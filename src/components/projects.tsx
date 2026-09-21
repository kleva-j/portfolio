import { ArrowUpRightIcon } from "@phosphor-icons/react";

import { FeatureCard } from "@/components/feature-card";
import { siteConfig } from "@/lib/site.config";

type Project = {
  name: string;
  year: string;
  role: string;
  summary: string;
  stack: string[];
  href: string;
  /** Internal route links navigate in-place; external links open in a new tab. */
  external?: boolean;
};

const projects: Project[] = [
  {
    name: "PairSync",
    year: "2026",
    role: "Open source",
    summary:
      "Peer-to-peer file and clipboard sharing for desktop and mobile over the local network — no cloud, accounts, or relay servers.",
    stack: ["Tauri", "Rust", "React Native", "Expo", "XState"],
    href: siteConfig.externalLinks.project,
    external: true,
  },
  {
    name: "clinicore",
    year: "2026",
    role: "Full-stack",
    summary:
      "A full-stack clinic management system — patients, appointments, treatments, and staff, with role-based access, consent, and audit logging.",
    stack: ["TanStack Start", "oRPC", "Better Auth", "Drizzle", "Postgres"],
    href: "https://clinicore-web.vercel.app",
    external: true,
  },
  {
    name: "Summarly",
    year: "2026",
    role: "Full-stack",
    summary:
      "A content summarizer with accounts and voice interaction, turning long-form material into concise, listenable briefings.",
    stack: ["Next.js 15", "Convex", "Clerk", "ElevenLabs"],
    href: "https://summarly-seven.vercel.app",
    external: true,
  },
  {
    name: "Notemark",
    year: "2025",
    role: "Open source",
    summary:
      "Cross-platform markdown notes for web, desktop, and mobile, with AI assistance and a shared sync core.",
    stack: ["Turborepo", "Hono", "oRPC", "Tauri", "Expo"],
    href: `${siteConfig.externalLinks.github}/notemark-monorepo`,
    external: true,
  },
  {
    name: "DevGrade",
    year: "2026",
    role: "Full-stack",
    summary:
      "A developer skills-assessment tool — framework competency quizzes scored across normalized proficiency pillars.",
    stack: ["TanStack Start", "Drizzle", "XState", "shadcn/ui"],
    href: "https://dev-grade.vercel.app",
    external: true,
  },
  {
    name: "Chapel Hymn Book",
    year: "2026",
    role: "Mobile",
    summary:
      "An offline mobile hymnal for browsing and reading hymns anywhere, with no connection required.",
    stack: ["Expo", "Drizzle", "SQLite", "Effect"],
    href: `${siteConfig.externalLinks.github}/Chapel-Hymn-Book`,
    external: true,
  },
  {
    name: "This portfolio",
    year: "2026",
    role: "Design & build",
    summary:
      "An editorial, server-rendered personal site — a warm, text-forward reading experience with a signature interactive showcase, built for speed and legibility.",
    stack: ["TanStack Start", "React 19", "Tailwind v4"],
    href: `${siteConfig.externalLinks.github}/portfolio`,
    external: true,
  },
];

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
          {projects.map((project, index) => (
            <li key={project.name}>
              <ProjectRow index={index + 1} project={project} />
            </li>
          ))}
        </ul>
      </div>
    </FeatureCard>
  );
};

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { name, year, role, summary, stack, href, external } = project;

  const linkProps = external
    ? { href, target: "_blank" as const, rel: "noreferrer" }
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
