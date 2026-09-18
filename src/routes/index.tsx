import { FullWidthDivider } from "@/components/full-width-divider";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Header, contactHref } from "@/components/header";
import { FeatureCard } from "@/components/feature-card";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "Michael Obasi" }, { name: "description", content: "" }],
  }),
  component: App,
});

function App() {
  return (
    <div>
      <Header />
      <main
        id="main-content"
        className="mx-auto min-h-[calc(100svh-var(--header-height)-var(--footer-height))] max-w-3xl py-6"
      >
        <section className="px-6 sm:py-14">
          <p className="text-sm text-muted-foreground">Software Engineer</p>
          <h1 className="mt-4 font-heading text-4xl font-medium tracking-tight sm:text-4xl">
            Hey, I'm Michael.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Hi 👋🏻, I'm currently building PairSync, PairSync is an open-source,
            cross-platform, peer-to-peer (P2P) file and clipboard sharing
            solution. I work across product engineering, software architecture
            and mobile development.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button render={<a href={contactHref} />} nativeButton={false}>
              Get in touch
            </Button>
            <Button
              variant="outline"
              render={<Link to="/design-arena" />}
              nativeButton={false}
            >
              See the design arena
            </Button>
          </div>
        </section>

        <section className="space-y-1">
          <FeatureCard
            title="Spotlight"
            description="Recent shipped work, personal tools, and open source activity."
          />
          <div className="h-1 w-full bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)] opacity-50" />
          <FeatureCard
            title="Career"
            description="Overall I have 6+ years of experience in software development."
          />
          <div className="h-1 w-full bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)] opacity-50" />
          <FeatureCard
            title="Selected Project"
            description="Visualize your data with drag-and-drop widgets."
          />
          <div className="h-1 w-full bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)] opacity-50" />
          <FeatureCard
            title="Writing"
            description="Recent articles, essays, and technical writing."
          />
        </section>
      </main>

      <FullWidthDivider />
      <Footer />
    </div>
  );
}
