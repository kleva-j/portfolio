import { cn } from "@/lib/utils";

type GridFillerProps = React.ComponentProps<"div"> & {
  totalItems: number;
  /** Applies to all screens; breakpoint props override it. */
  columns?: number;
  smColumns?: number;
  mdColumns?: number;
  lgColumns?: number;
};

function remaining(totalItems: number, count: number) {
  return (count - (totalItems % count)) % count;
}

export function GridFiller({
  totalItems,
  className,
  columns,
  smColumns,
  mdColumns,
  lgColumns,
  ...props
}: GridFillerProps) {
  const actualSmColumns = smColumns ?? columns ?? 2;
  const actualMdColumns = mdColumns ?? actualSmColumns;
  const actualLgColumns = lgColumns ?? actualMdColumns;

  const neededBase = columns ? remaining(totalItems, columns) : 0;
  const neededSm = remaining(totalItems, actualSmColumns);
  const neededMd = remaining(totalItems, actualMdColumns);
  const neededLg = remaining(totalItems, actualLgColumns);

  const maxFillers =
    Math.max(columns ?? 0, actualSmColumns, actualMdColumns, actualLgColumns) -
    1;

  if (maxFillers < 1) {
    return null;
  }

  return (
    <>
      {Array.from({ length: maxFillers }).map((_, i) => {
        let showBase = "hidden";
        if (columns) {
          showBase = i < neededBase ? "block" : "hidden";
        }
        const showSm = i < neededSm ? "sm:block" : "sm:hidden";
        const showMd = i < neededMd ? "md:block" : "md:hidden";
        const showLg = i < neededLg ? "lg:block" : "lg:hidden";

        if (
          showBase === "hidden" &&
          showSm === "sm:hidden" &&
          showMd === "md:hidden" &&
          showLg === "lg:hidden"
        ) {
          return null;
        }

        return (
          <div
            className={cn(
              "pointer-events-none",
              showBase,
              showSm,
              showMd,
              showLg,
              className,
            )}
            key={`filler-${i}`}
            {...props}
          />
        );
      })}
    </>
  );
}
