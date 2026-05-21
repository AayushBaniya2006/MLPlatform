import type { Phase, Problem, Topic, Week } from "./types";
import { daysBetween, todayIso } from "./utils";

export function problemDone(p: Problem): boolean {
  return p.status === "done";
}

export function problemCounted(p: Problem): boolean {
  return p.status === "done" || p.status === "skipped";
}

export function topicProgress(t: Topic): { done: number; total: number; pct: number } {
  const total = t.problems.length;
  const done = t.problems.filter(problemDone).length;
  return { done, total, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
}

export function weekProgress(w: Week): { done: number; total: number; pct: number } {
  const all = w.topics.flatMap((t) => t.problems);
  const total = all.length;
  const done = all.filter(problemDone).length;
  return { done, total, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
}

export function overallProgress(weeks: Week[]): { done: number; total: number; pct: number } {
  const all = weeks.flatMap((w) => w.topics.flatMap((t) => t.problems));
  const total = all.length;
  const done = all.filter(problemDone).length;
  return { done, total, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
}

export function phaseProgress(weeks: Week[], phase: Phase): { done: number; total: number; pct: number } {
  const all = weeks
    .filter((w) => w.phase === phase)
    .flatMap((w) => w.topics.flatMap((t) => t.problems));
  const total = all.length;
  const done = all.filter(problemDone).length;
  return { done, total, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
}

export const PHASES: Phase[] = [
  "Phase 0: Math Audit",
  "Phase 1: fast.ai",
  "Phase 2: Karpathy",
  "Phase 3: Specialization",
];

export function phaseColor(phase: Phase): {
  text: string;
  bg: string;
  border: string;
  ring: string;
  chip: string;
} {
  switch (phase) {
    case "Phase 0: Math Audit":
      return {
        text: "text-slate-700 dark:text-slate-300",
        bg: "bg-slate-100 dark:bg-slate-900/40",
        border: "border-slate-300 dark:border-slate-700",
        ring: "bg-slate-500",
        chip: "bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
      };
    case "Phase 1: fast.ai":
      return {
        text: "text-blue-700 dark:text-blue-300",
        bg: "bg-blue-50 dark:bg-blue-950/40",
        border: "border-blue-300 dark:border-blue-800",
        ring: "bg-blue-500",
        chip: "bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200",
      };
    case "Phase 2: Karpathy":
      return {
        text: "text-purple-700 dark:text-purple-300",
        bg: "bg-purple-50 dark:bg-purple-950/40",
        border: "border-purple-300 dark:border-purple-800",
        ring: "bg-purple-500",
        chip: "bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200",
      };
    case "Phase 3: Specialization":
      return {
        text: "text-emerald-700 dark:text-emerald-300",
        bg: "bg-emerald-50 dark:bg-emerald-950/40",
        border: "border-emerald-300 dark:border-emerald-800",
        ring: "bg-emerald-500",
        chip: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200",
      };
  }
}

export function statusColor(status: Problem["status"]): { dot: string; chip: string; label: string } {
  switch (status) {
    case "not_started":
      return { dot: "bg-gray-400", chip: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300", label: "Not started" };
    case "in_progress":
      return { dot: "bg-amber-500", chip: "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200", label: "In progress" };
    case "done":
      return { dot: "bg-emerald-500", chip: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200", label: "Done" };
    case "skipped":
      return { dot: "bg-red-500", chip: "bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-200", label: "Skipped" };
  }
}

export function currentWeekNumber(startDate: string | null): number | null {
  if (!startDate) return null;
  const today = todayIso();
  const diffDays = daysBetween(startDate, today);
  if (diffDays < 0) return null;
  const idx = Math.floor(diffDays / 7) + 1;
  if (idx < 1) return 1;
  if (idx > 12) return 12;
  return idx;
}

export function computeStreak(doneDates: string[]): number {
  if (doneDates.length === 0) return 0;
  const set = new Set(doneDates);
  let streak = 0;
  const today = new Date();
  for (let i = 0; ; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    if (set.has(iso)) {
      streak++;
    } else {
      // Allow today to be missing if no streak yet
      if (i === 0 && streak === 0) continue;
      break;
    }
  }
  return streak;
}

export function timeEstimateMinutes(weeks: Week[]): number {
  return weeks
    .flatMap((w) => w.topics.flatMap((t) => t.problems))
    .filter(problemDone)
    .reduce((sum, p) => sum + p.estimatedMinutes, 0);
}

export function timeActualMinutes(weeks: Week[]): number {
  return weeks
    .flatMap((w) => w.topics.flatMap((t) => t.problems))
    .reduce((sum, p) => sum + (p.actualMinutes ?? 0), 0);
}

export function overdueProblems(weeks: Week[], currentWeek: number | null): { week: Week; problem: Problem }[] {
  if (!currentWeek) return [];
  const out: { week: Week; problem: Problem }[] = [];
  for (const w of weeks) {
    if (w.number >= currentWeek) continue;
    for (const t of w.topics) {
      for (const p of t.problems) {
        if (p.status !== "done" && p.status !== "skipped") {
          out.push({ week: w, problem: p });
        }
      }
    }
  }
  return out;
}

export function gradedProblems(weeks: Week[]): { week: Week; topic: Topic; problem: Problem }[] {
  const out: { week: Week; topic: Topic; problem: Problem }[] = [];
  for (const w of weeks) {
    for (const t of w.topics) {
      for (const p of t.problems) {
        if (p.expectedScore !== undefined) out.push({ week: w, topic: t, problem: p });
      }
    }
  }
  return out;
}
