import { DecorIcon } from "@/components/decor-icon";
import { cn } from "@/lib/utils";

type FeatureCardProps = React.ComponentProps<"div"> & {
  title?: string;
  description?: string;
};

export function FeatureCard({
  title,
  description,
  className,
  children,
  ...props
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between gap-6 bg-background px-6 pt-8 pb-6 shadow-xs",
        // Gradient inspired by testimonials
        className,
      )}
      {...props}
    >
      {/* Extended Borders */}
      <div className="absolute -inset-y-4 -inset-s-px w-px bg-border" />
      <div className="absolute -inset-y-4 -inset-e-px w-px bg-border" />
      <div className="absolute -inset-x-4 -top-px h-px bg-border" />
      <div className="absolute -inset-s-4 -inset-e-4 -bottom-px h-px bg-border" />

      {/* Corner Decor */}
      <DecorIcon className="size-3.5" position="top-left" />
      <DecorIcon className="size-3.5" position="bottom-left" />
      <DecorIcon className="size-3.5" position="bottom-right" />
      <DecorIcon className="size-3.5" position="top-right" />

      {(title || description) && (
        <div className="relative z-10 space-y-2">
          {title ? (
            <h3 className="text-lg/[1.1] font-medium text-foreground">
              {title}
            </h3>
          ) : null}
          {description ? (
            <p className="text-xs leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
      )}
      {children}
    </div>
  );
}
