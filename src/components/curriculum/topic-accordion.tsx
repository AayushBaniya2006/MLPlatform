"use client";

import type { Topic } from "@/lib/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { ProblemRow } from "./problem-row";
import { ResourceChip } from "./resource-chip";
import { topicProgress } from "@/lib/progress";

export function TopicAccordion({ topics }: { topics: Topic[] }) {
  return (
    <Accordion type="multiple" className="space-y-2">
      {topics.map((t) => {
        const prog = topicProgress(t);
        return (
          <AccordionItem
            key={t.id}
            value={t.id}
            className="border rounded-md px-4 bg-background data-[state=open]:bg-accent/10"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex flex-1 items-center justify-between gap-3 pr-3">
                <div className="text-left">
                  <p className="text-base font-semibold">{t.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {prog.done}/{prog.total} problems done
                  </p>
                </div>
                <div className="w-28 shrink-0">
                  <Progress value={prog.pct} />
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <p className="text-sm leading-relaxed text-muted-foreground">{t.summary}</p>
                {t.resources.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {t.resources.map((r) => (
                      <ResourceChip key={r.url} resource={r} />
                    ))}
                  </div>
                )}
                <div className="space-y-2">
                  {t.problems.map((p) => (
                    <ProblemRow key={p.id} problem={p} />
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
