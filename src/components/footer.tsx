import { LinkedinLogoIcon, GithubLogoIcon } from "@phosphor-icons/react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

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
    <footer className="relative mx-auto max-w-4xl *:px-4 *:md:px-6 lg:border-x">
      <div className="flex items-center justify-between gap-4 py-4 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} KLEVA-J</p>

        <div className="flex items-center gap-3">
          <p className="mr-2 inline-flex items-center gap-2">
            <span>Built by</span>
            <a
              aria-label="Michael on GitHub"
              className="inline-flex items-center gap-1 text-foreground/80 hover:text-foreground hover:underline"
              href="https://github.com/kleva-j"
              rel="noreferrer"
              target="_blank"
            >
              <img
                alt="Michael"
                className="size-4 rounded-full grayscale"
                src="/images/michael.jpg"
                height={16}
                width={16}
              />
              <span>Michael</span>
            </a>
          </p>
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
