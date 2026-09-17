import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { useScroll } from "@/hooks/use-scroll";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

export const navLinks = [
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "About", href: "#" },
];

export function Header() {
  const scrolled = useScroll(10);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 mx-auto w-full max-w-4xl border-b border-transparent md:rounded-md md:border md:transition-all md:ease-out",
        {
          "border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:top-2 md:max-w-3xl md:shadow":
            scrolled,
        },
      )}
    >
      <nav
        className={cn(
          "flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
          {
            "md:px-2": scrolled,
          },
        )}
      >
        <a
          className="rounded-md p-2 hover:bg-muted dark:hover:bg-muted/50"
          href="#"
        >
          <Logo className="h-4" />
        </a>
        <div className="hidden items-center gap-2 md:flex">
          <div>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                size="sm"
                variant="ghost"
                render={<a href={link.href} />}
                nativeButton={false}
              >
                {link.label}
              </Button>
            ))}
          </div>
          <Button size="sm" variant="outline">
            Sign In
          </Button>
          <Button size="sm">Get Started</Button>
        </div>
        <MobileNav />
      </nav>
    </header>
  );
}
