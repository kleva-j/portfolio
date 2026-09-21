import { useEffect, useState } from "react";

export type BjorkTableThemeMode = "light" | "dark" | "auto";

export function useBjorkTableIsDark(
  resolvedTheme?: string,
  forcedTheme?: Exclude<BjorkTableThemeMode, "auto">,
) {
  const [documentTheme, setDocumentTheme] = useState<"light" | "dark" | null>(
    null,
  );
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark" | null>(
    null,
  );

  useEffect(() => {
    const syncDocumentTheme = () => {
      const root = document.documentElement;
      const searchParams = new URLSearchParams(window.location.search);
      const theme = searchParams.get("theme");

      setPreviewTheme(theme === "light" || theme === "dark" ? theme : null);

      setDocumentTheme(
        root.classList.contains("light")
          ? "light"
          : root.classList.contains("dark")
            ? "dark"
            : null,
      );
    };

    syncDocumentTheme();

    const observer = new MutationObserver(syncDocumentTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const activeTheme =
    forcedTheme ?? previewTheme ?? documentTheme ?? resolvedTheme;

  return activeTheme !== "light";
}

export function getBjorkTablePalette(isDark: boolean) {
  return {
    container: isDark
      ? "border-[#232323] bg-[#111]"
      : "border-[#f1e8dc] bg-[#fffcf6] shadow-[var(--bjork-shadow-surface)]",
    header: isDark
      ? "border-[#232323] bg-[#181818] text-[#ededed]/42"
      : "border-[#f1e8dc] bg-[#fbf7ef] text-[#171717]/42",
    row: isDark
      ? "border-[#232323] hover:bg-[#181818]/70"
      : "border-[#f1e8dc] hover:bg-[#f8f2e7]/72",
    selectedRow: isDark
      ? "border-[#2a2a2a] bg-[#181818]"
      : "border-[#eadfce] bg-[#f8f2e7]",
    control: isDark
      ? "border-[#232323] bg-[#181818] text-[#ededed]/70 hover:bg-[#202020]"
      : "border-[#eadfce] bg-[#fffcf6] text-[#171717]/68 shadow-[var(--bjork-shadow-soft)] hover:bg-[#f8f2e7]",
    menu: isDark
      ? "border-[#232323] bg-[#181818] text-[#ededed]/76 shadow-[0_18px_60px_rgba(0,0,0,0.42)]"
      : "border-[#eadfce] bg-[#fffcf6] text-[#171717]/76 shadow-[0_18px_60px_rgba(62,52,38,0.12)]",
    menuItem: isDark ? "hover:bg-[#232323]" : "hover:bg-[#f8f2e7]",
    menuActive: isDark ? "bg-[#232323]" : "bg-[#f8f2e7]",
    divider: isDark ? "border-[#232323]" : "border-[#f1e8dc]",
    primaryText: isDark ? "text-[#ededed]/90" : "text-[#171717]/86",
    secondaryText: isDark ? "text-[#ededed]/38" : "text-[#171717]/42",
    mutedSurface: isDark ? "bg-[#181818]" : "bg-[#f8f2e7]",
    popover: isDark
      ? "bg-[#111] text-[#ededed]"
      : "bg-[#fffcf6] text-[#171717]",
    accent: isDark ? "text-[#d86a2c]" : "text-[#bd4514]",
    accentBg: isDark ? "bg-[#ec5c13]/12" : "bg-[#ec5c13]/14",
    accentBorder: isDark ? "border-[#ec5c13]/24" : "border-[#bd4514]/22",
    checkboxAccent: isDark ? "#d86a2c" : "#bd4514",
  };
}

export function getBjorkSignalPalette(
  tone: "green" | "red" | "orange" | "neutral",
  isDark: boolean,
) {
  const palettes = {
    green: {
      bgColor: isDark ? "bg-[#3e6f52]/18" : "bg-[#dce8dc]",
      borderColor: isDark ? "border-[#5f9f78]/28" : "border-[#bad0bd]",
      textColor: isDark ? "text-[#77b58b]" : "text-[#47785c]",
      dotColor: isDark ? "bg-[#77b58b]" : "bg-[#47785c]",
      color: isDark ? "#77b58b" : "#47785c",
    },
    red: {
      bgColor: isDark ? "bg-[#87463f]/18" : "bg-[#eadad5]",
      borderColor: isDark ? "border-[#c46a61]/28" : "border-[#d7bcb4]",
      textColor: isDark ? "text-[#cf7c72]" : "text-[#9d5149]",
      dotColor: isDark ? "bg-[#cf7c72]" : "bg-[#9d5149]",
      color: isDark ? "#cf7c72" : "#9d5149",
    },
    orange: {
      bgColor: isDark ? "bg-[#ec5c13]/14" : "bg-[#ead9cb]",
      borderColor: isDark ? "border-[#ec5c13]/28" : "border-[#d5b59f]",
      textColor: isDark ? "text-[#d86a2c]" : "text-[#9f4317]",
      dotColor: isDark ? "bg-[#d86a2c]" : "bg-[#9f4317]",
      color: isDark ? "#d86a2c" : "#9f4317",
    },
    neutral: {
      bgColor: isDark ? "bg-[#ededed]/8" : "bg-[#ded7ca]",
      borderColor: isDark ? "border-[#ededed]/14" : "border-[#cfc6b7]",
      textColor: isDark ? "text-[#ededed]/58" : "text-[#171717]/58",
      dotColor: isDark ? "bg-[#ededed]/45" : "bg-[#171717]/42",
      color: isDark ? "#a3a3a3" : "#706b62",
    },
  } as const;

  return palettes[tone];
}
