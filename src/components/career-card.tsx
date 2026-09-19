import { CollapsibleCard } from "@/components/collapsible-card";

import { CareerTimeline } from "./career-timeline";

export const CareerCard = () => {
  return (
    <CollapsibleCard
      title="Career"
      description="6+ years of experience across product engineering, architecture, and mobile."
      contentClassName="border-t p-6"
    >
      <CareerTimeline />
    </CollapsibleCard>
  );
};
