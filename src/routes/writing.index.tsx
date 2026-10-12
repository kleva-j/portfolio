import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRightIcon } from "@phosphor-icons/react";

import { getPosts } from "@/content/writing/posts-collections";
import { absoluteUrl } from "@/lib/site.config";

const pageTitle = "Writing — Michael Obasi";
const pageDescription =
  "Essays and technical writing on engineering decisions, design, and the tools behind PairSync.";

export const Route = createFileRoute("/writing/")({
  loader: () => getPosts(),
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDescription },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDescription },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: pageDescription },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/writing") }],
  }),
  component: WritingIndex,
});

function WritingIndex() {
  const posts = Route.useLoaderData();
  const latestPost = posts.at(0);
  const otherPosts = posts.slice(1);

  return (
    <main
      id="main-content"
      className="mx-auto min-h-[calc(100svh-var(--header-height)-var(--footer-height))] max-w-5xl px-6 py-6"
    >
      <section className="py-8 sm:py-14">
        <header className="border-b border-border pb-10 sm:pb-12">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
              Writing / Field notes
            </p>
            <div className="flex items-center gap-4">
              <p className="font-mono text-[11px] text-muted-foreground tabular-nums">
                {String(posts.length).padStart(2, "0")} published
              </p>
              <a
                href="/rss.xml"
                className="text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:text-primary"
              >
                RSS
              </a>
            </div>
          </div>
          <h1 className="mt-7 max-w-3xl font-heading text-4xl leading-[1.04] font-medium tracking-[-0.045em] text-balance sm:text-6xl">
            Notes from the work.
          </h1>
          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
            Long-form thinking on engineering, product decisions, and the
            systems behind what I build.
          </p>
        </header>

        {latestPost ? (
          <section
            aria-labelledby="latest-writing"
            className="border-b border-border py-8 sm:py-10"
          >
            <p className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
              Latest writing
            </p>
            <Link
              to="/writing/$slug"
              params={{ slug: latestPost.slug }}
              className="group mt-5 grid gap-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:grid-cols-[minmax(0,1fr)_10rem] sm:gap-10"
            >
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                  <span className="text-primary">{latestPost.category}</span>
                  <span aria-hidden="true" className="size-1 bg-border" />
                  <time
                    dateTime={latestPost.dateTime}
                    className="font-mono tracking-normal tabular-nums"
                  >
                    {latestPost.date}
                  </time>
                </div>
                <h2
                  id="latest-writing"
                  className="mt-4 max-w-3xl font-heading text-3xl leading-[1.08] font-medium tracking-[-0.035em] text-balance text-foreground transition-colors group-hover:text-primary sm:text-5xl"
                >
                  {latestPost.title}
                </h2>
                <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {latestPost.description}
                </p>
              </div>
              <div className="flex items-end justify-between border-t border-border pt-3 text-xs text-muted-foreground sm:flex-col sm:items-end sm:justify-between sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5">
                <span className="font-mono tabular-nums">
                  {latestPost.readingTime}
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium text-foreground transition-colors group-hover:text-primary">
                  Read article
                  <ArrowUpRightIcon
                    weight="bold"
                    className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                  />
                </span>
              </div>
            </Link>
          </section>
        ) : (
          <p className="border-b border-border py-10 text-sm text-muted-foreground">
            New writing is on its way.
          </p>
        )}

        {otherPosts.length > 0 ? (
          <section aria-labelledby="more-writing" className="pt-8 sm:pt-10">
            <h2
              id="more-writing"
              className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase"
            >
              More writing
            </h2>
            <ul className="mt-5 border-t border-border">
              {otherPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    to="/writing/$slug"
                    params={{ slug: post.slug }}
                    className="group -mx-3 flex flex-col gap-3 border-b border-border px-3 py-6 transition-colors hover:bg-accent/30 focus-visible:bg-accent/30 sm:flex-row sm:items-start sm:gap-8"
                  >
                    <div className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase sm:w-36 sm:flex-col sm:items-start sm:gap-1.5">
                      <span className="text-primary">{post.category}</span>
                      <time
                        dateTime={post.dateTime}
                        className="font-mono tracking-normal tabular-nums"
                      >
                        {post.date}
                      </time>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="flex items-start gap-1.5 text-lg leading-snug font-medium text-foreground">
                        <span className="transition-colors group-hover:text-primary">
                          {post.title}
                        </span>
                        <ArrowUpRightIcon
                          weight="bold"
                          className="mt-1 size-3.5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary motion-reduce:transition-none"
                        />
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {post.description}
                      </p>
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground tabular-nums sm:pt-1">
                      {post.readingTime}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </section>
    </main>
  );
}
