import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FullWidthDivider } from "@/components/full-width-divider";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div>
      <Header />
      <FullWidthDivider />
      <div className="mx-auto flex min-h-svh max-w-4xl border-x p-6">
        <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
          <div>
            <h1 className="font-medium">Project ready!</h1>
            <p>You may now add components and start building.</p>
            <p>We&apos;ve already added the button component for you.</p>
            <Button className="mt-2">Button</Button>
          </div>
        </div>
      </div>
      <FullWidthDivider />
      <Footer />
    </div>
  );
}
