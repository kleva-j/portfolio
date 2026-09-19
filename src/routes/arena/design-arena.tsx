import { createFileRoute } from "@tanstack/react-router";
import { Scene } from "@/components/Scene";

export const Route = createFileRoute("/arena/design-arena")({
  component: Scene,
});
