import { EnvelopeSimpleIcon } from "@phosphor-icons/react";
import { FullWidthDivider } from "@/components/full-width-divider";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site.config";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

const focus = [
  [
    "PairSync",
    "Peer-to-peer file and clipboard sharing — open source. Tauri, Rust, Expo.",
  ],
  [
    "Design system",
    "Personal component library built on Tailwind v4 + Base UI.",
  ],
  ["Writing", "Occasional long-form on engineering decisions and tooling."],
] as const;

const experience = [
  ["2026 – present", "Independent Engineer", "PairSync"],
  ["2026", "Software Engineer (Contract)", "Screenstack.tech"],
  ["2022", "Software Engineer", "Aduro Creative"],
  ["2021", "Frontend Engineer", "LawPavilion"],
  ["2019", "Frontend Engineer", "Tulaa"],
] as const;

const pageTitle = "About — Michael Obasi";
const pageDescription =
  "Michael Obasi — a software engineer with 6+ years across frontend, full-stack, and cross-platform mobile.";

export const Route = createFileRoute("/about")({
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
  component: About,
});

function SectionLabel({
  index,
  children,
  className,
}: React.PropsWithChildren<{ index?: string; className?: string }>) {
  return (
    <h2
      className={cn(
        "mb-4 flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.12em] text-muted-foreground uppercase",
        className,
      )}
    >
      {index ? (
        <span className="font-mono text-[10px] font-medium tracking-normal text-primary/80 tabular-nums">
          {index}
        </span>
      ) : null}
      {children}
    </h2>
  );
}

function About() {
  return (
    <div>
      <Header />
      <main
        id="main-content"
        className="mx-auto min-h-[calc(100svh-var(--header-height)-var(--footer-height))] max-w-3xl px-6 py-6"
      >
        <section className="py-8 sm:py-14">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            About
          </p>
          <h1 className="mt-5 font-heading text-3xl leading-[1.1] font-medium tracking-tight text-balance sm:text-4xl">
            Software engineer, builder, occasional writer.
          </h1>

          <div className="mt-10 space-y-5 border-t border-border pt-8">
            <p className="text-lg leading-relaxed text-pretty">
              Hi 👋🏻, I'm Michael — a software engineer who loves exploring,
              building and shiping new application that solves something. I care
              about reliable systems that are fast, legible, and kind to the
              people who maintain them.
            </p>
            <p className="text-base leading-relaxed text-pretty text-muted-foreground">
              My work spans frontend and full-stack product engineering, from
              Angular CRMs to React apps and cross-platform mobile.
            </p>
            <p className="text-base leading-relaxed text-pretty text-muted-foreground">
              Right now I'm building{" "}
              <a
                href={siteConfig.externalLinks.project}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                PairSync
              </a>{" "}
              — a peer-to-peer file and clipboard sharing tool for desktop and
              mobile. No cloud, no accounts, no relay servers.
            </p>
          </div>

          <div className="mt-10 border-t border-border pt-8">
            <SectionLabel index="01">Current focus</SectionLabel>
            <ul className="grid gap-3.5">
              {focus.map(([title, description]) => (
                <li key={title} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[0.55rem] size-1 shrink-0 bg-primary/70"
                  />
                  <p className="text-sm leading-relaxed">
                    <span className="font-medium text-foreground">{title}</span>
                    <span className="text-muted-foreground">
                      {" — "}
                      {description}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 border-t border-border pt-8">
            <SectionLabel index="02">Experience</SectionLabel>
            <ul className="grid gap-5">
              {experience.map(([period, role, company]) => (
                <li
                  key={period}
                  className="grid gap-0.5 sm:grid-cols-[9rem_1fr] sm:items-baseline sm:gap-x-6"
                >
                  <span className="text-[13px] text-muted-foreground tabular-nums">
                    {period}
                  </span>
                  <p className="text-sm leading-relaxed">
                    <span className="font-medium text-foreground">{role}</span>
                    <span className="text-muted-foreground">
                      {" · "}
                      {company}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 border-t border-border pt-8">
            <SectionLabel index="03">Get in touch</SectionLabel>
            <div className="mb-5 flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="size-2 shrink-0 bg-primary motion-safe:animate-pulse"
              />
              <span className="text-sm font-medium text-foreground">
                Open to new work
              </span>
            </div>
            <p className="mb-6 max-w-prose text-base leading-relaxed text-pretty text-muted-foreground">
              Always up for interesting engineering problems, consulting work,
              and conversations about systems design. Email is the fastest way
              to reach me.
            </p>
            <Button
              render={<a href={siteConfig.mailto} />}
              nativeButton={false}
            >
              <EnvelopeSimpleIcon /> Send a message
            </Button>
          </div>
        </section>
      </main>

      <FullWidthDivider />
      <Footer />
    </div>
  );
}
