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
    date: "2019",
    role: "Software Engineer",
    company: "Andela",
    description:
      "Started my engineering career building web products for distributed teams and international clients across React front-ends and Node.js services.",
    stack: ["React", "Node.js", "JavaScript"],
  },
  {
    id: 2,
    date: "2021",
    role: "Software Engineer",
    company: "Finch (YC S21)",
    description:
      "Joined an early-stage product team, shipping features end to end and helping shape engineering practices as the team grew.",
    stack: ["TypeScript", "React", "PostgreSQL"],
  },
  {
    id: 3,
    date: "2023",
    role: "Senior Software Engineer",
    company: "Contract",
    description:
      "Stepped into a senior role leading architecture on backend systems and mentoring engineers, then went independent to consult and build my own products.",
    stack: ["Node.js", "TypeScript", "PostgreSQL"],
  },
  {
    id: 4,
    date: "Present",
    role: "Independent Engineer",
    company: "PairSync",
    description:
      "Building peer-to-peer file and clipboard sharing for macOS, iOS, and Linux — a Go core with native clients, no cloud, no accounts, no relay servers.",
    stack: ["Go", "Tauri", "React Native"],
    current: true,
  },
];

export function CareerTimeline() {
  return (
    <Timeline defaultValue={4}>
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
