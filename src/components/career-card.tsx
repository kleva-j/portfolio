import { CaretUpDownIcon } from "@phosphor-icons/react";
import { useState } from "react";

import {
  CollapsibleContent,
  CollapsibleTrigger,
  Collapsible,
} from "@/components/ui/collapsible";

import { CareerTimeline } from "./career-timeline";
import { FeatureCard } from "./feature-card";

export const CareerCard = () => {
  const [open, setOpen] = useState(false);

  return (
    <FeatureCard
      children={
        <Collapsible open={open} onOpenChange={setOpen} className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="relative z-10 space-y-2">
              <h3 className="text-lg/[1.1] font-medium text-foreground">
                Career
              </h3>

              <p className="text-xs leading-relaxed text-muted-foreground">
                6+ years of experience across product engineering, architecture,
                and mobile.
              </p>
            </div>
            <CollapsibleTrigger>
              <CaretUpDownIcon />
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="border-t pt-6">
            <CareerTimeline />
          </CollapsibleContent>
        </Collapsible>
      }
    />
  );
};
