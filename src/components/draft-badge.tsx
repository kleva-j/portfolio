import { cn } from "@/lib/utils";

// Inline status marker for list/card meta rows. Borderless so it sits flush with
// the surrounding uppercase metadata; a single copper dot carries the signal.
export function DraftTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium text-muted-foreground",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1 rounded-full bg-primary" />
      Draft
    </span>
  );
}

// Prominent callout for the article page — a copper left rule rather than a box,
// in keeping with the editorial, hairline design language.
export function DraftNotice({ className }: { className?: string }) {
  return (
    <div
      role="note"
      className={cn(
        "border-l-2 border-primary bg-muted/30 px-4 py-3",
        className,
      )}
    >
      <p className="text-xs font-medium tracking-[0.14em] text-primary uppercase">
        Draft
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        This piece is placeholder content — not yet written or published. The
        wording below is a work in progress.
      </p>
    </div>
  );
}
