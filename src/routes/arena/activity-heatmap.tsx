import type { ReactNode } from "react";

import { MonoActivityHeatmap } from "@/components/ui/mono-activity-heatmap";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import {
  HeatCalendarTooltip,
  HeatCalendarGrid,
  HeatCalendar,
} from "@/components/charts/heat-calendar";

export const Route = createFileRoute("/arena/activity-heatmap")({
  component: RouteComponent,
});

/**
 * Deterministic activity values so the grids render identically on the server
 * and the client (no hydration mismatch) and never reflow (no CLS).
 * `values[week][day]`, seven days per week, Monday-first, intensities in 0..1.
 */
function makeValues(weeks: number, seed: number): number[][] {
  let s = seed >>> 0;
  const rand = () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return Array.from({ length: weeks }, () =>
    Array.from({ length: 7 }, () => {
      const r = rand();
      return r < 0.4 ? 0 : Math.min(1, (r - 0.3) / 0.7);
    }),
  );
}

const VALUES_MAIN = makeValues(16, 0x1a2b3c);
const VALUES_SHIPS = makeValues(10, 0x51f00d);
const VALUES_COMPOSED = makeValues(16, 0x9e3779);
const VALUES_MONO = makeValues(16, 0xc0ffee);

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
            Activity Monitor
          </p>
          <h1 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Activity Heatmaps
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            A collection of activity-monitor components — single-hue
            contribution grids where magnitude reads as the strength of one
            color. Hover any tile for its date and exact count; on the Heat
            Calendar, click one cell and then another to select a range and view
            its total.
          </p>
        </div>

        <Section
          title="Heat Calendar"
          meta="@beui/heat-calendar"
          description="Token-driven, SSR-safe, and composable — Grid, Tooltip, and Legend can be arranged freely or rendered together."
        >
          <SpecimenGrid>
            <Specimen label="Default" code="16w · commits">
              <HeatCalendar values={VALUES_MAIN} color="var(--color-primary)" />
            </Specimen>

            <Specimen label="Custom unit & span" code="10w · ships">
              <HeatCalendar
                weeks={10}
                unit="ships"
                maxCount={8}
                values={VALUES_SHIPS}
                color="var(--color-primary)"
              />
            </Specimen>

            <Specimen
              label="Composed — grid only"
              code="no legend"
              description="Omit the legend by composing the parts yourself."
            >
              <HeatCalendar
                values={VALUES_COMPOSED}
                color="var(--color-primary)"
              >
                <HeatCalendarGrid>
                  <HeatCalendarTooltip />
                </HeatCalendarGrid>
              </HeatCalendar>
            </Specimen>

            <Specimen
              label="Monochrome"
              code='color="foreground"'
              description="Any CSS color drives the hue; magnitude maps to its strength, never to a second color."
            >
              <HeatCalendar
                values={VALUES_MONO}
                color="var(--color-foreground)"
              />
            </Specimen>
          </SpecimenGrid>
        </Section>

        <Section
          title="Activity Heatmap"
          meta="mono-charts"
          description="A self-contained contributions card with per-tile metrics on hover, across accent and theme variants."
        >
          <SpecimenGrid>
            <Specimen label="Emerald · dark" code='accent="green"' framed>
              <MountGate minH="min-h-[290px]">
                <MonoActivityHeatmap accentColor="green" theme="dark" />
              </MountGate>
            </Specimen>
            <Specimen label="Sky · dark" code='accent="blue"' framed>
              <MountGate minH="min-h-[290px]">
                <MonoActivityHeatmap accentColor="blue" theme="dark" />
              </MountGate>
            </Specimen>
            <Specimen label="Violet · dark" code='accent="purple"' framed>
              <MountGate minH="min-h-[290px]">
                <MonoActivityHeatmap accentColor="purple" theme="dark" />
              </MountGate>
            </Specimen>
            <Specimen label="Monochrome · dark" code='accent="mono"' framed>
              <MountGate minH="min-h-[290px]">
                <MonoActivityHeatmap accentColor="mono" theme="dark" />
              </MountGate>
            </Specimen>
            <Specimen label="Emerald · light" code='theme="light"' framed>
              <MountGate minH="min-h-[290px]">
                <MonoActivityHeatmap accentColor="green" theme="light" />
              </MountGate>
            </Specimen>
            <Specimen label="Compact · dark" code="compact" framed>
              <MountGate minH="min-h-[220px] sm:min-h-[268px]">
                <MonoActivityHeatmap accentColor="blue" theme="dark" compact />
              </MountGate>
            </Specimen>
          </SpecimenGrid>
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

function SpecimenGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
      {children}
    </div>
  );
}

function Specimen({
  label,
  code,
  description,
  framed = false,
  children,
}: {
  label: string;
  code: string;
  description?: string;
  framed?: boolean;
  children: ReactNode;
}) {
  return (
    <figure className="flex flex-col bg-background p-6">
      <figcaption className="mb-6 flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          {code}
        </span>
      </figcaption>
      <div
        className={cn(
          "flex flex-1 items-center justify-center overflow-x-auto",
          framed ? "w-full" : "py-2",
        )}
      >
        {children}
      </div>
      {description ? (
        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </figure>
  );
}

/**
 * Defers rendering to the client. MonoActivityHeatmap seeds its demo data with
 * Math.random(), so server and client markup would differ — gate it behind mount
 * and reserve its height so nothing shifts.
 */
function MountGate({ minH, children }: { minH: string; children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className={cn("w-full", minH)} aria-hidden />;
  return <>{children}</>;
}
