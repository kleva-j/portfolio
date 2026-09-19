import { CaretUpDownIcon } from "@phosphor-icons/react";

import {
  CollapsibleContent,
  CollapsibleTrigger,
  Collapsible,
} from "@/components/ui/collapsible";

import { FeatureCard } from "./feature-card";

type CollapsibleCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  contentClassName?: string;
  defaultOpen?: boolean;
};

export function CollapsibleCard({
  title,
  description,
  children,
  contentClassName,
  defaultOpen,
}: CollapsibleCardProps) {
  return (
    <FeatureCard className="p-0">
      <Collapsible defaultOpen={defaultOpen}>
        <div className="flex items-center justify-between gap-2 p-6">
          <div className="relative z-10 space-y-2">
            <h3 className="text-lg/[1.1] font-medium text-foreground">
              {title}
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
          <CollapsibleTrigger
            aria-label={`Toggle ${title.toLowerCase()}`}
            className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <CaretUpDownIcon className="size-4" />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className={contentClassName}>
          {children}
        </CollapsibleContent>
      </Collapsible>
    </FeatureCard>
  );
}
