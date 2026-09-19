import { GithubStarButton } from "@/components/github-button";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
];

export function Footer() {
  return (
    <footer className="relative mx-auto max-w-3xl *:px-4 *:md:px-6 lg:border-x">
      <div className="flex min-h-(--footer-height) items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-accent-foreground">Michael Obasi</span>
        </p>

        <div className="flex items-center gap-3">
          <nav aria-label="Footer" className="flex items-center gap-4">
            {footerLinks.map(({ href, label }) => (
              <a
                key={label}
                className="transition-colors hover:text-foreground"
                href={href}
              >
                {label}
              </a>
            ))}
          </nav>
          <Separator orientation="vertical" className="my-auto h-6" />

          <GithubStarButton />
        </div>
      </div>
    </footer>
  );
}
