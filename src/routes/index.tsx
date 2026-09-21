import { FullWidthDivider } from "@/components/full-width-divider";
import { AsciiPortrait } from "@/components/ascii-portrait";
import { createFileRoute } from "@tanstack/react-router";
import { CareerCard } from "@/components/career-card";
import { DecorIcon } from "@/components/decor-icon";
import { Projects } from "@/components/projects";
import { Writings } from "@/components/writings";
import { getPosts } from "@/content/writing/posts";
import { siteConfig } from "@/lib/site.config";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Arena } from "@/components/arena";
import {
  EnvelopeSimpleIcon,
  LinkedinLogoIcon,
  GithubLogoIcon,
} from "@phosphor-icons/react";

const meta = [
  { title: siteConfig.title },
  { name: "description", content: siteConfig.description },
];

const heroLinks = [
  {
    label: "GitHub",
    href: siteConfig.externalLinks.github,
    icon: GithubLogoIcon,
  },
  {
    label: "LinkedIn",
    href: siteConfig.externalLinks.linkedin,
    icon: LinkedinLogoIcon,
  },
  { label: "Email", href: siteConfig.mailto, icon: EnvelopeSimpleIcon },
] as const;

export const Route = createFileRoute("/")({
  head: () => ({ meta }),
  loader: async () => ({ posts: await getPosts() }),
  component: App,
});

function App() {
  const { posts } = Route.useLoaderData();

  return (
    <div>
      <Header />
      <main
        id="main-content"
        className="lg-:px-0 mx-auto min-h-[calc(100svh-var(--header-height)-var(--footer-height))] max-w-3xl px-4 py-6"
      >
        <section className="py-8 sm:py-14">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                Software engineer · Lagos, Nigeria
              </p>
              <h1 className="mt-5 font-heading tracking-tight text-balance">
                <span className="block text-4xl leading-[1.05] font-medium text-foreground sm:text-5xl">
                  Michael Obasi.
                </span>
                <span className="mt-3 block text-2xl leading-snug font-normal text-foreground/70 sm:text-3xl">
                  I sweat the small things so the product doesn't.
                </span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-pretty">
                I'm currently building{" "}
                <a
                  href={siteConfig.externalLinks.project}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  PairSync
                </a>{" "}
                — an open-source, peer-to-peer file and clipboard sharing
                tool. I work across frontend, full-stack, and mobile,
                opinionated about the small things, because that's where good
                products live.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                {heroLinks.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="group inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                    {...(href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <Icon
                      weight="bold"
                      className="size-4 text-muted-foreground/70 transition-colors group-hover:text-primary"
                    />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="relative hidden p-0.5 sm:block">
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
          <Projects />
          <div className="h-8 w-full bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)] opacity-50" />
          <Arena />
          <div className="h-8 w-full bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)] opacity-50" />
          <CareerCard />
          <div className="h-8 w-full bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)] opacity-50" />
          <Writings posts={posts} />
        </section>
      </main>
      <FullWidthDivider />
      <Footer />
    </div>
  );
}
