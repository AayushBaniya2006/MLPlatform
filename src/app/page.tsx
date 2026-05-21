"use client";

import { useStore } from "@/lib/store";
import { Hydrated } from "@/components/hydrated";
import { StartDatePrompt } from "@/components/start-date-prompt";
import { WeekAccordion } from "@/components/curriculum/week-accordion";
import { currentWeekNumber, overallProgress } from "@/lib/progress";
import { Progress } from "@/components/ui/progress";

function CurriculumInner() {
  const weeks = useStore((s) => s.weeks);
  const startDate = useStore((s) => s.startDate);

  if (!startDate) return <StartDatePrompt />;

  const currentWeek = currentWeekNumber(startDate);
  const overall = overallProgress(weeks);

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-5">
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Curriculum</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {currentWeek ? `You're in Week ${currentWeek} of 12.` : "Set a start date in Admin to compute the current week."}
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold tabular-nums">{overall.pct}%</p>
            <p className="text-xs text-muted-foreground">
              {overall.done}/{overall.total} problems
            </p>
          </div>
        </div>
        <Progress value={overall.pct} className="mt-4" />
      </div>

      <WeekAccordion weeks={weeks} currentWeek={currentWeek} />
    </div>
  );
}

export default function Page() {
  return (
    <Hydrated fallback={<div className="text-sm text-muted-foreground">Loading…</div>}>
      <CurriculumInner />
    </Hydrated>
  );
}
