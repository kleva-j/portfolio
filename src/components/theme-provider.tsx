import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ScriptOnce } from "@tanstack/react-router";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

function getThemeScript(storageKey: string, defaultTheme: Theme) {
  const key = JSON.stringify(storageKey);
  const fallback = JSON.stringify(defaultTheme);

  return `(function(){try{var t=localStorage.getItem(${key});if(t!=='light'&&t!=='dark'&&t!=='system'){t=${fallback}}var d=matchMedia('(prefers-color-scheme: dark)').matches;var r=t==='system'?(d?'dark':'light'):t;var e=document.documentElement;e.classList.add(r);e.style.colorScheme=r}catch(e){}})();`;
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined,
);

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => unknown;
};

let transitionTimeout: ReturnType<typeof setTimeout> | undefined;

function resolveTheme(theme: Theme): "dark" | "light" {
  if (theme !== "system") return theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function commitTheme(resolved: "dark" | "light") {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
}

function applyTheme(theme: Theme, animate: boolean) {
  const resolved = resolveTheme(theme);

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!animate || reduceMotion) {
    commitTheme(resolved);
    return;
  }

  // Prefer the View Transitions API: it cross-fades a rasterized snapshot of
  // the page, so text glyphs never re-rasterize mid-animation (which is what
  // makes text flicker when the `color` property is transitioned directly).
  const doc = document as ViewTransitionDocument;
  if (typeof doc.startViewTransition === "function") {
    doc.startViewTransition(() => commitTheme(resolved));
    return;
  }

  // Fallback (e.g. Firefox): fade themed colors via a temporary class. This
  // path re-rasterizes text, but Firefox uses grayscale antialiasing so it
  // does not exhibit the subpixel flicker.
  const root = document.documentElement;
  root.classList.add("theme-transition");
  if (transitionTimeout) clearTimeout(transitionTimeout);
  transitionTimeout = setTimeout(() => {
    root.classList.remove("theme-transition");
  }, 450);
  commitTheme(resolved);
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);
  // Animate only changes the user (or the OS) initiates, never the initial
  // sync from storage, which already matches the pre-hydration paint.
  const animateNext = useRef(false);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    setThemeState(
      stored === "light" || stored === "dark" || stored === "system"
        ? stored
        : defaultTheme,
    );
    setMounted(true);
  }, [defaultTheme, storageKey]);

  useEffect(() => {
    if (!mounted) return;
    applyTheme(theme, animateNext.current);
    animateNext.current = false;
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted || theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system", true);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme, mounted]);

  const setTheme = (next: Theme) => {
    animateNext.current = true;
    localStorage.setItem(storageKey, next);
    setThemeState(next);
  };

  return (
    <ThemeProviderContext value={{ theme, setTheme }}>
      <ScriptOnce>{getThemeScript(storageKey, defaultTheme)}</ScriptOnce>
      {children}
    </ThemeProviderContext>
  );
}

export function useTheme() {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
