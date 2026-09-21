import { CollapsibleCard } from "@/components/collapsible-card";

import { CareerTimeline } from "./career-timeline";

export const CareerCard = () => {
  return (
    <CollapsibleCard
      title="Career"
      description="6+ years across frontend, full-stack, and product engineering — from Angular CRMs to React apps and peer-to-peer tooling."
      contentClassName="border-t p-6"
    >
      <CareerTimeline />
    </CollapsibleCard>
  );
};
