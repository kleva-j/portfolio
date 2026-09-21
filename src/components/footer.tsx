import { Fragment } from "react";

import { siteConfig } from "@/lib/site.config";

type FooterLink = { label: string; href: string; external?: boolean };

const links: FooterLink[] = [
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
  { label: "GitHub", href: siteConfig.externalLinks.github, external: true },
  {
    label: "LinkedIn",
    href: siteConfig.externalLinks.linkedin,
    external: true,
  },
  { label: "Email", href: siteConfig.mailto },
];

function Dot() {
  return (
    <span
      aria-hidden="true"
      className="size-0.5 rounded-full bg-muted-foreground/40"
    />
  );
}

export function Footer() {
  return (
    <footer className="relative mx-auto max-w-3xl *:px-4 *:md:px-6 lg:border-x">
      <div className="flex min-h-(--footer-height) flex-wrap items-center justify-center gap-x-3 gap-y-2 py-4 text-xs text-muted-foreground sm:py-0">
        <p className="font-medium tracking-wide text-accent-foreground">
          &copy; {new Date().getFullYear()} Michael Obasi
        </p>

        <span className="hidden sm:block">
          <Dot />
        </span>

        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
        >
          {links.map(({ label, href, external }, index) => (
            <Fragment key={label}>
              {index > 0 ? <Dot /> : null}
              <a
                href={href}
                className="rounded-sm transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {label}
              </a>
            </Fragment>
          ))}
        </nav>
      </div>
    </footer>
  );
}
