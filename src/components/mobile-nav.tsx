import { Portal, PortalBackdrop } from "@/components/portal";
import { XIcon, ListIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/components/header";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="Toggle menu"
        className="md:hidden"
        onClick={() => setOpen(!open)}
        size="icon"
        variant="outline"
      >
        {open ? (
          <XIcon className="size-4.5" />
        ) : (
          <ListIcon className="size-4.5" />
        )}
      </Button>
      {open && (
        <Portal className="top-14" id="mobile-menu">
          <PortalBackdrop />
          <div
            className={cn(
              "ease-out data-[slot=open]:animate-in data-[slot=open]:zoom-in-97",
              "size-full p-4",
            )}
            data-slot={open ? "open" : "closed"}
          >
            <div className="grid gap-y-2">
              {navLinks.map((link) => (
                <Button
                  className="justify-start"
                  key={link.label}
                  variant="ghost"
                  render={<a href={link.href} />}
                  nativeButton={false}
                >
                  {link.label}
                </Button>
              ))}
            </div>
            <div className="mt-12 flex flex-col gap-2">
              <Button className="w-full" variant="outline">
                Sign In
              </Button>
              <Button className="w-full">Get Started</Button>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}
