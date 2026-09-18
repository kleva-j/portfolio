import { EnvelopeSimpleIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import { FullWidthDivider } from "@/components/full-width-divider";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Header, contactHref } from "@/components/header";
import { FeatureCard } from "@/components/feature-card";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";

// TODO: confirm the PairSync repository URL.
const projectHref = "https://github.com/kleva-j/pairsync";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Michael Obasi" },
      {
        name: "description",
        content: "Michael Obasi — software engineer.",
      },
    ],
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
        <section className="px-6 py-8 sm:py-14">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Software Engineer
          </p>
          <h1 className="mt-5 font-heading text-4xl leading-[1.1] font-medium tracking-tight text-balance sm:text-5xl">
            Hey, I'm Michael.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty">
            Hi 👋🏻, I'm currently building{" "}
            <a
              href={projectHref}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              PairSync
            </a>{" "}
            — an open-source, cross-platform, peer-to-peer file and clipboard
            sharing tool. I work across product engineering, software
            architecture, and mobile development.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button render={<a href={contactHref} />} nativeButton={false}>
              <EnvelopeSimpleIcon /> Get in touch
            </Button>
            <Button
              variant="outline"
              render={<Link to="/design-arena" />}
              nativeButton={false}
            >
              See the design arena <ArrowUpRightIcon />
            </Button>
          </div>
        </section>

        <section className="space-y-1">
          <FeatureCard
            title="Spotlight"
            description="Recent shipped work, personal tools, and open-source activity."
          />
          <div className="h-1 w-full bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)] opacity-50" />
          <FeatureCard
            title="Career"
            description="6+ years of experience across product engineering, architecture, and mobile."
          />
          <div className="h-1 w-full bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)] opacity-50" />
          <FeatureCard
            title="Selected Project"
            description="PairSync — cross-platform P2P file sync. Open source, written in Tauri & React-Native."
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
