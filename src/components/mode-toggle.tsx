import type { ButtonProps } from "@/components/ui/button";

import { DesktopIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";

import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

const order = ["light", "dark", "system"] as const;

const label = {
  light: "Light",
  dark: "Dark",
  system: "System",
} as const;

const icon = {
  light: SunIcon,
  dark: MoonIcon,
  system: DesktopIcon,
} as const;

export function ModeToggle({ className, ...props }: ButtonProps) {
  const { theme, setTheme } = useTheme();

  const next = order[(order.indexOf(theme) + 1) % order.length];
  const Icon = icon[theme];

  return (
    <Button
      aria-label={`Theme: ${label[theme]}. Switch to ${label[next]}.`}
      className={className}
      onClick={() => setTheme(next)}
      size="icon"
      variant="ghost"
      {...props}
    >
      <Icon weight="bold" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
