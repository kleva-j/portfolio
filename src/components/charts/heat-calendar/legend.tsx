import { cn } from "@/lib/utils";

import { useHeatCalendar } from "./context";
import { fmtRange, STEPS } from "./utils";

export function HeatCalendarLegend({ className }: { className?: string }) {
  const {
    start,
    end,
    step,
    pinnedStep,
    setHoverStep,
    setPinnedStep,
    fill,
    canHover,
    reduce,
  } = useHeatCalendar();
  return (
    <div
      className={cn(
        "mt-3 flex flex-wrap items-center justify-between gap-3",
        className,
      )}
    >
      <span className="text-xs text-muted-foreground">
        {start && end
          ? `${fmtRange.format(start)} – ${fmtRange.format(end)}`
          : "\u00a0"}
      </span>
      {/* hovering a step previews only cells of that level; a click pins the filter so it holds after the pointer leaves */}
      <span
        className="flex items-center gap-1"
        onPointerLeave={() => setHoverStep(null)}
      >
        <span className="me-0.5 text-xs text-muted-foreground">less</span>
        {STEPS.map((s, i) => (
          <button
            type="button"
            aria-label={`Show activity level ${i}`}
            aria-pressed={pinnedStep === i}
            key={s}
            onPointerEnter={() => {
              if (canHover) setHoverStep(i);
            }}
            onFocus={() => setHoverStep(i)}
            onBlur={() => setHoverStep(null)}
            onClick={() => setPinnedStep(pinnedStep === i ? null : i)}
            className="size-3 rounded-[3px] transition-transform duration-150"
            style={{
              background: fill(i),
              transform: !reduce && step === i ? "scale(1.25)" : undefined,
            }}
          />
        ))}
        <span className="ms-0.5 text-xs text-muted-foreground">more</span>
      </span>
    </div>
  );
}
