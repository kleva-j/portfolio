import { LinkedinLogoIcon, GithubLogoIcon } from "@phosphor-icons/react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const footerLinks = [
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
];

const socialLinks = [
  {
    icon: <GithubLogoIcon weight="bold" />,
    href: "https://github.com/kleva-j",
    label: "GitHub",
  },
  {
    icon: <LinkedinLogoIcon weight="bold" />,
    href: "https://www.linkedin.com/in/michael-obasi-808806140/",
    label: "LinkedIn",
  },
];

export function Footer() {
  return (
    <footer className="relative mx-auto max-w-3xl *:px-4 *:md:px-6 lg:border-x">
      <div className="flex min-h-(--footer-height) items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} MICHAEL OBASI</p>

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
          <div className="flex items-center">
            {socialLinks.map(({ href, label, icon }) => (
              <Button
                key={label}
                size="icon"
                variant="ghost"
                render={<a aria-label={label} href={href} />}
                nativeButton={false}
              >
                {icon}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
