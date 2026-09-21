import type { ReactNode } from "react";

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import { PeriodicTable } from "@/components/ui/bjork-ui/periodic-table";

export const Route = createFileRoute("/arena/periodic-table")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
          >
            <ArrowLeftIcon
              className="size-3.5 transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none"
              weight="bold"
            />
            Back
          </Link>
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            Arena
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">
            Interactive Data
          </p>
          <h1 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Periodic Table
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            All 118 elements laid out on the standard 18-column grid. Hover or
            focus any cell for a spring-physics detail card that blurs in from
            the element, colored by its category. Motion is skipped when you
            prefer reduced motion, and the table follows the site theme.
          </p>
        </div>

        <Section
          title="Periodic Table"
          meta="@bjork-ui/periodic-table"
          description="Keyboard-navigable cells, category legend, and an f-block row broken out below the main grid — themed to match light or dark."
        >
          <Frame>
            <MountGate minH="min-h-[520px]">
              <div className="bjork-scope w-full overflow-x-auto">
                <PeriodicTable className="min-w-[880px]" />
              </div>
            </MountGate>
          </Frame>
        </Section>
      </div>
    </main>
  );
}

function Section({
  title,
  meta,
  description,
  children,
}: {
  title: string;
  meta: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-16 sm:mt-20">
      <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
        <h2 className="text-lg font-medium text-foreground">{title}</h2>
        <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          {meta}
        </span>
      </div>
      <p className="mt-3 max-w-2xl text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="border border-border bg-background p-4 sm:p-8">
      {children}
    </div>
  );
}

/**
 * Defers rendering to the client. PeriodicTable reads the document theme class
 * and measures cell geometry on mount, so gate it behind mount and reserve its
 * height to keep the layout from shifting.
 */
function MountGate({ minH, children }: { minH: string; children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className={cn("w-full", minH)} aria-hidden />;
  return <>{children}</>;
}
