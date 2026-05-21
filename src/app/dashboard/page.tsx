"use client";

import { useStore } from "@/lib/store";
import { Hydrated } from "@/components/hydrated";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  computeStreak,
  currentWeekNumber,
  overallProgress,
  overdueProblems,
  PHASES,
  phaseColor,
  phaseProgress,
  timeActualMinutes,
  timeEstimateMinutes,
  weekProgress,
} from "@/lib/progress";
import { cn, formatMinutes } from "@/lib/utils";
import { Flame, AlertOctagon, Calendar, Target } from "lucide-react";
import Link from "next/link";

function DashboardInner() {
  const weeks = useStore((s) => s.weeks);
  const startDate = useStore((s) => s.startDate);
  const targetHoursPerWeek = useStore((s) => s.targetHoursPerWeek);
  const doneDates = useStore((s) => s.doneDates);

  const currentWeek = currentWeekNumber(startDate);
  const overall = overallProgress(weeks);
  const streak = computeStreak(doneDates);
  const estimateMins = timeEstimateMinutes(weeks);
  const actualMins = timeActualMinutes(weeks);
  const overdue = overdueProblems(weeks, currentWeek);
  const thisWeek = currentWeek ? weeks.find((w) => w.number === currentWeek) : undefined;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {startDate ? `Started ${startDate}. Targeting ${targetHoursPerWeek}h / week.` : "No start date set — visit Admin to set one."}
        </p>
      </div>

      {thisWeek && (
        <Card className="border-primary/40 bg-primary/[0.03]">
          <CardHeader>
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <Badge variant="outline" className="mb-2">
                  <Calendar className="h-3 w-3 mr-1" />
                  This week — Week {thisWeek.number} of 12
                </Badge>
                <CardTitle className="text-xl">{thisWeek.title}</CardTitle>
                <CardDescription className="mt-1">{thisWeek.phase}</CardDescription>
              </div>
              <Link href="/" className="text-sm font-medium text-primary hover:underline">
                Go to curriculum →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed mb-3">{thisWeek.goal}</p>
            <div className="flex items-center gap-3">
              <Progress value={weekProgress(thisWeek).pct} className="flex-1" />
              <p className="text-sm font-medium tabular-nums shrink-0 w-20 text-right">
                {weekProgress(thisWeek).done}/{weekProgress(thisWeek).total}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Overall</CardDescription>
            <CardTitle className="text-3xl tabular-nums">{overall.pct}%</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={overall.pct} />
            <p className="text-xs text-muted-foreground mt-2">
              {overall.done}/{overall.total} problems
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Streak</CardDescription>
            <CardTitle className="text-3xl tabular-nums flex items-center gap-1.5">
              {streak} <Flame className="h-6 w-6 text-orange-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">consecutive days with a problem marked done</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Time — estimated (done)</CardDescription>
            <CardTitle className="text-3xl tabular-nums">{formatMinutes(estimateMins)}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">sum of estimatedMinutes for completed problems</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Time — actual</CardDescription>
            <CardTitle className="text-3xl tabular-nums">{formatMinutes(actualMins)}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {actualMins > 0 && estimateMins > 0
                ? `${Math.round((actualMins / estimateMins) * 100)}% of estimate`
                : "log actual minutes in problem dialogs"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5" />
            Per-phase progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {PHASES.map((phase) => {
            const p = phaseProgress(weeks, phase);
            const pc = phaseColor(phase);
            return (
              <div key={phase}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={cn("inline-block h-2.5 w-2.5 rounded-full", pc.ring)} />
                    <p className="text-sm font-medium">{phase}</p>
                  </div>
                  <p className="text-xs text-muted-foreground tabular-nums">
                    {p.done}/{p.total} ({p.pct}%)
                  </p>
                </div>
                <Progress value={p.pct} indicatorClassName={pc.ring} />
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertOctagon className="h-5 w-5 text-amber-500" />
            Overdue
          </CardTitle>
          <CardDescription>
            Problems in past weeks that are not done or skipped.
            {currentWeek === null && " (set a start date to populate this list)"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {overdue.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing overdue. Nice.</p>
          ) : (
            <ul className="space-y-1.5 max-h-96 overflow-y-auto">
              {overdue.map(({ week, problem }) => (
                <li key={problem.id} className="flex items-start justify-between gap-3 text-sm border-b border-border/60 pb-1.5 last:border-0">
                  <div className="min-w-0">
                    <p className="font-medium truncate">{problem.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Week {week.number} · {problem.source}
                    </p>
                  </div>
                  <Badge variant="outline" className="shrink-0">
                    Week {week.number}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function Page() {
  return (
    <Hydrated fallback={<div className="text-sm text-muted-foreground">Loading…</div>}>
      <DashboardInner />
    </Hydrated>
  );
}
