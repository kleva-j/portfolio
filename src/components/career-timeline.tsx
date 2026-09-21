import {
  TimelineSeparator,
  TimelineIndicator,
  TimelineContent,
  TimelineHeader,
  TimelineTitle,
  TimelineItem,
  TimelineDate,
  Timeline,
} from "@/components/ui/timeline";

type CareerItem = {
  id: number;
  date: string;
  role: string;
  company?: string;
  description: string;
  stack: string[];
  current?: boolean;
};

const items: CareerItem[] = [
  {
    id: 1,
    date: "Present",
    role: "Independent Engineer",
    company: "PairSync",
    description:
      "Building peer-to-peer file and clipboard sharing for desktop and mobile — no cloud, no accounts, no relay servers.",
    stack: ["Rust", "Tauri", "React Native", "Expo"],
    current: true,
  },
  {
    id: 2,
    date: "2026",
    role: "Software Engineer",
    company: "Screenstack.tech (Contract)",
    description:
      "Full-stack contractor working end to end: shipped frontend interfaces and backend services, designed and modeled the database, shaped the product's UI/UX, established engineering workflows, and mentored teammates.",
    stack: ["React", "Node.js", "TypeScript", "PostgreSQL"],
  },
  {
    id: 3,
    date: "2022",
    role: "Software Engineer",
    company: "Aduro Creative",
    description:
      "Built React apps for clients including a medical-education platform, and drove accessibility initiatives across the UI.",
    stack: ["React", "TypeScript", "Accessibility"],
  },
  {
    id: 4,
    date: "2021",
    role: "Frontend Engineer",
    company: "LawPavilion",
    description:
      "Engineered a performance-focused Angular architecture with lazy-loading and web-worker offloading to bring down load times across the app.",
    stack: ["Angular", "TypeScript", "RxJS"],
  },
  {
    id: 5,
    date: "2019",
    role: "Frontend Engineer",
    company: "Tulaa",
    description:
      "Built an Angular CRM serving 25,000+ users and cut load time by ~30% with lazy-loaded microservices, while leading and mentoring the frontend team.",
    stack: ["Angular 8", "TypeScript", "Data viz"],
  },
];

export function CareerTimeline() {
  return (
    <Timeline defaultValue={items.length}>
      {items.map((item) => (
        <TimelineItem
          className="sm:group-data-[orientation=vertical]/timeline:ms-32"
          key={item.id}
          step={item.id}
        >
          <TimelineHeader>
            <TimelineSeparator />
            <TimelineDate className="font-mono tabular-nums sm:group-data-[orientation=vertical]/timeline:absolute sm:group-data-[orientation=vertical]/timeline:-start-32 sm:group-data-[orientation=vertical]/timeline:w-20 sm:group-data-[orientation=vertical]/timeline:text-end">
              {item.date}
            </TimelineDate>
            <TimelineTitle className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 sm:-mt-0.5">
              <span className="text-foreground">{item.role}</span>
              {item.company ? (
                <>
                  <span aria-hidden className="text-border">
                    /
                  </span>
                  <span className="font-normal text-muted-foreground">
                    {item.company}
                  </span>
                </>
              ) : null}
              {item.current ? (
                <span className="text-[10px] font-medium tracking-[0.14em] text-primary uppercase">
                  Now
                </span>
              ) : null}
            </TimelineTitle>
            <TimelineIndicator
              className={item.current ? "border-primary bg-primary" : undefined}
            />
          </TimelineHeader>
          <TimelineContent className="space-y-3">
            <p className="leading-relaxed">{item.description}</p>
            <p className="text-[11px] tracking-wide text-muted-foreground/70">
              {item.stack.join("  ·  ")}
            </p>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
