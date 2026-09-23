import { ArrowUpRightIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { FullWidthDivider } from "@/components/full-width-divider";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site.config";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

const value = [
  "Turning a fuzzy problem into a typed domain model — the state machines, schemas, and contracts a product can be built on without constant rework.",
  "Shipping one codebase to web, mobile, and desktop instead of maintaining three that quietly drift apart.",
  "Owning a product end to end — schema, services, and interface — so there are fewer handoffs and less lost context.",
  "The unglamorous reliability work: tests, CI, and typed boundaries that keep a fast pace from turning into a fragile one.",
] as const;

const collaboration = [
  "I like a clear problem statement over a prescribed solution — give me the outcome and the constraints, and I'll come back with options and tradeoffs.",
  "I default to written, async context — short docs and tight PRs — so decisions stay legible long after the conversation.",
  "I ask “why” before “how,” and I'll push back respectfully when something feels wrong — then commit fully once we've decided.",
  "I prefer small, reviewable changes that keep the app working at every step over big-bang rewrites.",
  "I treat design as a partnership; the products I'm proudest of came from engineers and designers arguing, in good faith, over the details.",
] as const;

const sharpening = [
  "Knowing when “good enough” is genuinely enough — left alone, I'll invest in architecture before the problem has earned it.",
  "Delegating the polish I enjoy doing myself, so the work scales past my own hours.",
  "Writing more, and earlier — shipping the thinking, not only the code.",
] as const;

const principles = [
  "Make it work, make it legible, then make it fast.",
  "Boring infrastructure is a feature.",
  "The small things are the product.",
  "Optimize for whoever maintains this next — usually me.",
  "Ship in slices; keep it working the whole way.",
] as const;

const pageTitle = "How I work — Michael Obasi";
const pageDescription =
  "A short user manual — how Michael Obasi thinks, builds, and collaborates: strengths, working style, and the principles behind the work.";

export const Route = createFileRoute("/how-i-work")({
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
  component: HowIWork,
});

function SectionLabel({
  index,
  children,
  className,
}: React.PropsWithChildren<{ index?: string; className?: string }>) {
  return (
    <h2
      className={cn(
        "mb-4 flex items-center gap-2.5 text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase",
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

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-3.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-2.5 size-1 shrink-0 bg-primary/70"
          />
          <p className="max-w-prose text-base leading-relaxed text-pretty text-muted-foreground">
            {item}
          </p>
        </li>
      ))}
    </ul>
  );
}

function HowIWork() {
  return (
    <div>
      <Header />
      <main
        id="main-content"
        className="mx-auto min-h-[calc(100svh-var(--header-height)-var(--footer-height))] max-w-3xl px-6 py-6"
      >
        <section className="py-8 sm:py-14">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            How I work
          </p>
          <h1 className="mt-5 font-heading text-3xl leading-[1.1] font-medium tracking-tight text-balance sm:text-4xl">
            A short user manual.
          </h1>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-pretty">
            The stuff a résumé leaves out — how I think, where I'm strongest,
            how I like to collaborate, and what I'm still working on. If we
            might build something together, this is the fastest way to know what
            you'd be getting.
          </p>

          <div className="mt-10 border-t border-border pt-8">
            <SectionLabel index="01">How I operate</SectionLabel>
            <div className="space-y-4">
              <p className="max-w-prose text-base leading-relaxed text-pretty text-foreground">
                I'm a product engineer who ships cross-platform software end to
                end. My instinct is to collapse a problem into shared, typed
                domain logic — state machines, schemas, contracts — then let a
                single codebase reach web, mobile, and desktop at once instead
                of rebuilding it three times.
              </p>
              <p className="max-w-prose text-base leading-relaxed text-pretty text-muted-foreground">
                Recently that's looked like PairSync (P2P file sharing, no
                cloud), a fintech savings platform with an idempotent
                transaction ledger, and Notemark (notes everywhere, end-to-end
                type-safe). I reach for tools like Drizzle, Zod, and XState
                because I want behavior that's legible and hard to break.
              </p>
              <p className="max-w-prose text-base leading-relaxed text-pretty text-muted-foreground">
                I invest in the boring infrastructure early — tests, CI, typed
                boundaries — because that's what keeps shipping fast from
                turning into shipping regressions. I care about the small
                things, since that's usually where a product feels considered
                instead of assembled.
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-border pt-8">
            <SectionLabel index="02">Where I add the most value</SectionLabel>
            <BulletList items={value} />
          </div>

          <div className="mt-10 border-t border-border pt-8">
            <SectionLabel index="03">Working with me</SectionLabel>
            <BulletList items={collaboration} />
          </div>

          <div className="mt-10 border-t border-border pt-8">
            <SectionLabel index="04">What I'm still sharpening</SectionLabel>
            <BulletList items={sharpening} />
          </div>

          <div className="mt-10 border-t border-border pt-8">
            <SectionLabel index="05">A few principles</SectionLabel>
            <ul className="grid gap-3">
              {principles.map((principle, i) => (
                <li key={principle} className="flex gap-3.5">
                  <span className="mt-0.5 font-mono text-[11px] text-primary/70 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base leading-relaxed text-foreground">
                    {principle}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-border pt-8">
            <Button
              render={<a href={siteConfig.mailto} />}
              nativeButton={false}
            >
              <EnvelopeSimpleIcon /> Get in touch
            </Button>
            <Button
              variant="ghost"
              render={<Link to="/about" />}
              nativeButton={false}
            >
              More about me
              <ArrowUpRightIcon weight="bold" />
            </Button>
          </div>
        </section>
      </main>

      <FullWidthDivider />
      <Footer />
    </div>
  );
}
