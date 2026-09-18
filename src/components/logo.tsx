import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function Logo({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "font-heading text-base font-medium tracking-tight text-foreground",
        className,
      )}
      {...props}
    >
      Michael Obasi
    </span>
  );
}
