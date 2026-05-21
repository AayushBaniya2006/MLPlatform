"use client";

import type { Week } from "@/lib/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { phaseColor, weekProgress } from "@/lib/progress";
import { TopicAccordion } from "./topic-accordion";
import { DeliverableCard } from "./deliverable-card";
import { KillCriterion } from "./kill-criterion";
import { cn } from "@/lib/utils";

export function WeekAccordion({ weeks, currentWeek }: { weeks: Week[]; currentWeek: number | null }) {
  const defaultOpen = currentWeek ? [`week-${currentWeek}`] : ["week-1"];

  return (
    <Accordion type="multiple" defaultValue={defaultOpen} className="space-y-3">
      {weeks.map((w) => {
        const pc = phaseColor(w.phase);
        const prog = weekProgress(w);
        const isCurrent = currentWeek === w.number;
        return (
          <AccordionItem
            key={w.number}
            value={`week-${w.number}`}
            className={cn(
              "border rounded-lg px-5 py-1 bg-card",
              isCurrent && "ring-2 ring-primary ring-offset-2 ring-offset-background",
              pc.border
            )}
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex flex-1 items-center gap-4 pr-3">
                <div className={cn("h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0", pc.chip)}>
                  {w.number}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className={cn("text-xs", pc.text, pc.border)}>
                      {w.phase}
                    </Badge>
                    {isCurrent && <Badge className="text-xs bg-primary">Current</Badge>}
                  </div>
                  <p className="mt-1 text-base font-semibold truncate">{w.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {w.estimatedHours}h estimated · {prog.done}/{prog.total} problems done
                  </p>
                </div>
                <div className="hidden sm:block w-32 shrink-0">
                  <Progress value={prog.pct} indicatorClassName={pc.ring} />
                  <p className="text-xs text-muted-foreground text-right mt-1">{prog.pct}%</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-5 pt-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Goal</p>
                  <p className="text-base leading-relaxed">{w.goal}</p>
                </div>

                <KillCriterion text={w.killCriterion} />

                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Topics</p>
                  <TopicAccordion topics={w.topics} />
                </div>

                <DeliverableCard week={w} />
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
