import { Link } from "@tanstack/react-router";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useScroll } from "@/hooks/use-scroll";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

export const contactHref = "mailto:kasmickleva@gmail.com";

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
          className="-mx-2 rounded-md px-2 py-1 transition-colors hover:text-primary"
          to="/"
        >
          <Logo />
        </Link>
        <div className="flex items-center gap-1">
          <ModeToggle />
          <Button
            size="sm"
            variant="outline"
            render={<a href={contactHref} />}
            nativeButton={false}
          >
            Get in touch
          </Button>
        </div>
      </nav>
    </header>
  );
}
