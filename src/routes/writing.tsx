import { createFileRoute, Outlet } from "@tanstack/react-router";

import { FullWidthDivider } from "@/components/full-width-divider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const Route = createFileRoute("/writing")({
  component: WritingLayout,
});

function WritingLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <FullWidthDivider />
      <Footer />
    </div>
  );
}
