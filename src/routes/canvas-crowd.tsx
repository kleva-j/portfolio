import { CrowdCanvas } from "@/components/ui/skiper-ui/crowd-canvas";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/canvas-crowd")({
  component: RouteComponent,
});

function RouteComponent() {
    return (
      <div className="relative h-svh w-full overflow-hidden bg-white text-black">
        <div className="absolute inset-s-1/2 top-22 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-black">
          <span className="relative max-w-[12ch] text-xs leading-tight uppercase opacity-40 after:absolute after:start-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']">
            Croud Canvas
          </span>
        </div>
        <div className="absolute bottom-0 h-full w-screen">
          <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} />
        </div>
      </div>
    );
}
