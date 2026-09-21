// beui.dev/charts/heat-calendar
import type { HeatCalendarProps } from "./heat-calendar/types";

import { cn } from "@/lib/utils";

import { HeatCalendarTooltip } from "./heat-calendar/tooltip";
import { HeatCalendarLegend } from "./heat-calendar/legend";
import { HeatCalendarGrid } from "./heat-calendar/grid";

import {
  useHeatCalendarModel,
  HeatCalendarContext,
} from "./heat-calendar/context";

/** Compose Grid, Tooltip and Legend, or omit children for the complete chart. */
export function HeatCalendar({
  children,
  className,
  ...props
}: HeatCalendarProps) {
  const model = useHeatCalendarModel(props);
  return (
    <HeatCalendarContext.Provider value={model}>
      <div className={cn("w-fit max-w-full", className)}>
        {children === undefined ? (
          <>
            <HeatCalendarGrid>
              <HeatCalendarTooltip />
            </HeatCalendarGrid>
            <HeatCalendarLegend />
          </>
        ) : (
          children
        )}
      </div>
    </HeatCalendarContext.Provider>
  );
}

export { useHeatCalendar } from "./heat-calendar/context";
export { HeatCalendarGrid } from "./heat-calendar/grid";
export { HeatCalendarLegend } from "./heat-calendar/legend";
export { HeatCalendarTooltip } from "./heat-calendar/tooltip";
export type {
  HeatCalendarCell,
  HeatCalendarProps,
  HeatCalendarSelection,
} from "./heat-calendar/types";
