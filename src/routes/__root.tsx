import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { Analytics } from "@vercel/analytics/react";

import { ConstructionBanner } from "@/components/construction-banner";
import { ThemeProvider } from "@/components/theme-provider";
import { NotFoundPage } from "@/components/not-found";
import { siteConfig } from "@/lib/site.config";

import appCss from "../styles.css?url";

const siteTitle = "Michael Obasi — Software Engineer";
const siteDescription =
  "Michael Obasi is a software engineer. Selected work, writing, and a few interactive experiments.";
const ogImage = "/og.svg";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: siteTitle },
      { name: "description", content: siteDescription },
      { name: "theme-color", content: "#c87046" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: siteConfig.name },
      { property: "og:title", content: siteTitle },
      { property: "og:description", content: siteDescription },
      { property: "og:image", content: ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: siteTitle },
      { name: "twitter:description", content: siteDescription },
      { name: "twitter:image", content: ogImage },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png", sizes: "48x48" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
    ],
  }),
  notFoundComponent: () => <NotFoundPage />,
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider defaultTheme="system" storageKey="theme">
          <ConstructionBanner />
          {children}
        </ThemeProvider>
        <TanStackDevtools config={{ position: "bottom-right" }} />
        <Analytics />
        <Scripts />
      </body>
    </html>
  );
}
