import { Link } from "@tanstack/react-router";

import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";
import { siteConfig } from "@/lib/site.config";
import { useScroll } from "@/hooks/use-scroll";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/writing", label: "Writing" },
  { to: "/about", label: "About" },
] as const;

const navLinkClass =
  "inline-flex h-8 items-center rounded-md px-2.5 text-muted-foreground transition-colors hover:text-foreground";

export function Header() {
  const scrolled = useScroll(10);

  return (
    <header
      className={cn("sticky top-0 z-50 w-full border-b border-transparent", {
        "border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50":
          scrolled,
      })}
    >
      <nav className="mx-auto flex h-(--header-height) w-full max-w-4xl items-center justify-between px-4">
        <Link
          aria-label="Michael Obasi, home"
          className="-mx-2 inline-flex h-8 items-center rounded-md px-2 transition-colors hover:text-primary"
          to="/"
        >
          <span
            aria-hidden="true"
            className="font-heading text-base font-medium tracking-tight text-foreground sm:hidden"
          >
            MO
          </span>
          <Logo aria-hidden="true" className="hidden sm:inline-flex" />
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <nav
            aria-label="Primary"
            className="flex items-center gap-0.5 text-sm"
          >
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={navLinkClass}
                activeProps={{ className: "text-primary" }}
              >
                {label}
              </Link>
            ))}
            <a
              href={siteConfig.resume}
              target="_blank"
              rel="noopener noreferrer"
              className={navLinkClass}
            >
              Résumé
            </a>
          </nav>
          <Separator orientation="vertical" className="py-4" />
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
