import { createFileRoute } from "@tanstack/react-router";
import { FullWidthDivider } from "@/components/full-width-divider";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site.config";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

import {
  DownloadSimpleIcon,
  EnvelopeSimpleIcon,
  LinkedinLogoIcon,
  GithubLogoIcon,
} from "@phosphor-icons/react";

type Role = {
  period: string;
  role: string;
  company: string;
  location: string;
  current?: boolean;
  points: readonly string[];
  stack: string;
};

const summary =
  "Software engineer with 6+ years building accessible web and mobile products across frontend, full-stack, and cross-platform mobile. Comfortable owning work end to end — interface, services, and data — from data-heavy enterprise CRMs to consumer apps and fintech. Currently building PairSync, an open-source peer-to-peer file and clipboard sharing tool.";

const experience: readonly Role[] = [
  {
    period: "2026 — Present",
    role: "Independent Engineer",
    company: "PairSync",
    location: "Remote",
    current: true,
    points: [
      "Designing and building PairSync, a peer-to-peer file and clipboard sharing tool for desktop and mobile that works entirely over the local network — no cloud, accounts, or relay servers.",
      "Implemented LAN device discovery and a pairing handshake so nearby devices can find and trust each other without any central server.",
      "Modeled discovery, pairing, and transfer as a shared XState state machine so the protocol behaves identically across every client.",
      "Built a chunked file-transfer pipeline with live progress, cancellation, and backpressure handling for large files.",
      "Shipped the desktop client with Tauri and Rust and the mobile client with Expo and React Native — both driven from a single TypeScript core, covered by 249 automated tests and CI.",
    ],
    stack: "Tauri · Rust · React Native · Expo · XState · TypeScript",
  },
  {
    period: "2022 — 2026",
    role: "Founding Engineer",
    company: "AVM Daily (Fintech Savings Platform)",
    location: "Remote",
    points: [
      "Designed and sole-authored a Nigerian savings/thrift fintech suite — a customer app and an admin/operations console — as a layered domain-driven monorepo enforcing a strict domain → application → backend separation.",
      "Engineered an idempotent, double-entry-style transaction ledger (contributions, withdrawals, interest accrual, referral bonuses, constrained reversals) with reference-based idempotency, negative-balance prevention, and source-attributed audit logging.",
      "Stored money in Kobo (bigint) to remove floating-point drift and kept balance/volume analytics at O(log n) via aggregate rollups; built a self-auditing reconciliation subsystem that flags ledger discrepancies automatically.",
      "Built a multi-rule withdrawal risk engine (manual holds, bank-account cooldowns, daily caps, velocity windows) plus a role- and KYC-gated payout lifecycle, with payments kept PSP-agnostic via an adapter pattern.",
      "Delivered enterprise SSO/SAML auth (WorkOS), a real-time reactive backend (Convex), and an SSR web console plus native mobile client from one shared domain core, covered by Vitest suites across every layer.",
    ],
    stack:
      "TypeScript · Convex · TanStack Start · Effect · Drizzle · Postgres · WorkOS",
  },
  {
    period: "Mar 2026 — Aug 2026",
    role: "Software Engineer (Contract)",
    company: "Screenstack.tech",
    location: "London, UK (remote)",
    points: [
      "Delivered features end to end — responsive React frontends and the Node.js backend services powering them.",
      "Designed the PostgreSQL schema and wrote the queries, migrations, and data-access layer behind the product's core flows.",
      "Built and documented REST APIs, integrated authentication and third-party services, and owned UI/UX direction and a reusable component system.",
      "Established engineering workflows — branching strategy, PR review, release conventions, CI — and mentored teammates through pairing and code review.",
    ],
    stack: "React · Node.js · TypeScript · PostgreSQL",
  },
  {
    period: "Apr 2021 — Mar 2022",
    role: "Software Engineer",
    company: "Aduro Creative Ltd.",
    location: "London, UK (remote)",
    points: [
      "Built and maintained production React applications across client engagements, including RedWhale UK and Unibeez.",
      "Led accessibility initiatives — keyboard navigation, ARIA semantics, screen-reader support, and color-contrast fixes — moving products toward WCAG compliance and authoring guidelines reused across teams.",
      "Built a library of reusable, componentized UI pieces and ran cross-browser and mobile QA to keep client work consistent.",
    ],
    stack: "React · TypeScript · Accessibility (WCAG)",
  },
  {
    period: "Jul 2020 — Jan 2021",
    role: "Frontend Software Engineer",
    company: "LawPavilion",
    location: "Lagos, Nigeria",
    points: [
      "Architected a performance-focused Angular application with lazy-loaded routes and feature modules, code-splitting, and web workers to keep the main thread responsive.",
      "Tuned Angular change detection (OnPush) and caching to cut unnecessary re-renders.",
      "Built a library of reusable UI components and collaborated with backend engineers on API contracts.",
    ],
    stack: "Angular · TypeScript · RxJS · Web Workers",
  },
  {
    period: "May 2019 — Aug 2019",
    role: "Frontend Software Engineer",
    company: "Tulaa",
    location: "Nairobi, Kenya (remote)",
    points: [
      "Built an Angular 8 CRM used by 25,000+ users, with rich data visualization for operational insight.",
      "Reduced load time by ~30% by splitting the app into lazy-loaded modules.",
      "Established frontend patterns and code-review practices, and led and mentored the frontend team.",
    ],
    stack: "Angular 8 · TypeScript · Data visualization",
  },
];

const projects: readonly (readonly [string, string, string])[] = [
  [
    "PairSync",
    "Peer-to-peer file and clipboard sharing for desktop and mobile over the local network.",
    "Tauri · Rust · React Native · Expo · XState",
  ],
  [
    "AVM Daily",
    "Savings/thrift fintech suite with an idempotent transaction ledger, reconciliation, and a multi-rule withdrawal risk engine.",
    "Convex · TanStack Start · Effect · Drizzle · Postgres · WorkOS",
  ],
  [
    "ClinicCore",
    "Full-stack clinic management with role-based access, consent, and audit logging.",
    "TanStack Start · oRPC · Better Auth · Drizzle · Postgres",
  ],
  [
    "Notemark",
    "Cross-platform markdown notes for web, desktop, and mobile with AI assistance.",
    "Turborepo · Hono · oRPC · Tauri · Expo",
  ],
];

const skills: readonly (readonly [string, string])[] = [
  ["Languages", "TypeScript, JavaScript, Rust"],
  [
    "Frontend",
    "React, React Native, Next.js, TanStack Start, Angular, Expo, Tailwind CSS",
  ],
  [
    "Backend & data",
    "Node.js, Hono, oRPC, PostgreSQL, Drizzle, Convex, SQLite",
  ],
  [
    "Tooling & platform",
    "Tauri, XState, Better Auth, WorkOS, Effect, Turborepo",
  ],
  [
    "Practices",
    "Accessibility, performance, Agile/Scrum, mentorship, design systems",
  ],
];

const contacts = [
  { label: "Email", href: siteConfig.mailto, Icon: EnvelopeSimpleIcon },
  {
    label: "LinkedIn",
    href: siteConfig.externalLinks.linkedin,
    Icon: LinkedinLogoIcon,
  },
  {
    label: "GitHub",
    href: siteConfig.externalLinks.github,
    Icon: GithubLogoIcon,
  },
] as const;

const pageTitle = "Résumé — Michael Obasi";
const pageDescription =
  "Résumé of Michael Obasi — a software engineer with 6+ years across frontend, full-stack, and cross-platform mobile.";

export const Route = createFileRoute("/cv")({
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
  component: Resume,
});

function SectionLabel({
  index,
  children,
}: React.PropsWithChildren<{ index?: string }>) {
  return (
    <h2 className="mb-6 flex items-center gap-2.5 text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
      {index ? (
        <span className="font-mono text-[10px] font-medium tracking-normal text-primary/80 tabular-nums">
          {index}
        </span>
      ) : null}
      {children}
    </h2>
  );
}

function Resume() {
  return (
    <div>
      <div className="print:hidden">
        <Header />
      </div>
      <main
        id="main-content"
        className="mx-auto min-h-[calc(100svh-var(--header-height)-var(--footer-height))] max-w-3xl px-6 py-6 print:min-h-0 print:py-0"
      >
        <section className="py-8 sm:py-14 print:py-0">
          {/* Header row */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                Résumé
              </p>
              <h1 className="mt-5 font-heading text-3xl leading-[1.1] font-medium tracking-tight text-balance sm:text-4xl">
                Michael Obasi
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">
                Software Engineer · Lagos, Nigeria
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                {contacts.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="inline-flex items-center gap-1.5 text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
                  >
                    <Icon className="size-4" />
                    {label}
                    {label === "Email" ? (
                      <span className="hidden print:inline">
                        {" "}
                        {href.replace(/^mailto:/, "")}
                      </span>
                    ) : null}
                  </a>
                ))}
              </div>
            </div>
            <Button
              render={<a href={siteConfig.resume} download />}
              nativeButton={false}
              className="shrink-0 self-start sm:self-auto print:hidden"
            >
              <DownloadSimpleIcon /> Download PDF
            </Button>
          </div>

          {/* Summary */}
          <div className="mt-10 border-t border-border pt-8 print:mt-6 print:pt-6">
            <SectionLabel index="01">Summary</SectionLabel>
            <p className="max-w-prose text-base leading-relaxed text-pretty text-muted-foreground">
              {summary}
            </p>
          </div>

          {/* Experience */}
          <div className="mt-10 border-t border-border pt-8 print:mt-6 print:pt-6">
            <SectionLabel index="02">Experience</SectionLabel>
            <ul className="grid gap-9">
              {experience.map((job) => (
                <li
                  key={`${job.company}-${job.period}`}
                  className="grid gap-3 sm:grid-cols-[10rem_1fr] sm:gap-x-6 print:break-inside-avoid"
                >
                  <div className="sm:pt-0.5">
                    <span
                      className={cn(
                        "font-mono text-[13px] tabular-nums",
                        job.current ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      {job.period}
                    </span>
                    <p className="mt-1 text-[11px] tracking-[0.02em] text-muted-foreground/80">
                      {job.location}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base leading-snug font-medium text-foreground">
                      {job.role}
                      <span className="text-muted-foreground">
                        {" · "}
                        {job.company}
                      </span>
                    </h3>
                    <ul className="mt-3 grid gap-2">
                      {job.points.map((point) => (
                        <li key={point} className="flex gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-2 size-1 shrink-0 bg-primary/60"
                          />
                          <span className="text-sm leading-relaxed text-pretty text-muted-foreground">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 font-mono text-[11px] tracking-normal text-muted-foreground/80">
                      {job.stack}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Selected projects */}
          <div className="mt-10 border-t border-border pt-8 print:mt-6 print:pt-6">
            <SectionLabel index="03">Selected projects</SectionLabel>
            <ul className="grid gap-5">
              {projects.map(([title, description, stack]) => (
                <li key={title} className="print:break-inside-avoid">
                  <p className="text-sm leading-relaxed">
                    <span className="font-medium text-foreground">{title}</span>
                    <span className="text-muted-foreground">
                      {" — "}
                      {description}
                    </span>
                  </p>
                  <p className="mt-1 font-mono text-[11px] tracking-normal text-muted-foreground/80">
                    {stack}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div className="mt-10 border-t border-border pt-8 print:mt-6 print:pt-6">
            <SectionLabel index="04">Skills</SectionLabel>
            <ul className="grid gap-3">
              {skills.map(([label, value]) => (
                <li
                  key={label}
                  className="grid gap-0.5 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-x-6"
                >
                  <span className="text-[11px] font-medium tracking-[0.08em] text-foreground uppercase">
                    {label}
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Education */}
          <div className="mt-10 border-t border-border pt-8 print:mt-6 print:pt-6">
            <SectionLabel index="05">Education</SectionLabel>
            <p className="text-sm leading-relaxed">
              <span className="font-medium text-foreground">
                B.Eng, Civil Engineering
              </span>
              <span className="text-muted-foreground">
                {" — "}Federal University of Technology, Owerri · 2015 – 2018
              </span>
            </p>
          </div>
        </section>
      </main>

      <div className="print:hidden">
        <FullWidthDivider />
        <Footer />
      </div>
    </div>
  );
}
