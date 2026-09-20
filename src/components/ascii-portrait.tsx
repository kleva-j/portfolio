import { Suspense, lazy, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

// AsciiArt pulls in framer-motion and runs canvas image processing, so load it
// as its own chunk. The portrait is only shown from the `sm` breakpoint up (see
// index.tsx); gating the mount on a min-width query keeps that code — and its
// main-thread work — off mobile and out of the initial bundle.
const AsciiArt = lazy(() =>
  import("@/components/ui/ascii-art").then((m) => ({ default: m.AsciiArt })),
);

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const onChange = () => setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export function AsciiPortrait({ className }: { className?: string }) {
  const showAscii = useMediaQuery("(min-width: 640px)");

  return (
    <div
      className={cn(
        "relative grid aspect-square w-36 shrink-0 select-none *:[grid-area:1/1] sm:w-48",
        className,
      )}
    >
      {/* Actual photo — layered beneath the ASCII, revealed only in dark mode */}
      <img
        src="/images/michael.jpg"
        alt=""
        aria-hidden="true"
        className="z-0 size-full object-cover opacity-0 grayscale dark:opacity-100"
      />
      {/* ASCII interpretation — layered on top via z-index */}
      {showAscii && (
        <Suspense fallback={null}>
          <AsciiArt
            src="/images/michael.jpg"
            resolution={80}
            color="var(--color-foreground)"
            backgroundColor="transparent"
            animationStyle="fade"
            animationDuration={1.2}
            animateOnView={false}
            className="pointer-events-none z-10 size-full"
          />
        </Suspense>
      )}
    </div>
  );
}
