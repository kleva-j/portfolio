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

const items = [
  {
    date: "2019",
    description:
      "Started my engineering career at Andela, building web products for distributed teams and international clients across React front-ends and Node.js services.",
    id: 1,
    title: "Software Engineer · Andela",
  },
  {
    date: "2021",
    description:
      "Joined an early-stage product team, shipping features end to end in TypeScript, React, and Postgres, and helping shape engineering practices as the team grew.",
    id: 2,
    title: "Software Engineer · Finch (YC S21)",
  },
  {
    date: "2023",
    description:
      "Stepped into a senior role leading architecture on backend systems and mentoring engineers, then went independent to consult and build my own products.",
    id: 3,
    title: "Senior Software Engineer",
  },
  {
    date: "Present",
    description:
      "Building PairSync — peer-to-peer file and clipboard sharing for macOS, iOS, and Linux. A Go core with native clients, no cloud, no accounts, no relay servers.",
    id: 4,
    title: "Independent · PairSync",
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
            <TimelineDate className="sm:group-data-[orientation=vertical]/timeline:absolute sm:group-data-[orientation=vertical]/timeline:-start-32 sm:group-data-[orientation=vertical]/timeline:w-20 sm:group-data-[orientation=vertical]/timeline:text-end">
              {item.date}
            </TimelineDate>
            <TimelineTitle className="sm:-mt-0.5">{item.title}</TimelineTitle>
            <TimelineIndicator />
          </TimelineHeader>
          <TimelineContent>{item.description}</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
