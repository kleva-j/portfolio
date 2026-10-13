import { timelineCareerItems } from "@/content/portfolio-data";
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

export function CareerTimeline() {
  return (
    <Timeline defaultValue={timelineCareerItems.length}>
      {timelineCareerItems.map((item, index) => (
        <TimelineItem
          className="sm:group-data-[orientation=vertical]/timeline:ms-32"
          key={`${item.company}-${item.role}-${item.date}`}
          step={index + 1}
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
            {item.description ? (
              <p className="leading-relaxed">{item.description}</p>
            ) : null}
            {item.stack.length > 0 ? (
              <p className="text-[11px] tracking-wide text-muted-foreground/70">
                {item.stack.join("  ·  ")}
              </p>
            ) : null}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
