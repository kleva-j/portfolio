import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { XIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site.config";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "construction-banner-dismissed";

const phrases = [
  "work in progress",
  "wet paint",
  "shipping in public",
  "pardon the dust",
];

const ROTATE_MS = 3200;

// localStorage/DOM measurement must run before paint on the client to avoid a
// flash, but useLayoutEffect warns during SSR — fall back to useEffect there.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function RotatingStatus() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % phrases.length),
      ROTATE_MS,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <span
      aria-hidden="true"
      key={index}
      className="truncate text-muted-foreground motion-safe:animate-in motion-safe:duration-700 motion-safe:fade-in"
    >
      {phrases[index]}
    </span>
  );
}

export function ConstructionBanner() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(true);
  const animate = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "1") {
      // Collapse before first paint, without a transition.
      setOpen(false);
    }
    // Enable the transition only after the initial state is settled, so a
    // restored-dismissed state doesn't animate on load — only user dismissal does.
    const id = requestAnimationFrame(() => {
      animate.current = true;
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // The immersive arena routes render their own full-screen frame.
  if (pathname.startsWith("/arena")) return null;

  const dismiss = () => {
    animate.current = true;
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  return (
    <div
      className={cn(
        "grid grid-rows-[1fr]",
        animate.current &&
          "transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
        !open && "grid-rows-[0fr] opacity-0",
      )}
      inert={!open || undefined}
    >
      <div className="overflow-hidden">
        <aside
          aria-label="Site status"
          className="border-b border-border bg-background"
        >
          <div className="mx-auto flex h-9 max-w-4xl items-center gap-3 px-4">
            <span
              aria-hidden="true"
              className="h-3.5 w-7 shrink-0 bg-[repeating-linear-gradient(-45deg,var(--color-primary)_0_2px,transparent_2px_6px)] opacity-70"
            />

            <p className="flex min-w-0 items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] whitespace-nowrap uppercase">
              <span
                aria-hidden="true"
                className="relative flex size-1.5 shrink-0"
              >
                <span className="absolute inline-flex size-full rounded-full bg-primary/60 motion-safe:animate-ping" />
                <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
              </span>
              <span className="shrink-0 text-foreground">
                Under construction
              </span>
              <span aria-hidden="true" className="shrink-0 text-border">
                /
              </span>
              <RotatingStatus />
            </p>

            <div className="ml-auto flex shrink-0 items-center gap-1">
              <a
                href={siteConfig.externalLinks.github}
                target="_blank"
                rel="noreferrer"
                className="hidden font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase underline-offset-4 transition-colors hover:text-primary hover:underline sm:inline"
              >
                Follow along
              </a>
              <Button
                aria-label="Dismiss construction notice"
                onClick={dismiss}
                size="icon-xs"
                variant="ghost"
              >
                <XIcon weight="bold" />
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
