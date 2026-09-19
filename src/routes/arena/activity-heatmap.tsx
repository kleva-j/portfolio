import { MonoActivityHeatmap } from "@/components/ui/mono-activity-heatmap";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/arena/activity-heatmap")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-[#0a0a0a] text-white">
      <div className="absolute inset-s-1/2 top-22 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center">
        <span className="relative max-w-[16ch] text-xs leading-tight uppercase opacity-40 after:absolute after:start-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-transparent after:content-['']">
          Activity Heatmap
        </span>
      </div>
      <div className="w-full max-w-md px-4">
        <MonoActivityHeatmap accentColor="blue" theme="dark" />
      </div>
    </div>
  );
}
