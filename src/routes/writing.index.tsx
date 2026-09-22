import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRightIcon } from "@phosphor-icons/react";

import { FullWidthDivider } from "@/components/full-width-divider";
import { DraftTag } from "@/components/draft-badge";
import { getPosts } from "@/content/writing/posts";
import { siteConfig } from "@/lib/site.config";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const pageTitle = "Writing — Michael Obasi";
const pageDescription =
  "Essays and technical writing on engineering decisions, design, and the tools behind PairSync.";

export const Route = createFileRoute("/writing/")({
  loader: async () => await getPosts(),
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDescription },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDescription },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: pageDescription },
    ],
  }),
  component: WritingIndex,
});

function WritingIndex() {
  const articles = Route.useLoaderData();

  return (
    <div>
      <Header />
      <main
        id="main-content"
        className="mx-auto min-h-[calc(100svh-var(--header-height)-var(--footer-height))] max-w-3xl px-6 py-6"
      >
        <section className="py-8 sm:py-14">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Writing
          </p>
          <h1 className="mt-5 font-heading text-3xl leading-[1.1] font-medium tracking-tight text-balance sm:text-4xl">
            Notes on building, deciding, and shipping.
          </h1>
          <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
            Occasional long-form on the engineering and design choices behind my
            work — mostly {siteConfig.name.split(" ")[0]}'s corner of the stack.
          </p>

          <ul className="mt-12 border-t border-border">
            {articles.map((article) => (
              <li key={article.slug}>
                <Link
                  to="/writing/$slug"
                  params={{ slug: article.slug }}
                  className="group flex flex-col gap-2 border-b border-border py-7 transition-colors hover:bg-accent/30 focus-visible:bg-accent/30 focus-visible:outline-none sm:flex-row sm:gap-8"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase sm:w-36 sm:shrink-0 sm:flex-col sm:items-start sm:justify-between sm:gap-4">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:flex-col sm:items-start sm:gap-1.5">
                      <span className="text-primary/80">
                        {article.category}
                      </span>
                      <time
                        dateTime={article.dateTime}
                        className="font-mono tracking-normal tabular-nums"
                      >
                        {article.date}
                      </time>
                    </div>
                    {article.draft ? <DraftTag /> : null}
                  </div>
                  <div className="min-w-0">
                    <h2 className="flex items-start gap-1.5 text-lg leading-snug font-medium text-foreground">
                      <span className="transition-colors group-hover:text-primary">
                        {article.title}
                      </span>
                      <ArrowUpRightIcon
                        weight="bold"
                        className="mt-1 size-3.5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary motion-reduce:transition-none"
                      />
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {article.description}
                    </p>
                    <span className="mt-3 inline-block font-mono text-[11px] tracking-normal text-muted-foreground/80 tabular-nums">
                      {article.readingTime}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <FullWidthDivider />
      <Footer />
    </div>
  );
}
