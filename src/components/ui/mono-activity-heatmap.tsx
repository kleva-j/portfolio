/**
 * MonoActivityHeatmap — GitHub-style contributions heatmap.
 *
 * Source: Amicro (Micro-transitions) by Subhan
 * https://github.com/Subhan-code/Amicro--Micro-transitions-/blob/main/src/components/mono-charts/MonoActivityHeatmap.tsx
 *
 * Vendored as-is; only the `cn` import path was adjusted to this project's
 * alias and unused imports were removed.
 */
import { useState, useMemo } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type Contribution = {
  date: string;
  count: number;
  level: ContributionLevel;
};

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface MonoActivityHeatmapProps {
  theme?: "dark" | "light";
  accentColor?: "green" | "blue" | "purple" | "mono";
  compact?: boolean;
}

function generateDemoContributions(weeks: number): Contribution[] {
  const today = new Date();
  return Array.from({ length: weeks * 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (weeks * 7 - 1 - i));

    const rand = Math.random();
    let level: ContributionLevel = 0;
    let count = 0;

    if (rand > 0.35) {
      level = Math.floor(Math.random() * 4 + 1) as ContributionLevel;
      count = level * 3 + Math.floor(Math.random() * 4);
    }

    return {
      date: date.toISOString().slice(0, 10),
      count,
      level,
    };
  });
}

function toWeeks(contributions: Contribution[]) {
  const weeks: Contribution[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }
  return weeks;
}

export function MonoActivityHeatmap({
  theme = "dark",
  accentColor = "green",
  compact = false,
}: MonoActivityHeatmapProps) {
  const isDark = theme === "dark";
  const [hoveredDay, setHoveredDay] = useState<Contribution | null>(null);

  const demoData = useMemo(() => generateDemoContributions(20), []);
  const weeks = useMemo(() => toWeeks(demoData), [demoData]);

  const totalContributions = useMemo(
    () => demoData.reduce((sum, d) => sum + d.count, 0),
    [demoData],
  );

  // Color config according to accentColor prop
  const colorScale = useMemo(() => {
    switch (accentColor) {
      case "green":
        return {
          bg: "#39d353",
          badgeClass:
            "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
          badgeText: "Emerald Matrix",
        };
      case "blue":
        return {
          bg: "#3b82f6",
          badgeClass: "bg-blue-500/20 text-blue-400 border-blue-500/30",
          badgeText: "Sky Blue Grid",
        };
      case "purple":
        return {
          bg: "#a855f7",
          badgeClass: "bg-purple-500/20 text-purple-400 border-purple-500/30",
          badgeText: "Violet Pulse",
        };
      case "mono":
      default:
        return {
          bg: isDark ? "#FFFFFF" : "#09090B",
          badgeClass: "bg-white/10 text-white border-white/20",
          badgeText: "Monochrome Heat",
        };
    }
  }, [accentColor, isDark]);

  const opacityForLevel = (lvl: ContributionLevel) => {
    switch (lvl) {
      case 0:
        return isDark ? 0.06 : 0.08;
      case 1:
        return 0.3;
      case 2:
        return 0.55;
      case 3:
        return 0.8;
      case 4:
        return 1;
    }
  };

  return (
    <div
      className={cn(
        "group relative flex w-full flex-col justify-between overflow-hidden rounded-[24px] p-4 font-sans transition-all duration-300 sm:p-5",
        compact ? "h-[220px] sm:h-[268px]" : "min-h-[290px]",
        isDark
          ? "bg-[#181818] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:bg-[#202020]"
          : "border border-neutral-100 bg-white text-black shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)]",
      )}
    >
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold tracking-wider uppercase ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
            >
              Activity Heatmap
            </span>
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-1.5 py-0.5 font-mono text-[10px]",
                colorScale.badgeClass,
              )}
            >
              {colorScale.badgeText}
            </span>
          </div>
          <div className="mt-0.5 font-sans text-xl font-bold tracking-tight tabular-nums">
            {totalContributions}{" "}
            <span className="text-xs font-normal opacity-70">
              contributions
            </span>
          </div>
        </div>
      </div>

      {/* Main Heatmap Stage Grid (No list drawer animation!) */}
      <div
        className={cn(
          "relative flex w-full flex-1 flex-col items-center justify-center overflow-hidden rounded-[14px] p-3 transition-colors duration-300",
          isDark ? "bg-[#131313]" : "bg-[#f4f4f6]",
        )}
      >
        {/* Month Headers */}
        <div className="mb-2 flex w-[277px] max-w-full items-center justify-between px-1">
          {MONTH_NAMES.slice(0, 5).map((m, idx) => (
            <span
              key={idx}
              className={`flex-1 text-center font-mono text-[10px] ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
            >
              {m}
            </span>
          ))}
        </div>

        {/* 20-Week Heatmap Grid with Strict Square Cells */}
        <div
          className="flex w-auto max-w-full items-center justify-center gap-[3px] overflow-x-auto py-1"
          onPointerLeave={() => setHoveredDay(null)}
        >
          {weeks.map((week, wIdx) => (
            <div
              key={wIdx}
              className="flex shrink-0 flex-col items-center gap-[3px]"
            >
              {week.map((day, dIdx) => (
                <motion.div
                  key={`${wIdx}-${dIdx}`}
                  onPointerEnter={() => setHoveredDay(day)}
                  onPointerDown={() => setHoveredDay(day)}
                  className="h-[10px] max-h-[10px] w-[10px] max-w-[10px] cursor-pointer rounded-[2px] transition-all sm:h-[11px] sm:max-h-[11px] sm:w-[11px] sm:max-w-[11px]"
                  style={{
                    backgroundColor: colorScale.bg,
                    opacity: opacityForLevel(day.level),
                  }}
                  whileHover={{ scale: 1.35, zIndex: 10 }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Active Cell Tooltip Callout */}
        <div className="mt-2 flex h-5 items-center justify-center">
          {hoveredDay ? (
            <span
              className={`font-mono text-[10px] ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
            >
              {hoveredDay.count} {hoveredDay.count === 1 ? "item" : "items"} on{" "}
              {hoveredDay.date}
            </span>
          ) : (
            <span
              className={`font-mono text-[10px] ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
            >
              Hover tiles for metrics
            </span>
          )}
        </div>
      </div>

      {/* Footer Details */}
      <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-1 font-mono text-[11px]">
        <span className={isDark ? "text-neutral-400" : "text-neutral-600"}>
          20 Weeks x 7 Days Grid
        </span>
        <span
          className={isDark ? "font-medium text-white" : "font-medium text-black"}
        >
          Subhan Activity
        </span>
      </div>
    </div>
  );
}
