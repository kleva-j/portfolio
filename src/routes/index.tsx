import { FullWidthDivider } from "@/components/full-width-divider";
import { AsciiPortrait } from "@/components/ascii-portrait";
import { createFileRoute } from "@tanstack/react-router";
import { FeatureCard } from "@/components/feature-card";
import { CareerCard } from "@/components/career-card";
import { Separator } from "@/components/ui/separator";
import { DecorIcon } from "@/components/decor-icon";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site.config";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  EnvelopeSimpleIcon,
  LinkedinLogoIcon,
  GithubLogoIcon,
} from "@phosphor-icons/react";

const meta = [
  { title: siteConfig.title },
  { name: "description", content: siteConfig.description },
];

export const Route = createFileRoute("/")({
  head: () => ({ meta }),
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
        <section className="lg-:px-0 px-4 py-8 sm:py-14">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                Software Engineer
              </p>
              <h1 className="mt-5 font-heading text-4xl leading-[1.1] font-medium tracking-tight text-balance sm:text-5xl">
                Hey, I'm Michael.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-pretty">
                Hi 👋🏻, I'm currently building{" "}
                <a
                  href={siteConfig.externalLinks.project}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  PairSync
                </a>{" "}
                — an open-source, cross-platform, peer-to-peer file and
                clipboard sharing tool. I work across product engineering,
                software architecture, and mobile development.
              </p>
              <div className="mt-4 flex items-center">
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-md"
                  render={<a aria-label="Email" href={siteConfig.mailto} />}
                  nativeButton={false}
                >
                  <EnvelopeSimpleIcon weight="bold" />
                </Button>

                <Separator orientation="vertical" className="my-auto h-6" />
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-md"
                  render={
                    <a
                      aria-label="GitHub"
                      href={siteConfig.externalLinks.github}
                    />
                  }
                  nativeButton={false}
                >
                  <GithubLogoIcon weight="bold" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-md"
                  render={
                    <a
                      aria-label="LinkedIn"
                      href={siteConfig.externalLinks.linkedin}
                    />
                  }
                  nativeButton={false}
                >
                  <LinkedinLogoIcon weight="bold" />
                </Button>
              </div>
            </div>

            <div className="relative p-0.5">
              <div className="absolute -inset-y-4 -inset-s-px w-px bg-border" />
              <div className="absolute -inset-y-4 -inset-e-px w-px bg-border" />
              <div className="absolute -inset-x-4 -top-px h-px bg-border" />
              <div className="absolute -inset-s-4 -inset-e-4 -bottom-px h-px bg-border" />
              <DecorIcon
                className="size-3.5 stroke-primary"
                position="top-left"
              />
              <DecorIcon
                className="size-3.5 stroke-primary"
                position="bottom-left"
              />
              <DecorIcon
                className="size-3.5 stroke-primary"
                position="bottom-right"
              />
              <DecorIcon
                className="size-3.5 stroke-primary"
                position="top-right"
              />
              <AsciiPortrait className="rounded" />
            </div>
          </div>
        </section>

        <section className="space-y-1">
          <FeatureCard
            title="Arena"
            description="Recent shipped work, personal tools, and open-source activity."
          />
          <div className="h-8 w-full bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)] opacity-50" />
          <CareerCard />
          <div className="h-8 w-full bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)] opacity-50" />
          <FeatureCard
            title="Selected Project"
            description="PairSync — cross-platform P2P file sync. Open source, written in Tauri & React-Native."
          />
          <div className="h-8 w-full bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)] opacity-50" />
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
