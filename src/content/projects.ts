import { siteConfig } from "@/lib/site.config";

export type Project = {
  name: string;
  year: string;
  role: string;
  summary: string;
  stack: string[];
  href: string;
  /** Internal route links navigate in-place; external links open in a new tab. */
  external?: boolean;
};

/** Every project, in the order shown on the /projects listing page. */
export const projects: Project[] = [
  {
    name: "PairSync",
    year: "2026",
    role: "Open source",
    summary:
      "Peer-to-peer file and clipboard sharing for desktop and mobile over the local network — no cloud, accounts, or relay servers.",
    stack: ["Tauri", "Rust", "React Native", "Expo", "XState"],
    href: siteConfig.externalLinks.project,
    external: true,
  },
  {
    name: "Chapel Hymn Book",
    year: "2026",
    role: "Mobile",
    summary:
      "An offline mobile hymnal for browsing and reading hymns anywhere, with no connection required.",
    stack: ["Expo", "Drizzle", "SQLite", "Effect"],
    href: `${siteConfig.externalLinks.github}/Chapel-Hymn-Book`,
    external: true,
  },
  {
    name: "This portfolio",
    year: "2026",
    role: "Design & build",
    summary:
      "An editorial, server-rendered personal site — a warm, text-forward reading experience with a signature interactive showcase, built for speed and legibility.",
    stack: ["TanStack Start", "React 19", "Tailwind v4"],
    href: `${siteConfig.externalLinks.github}/portfolio`,
    external: true,
  },
  {
    name: "DevGrade",
    year: "2026",
    role: "Full-stack",
    summary:
      "A developer skills-assessment tool — framework competency quizzes scored across normalized proficiency pillars.",
    stack: ["TanStack Start", "Drizzle", "XState", "shadcn/ui"],
    href: "https://dev-grade.vercel.app",
    external: true,
  },
  {
    name: "clinicore",
    year: "2026",
    role: "Full-stack",
    summary:
      "A full-stack clinic management system — patients, appointments, treatments, and staff, with role-based access, consent, and audit logging.",
    stack: ["TanStack Start", "oRPC", "Better Auth", "Drizzle", "Postgres"],
    href: "https://clinicore-web.vercel.app",
    external: true,
  },
  {
    name: "Summarly",
    year: "2026",
    role: "Full-stack",
    summary:
      "A content summarizer with accounts and voice interaction, turning long-form material into concise, listenable briefings.",
    stack: ["Next.js 15", "Convex", "Clerk", "ElevenLabs"],
    href: "https://summarly-seven.vercel.app",
    external: true,
  },
  {
    name: "Notemark",
    year: "2025",
    role: "Open source",
    summary:
      "Cross-platform markdown notes for web, desktop, and mobile, with AI assistance and a shared sync core.",
    stack: ["Turborepo", "Hono", "oRPC", "Tauri", "Expo"],
    href: `${siteConfig.externalLinks.github}/notemark-monorepo`,
    external: true,
  },
];

/** Curated ordering for the home page "Selected work" section. */
const featuredOrder = [
  "PairSync",
  "Chapel Hymn Book",
  "This portfolio",
  "DevGrade",
] as const;

/** The subset surfaced on the home page, in the curated order above. */
export const featuredProjects: Project[] = featuredOrder.flatMap((name) => {
  const match = projects.find((project) => project.name === name);
  return match ? [match] : [];
});
