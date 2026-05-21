"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AppState, Problem, ProblemStatus, Week } from "./types";
import { weeks as seedWeeks, CURRENT_VERSION } from "@/data/curriculum";
import { todayIso } from "./utils";

const STORAGE_KEY = "ml-curriculum-v1";

type Actions = {
  setStartDate: (iso: string | null) => void;
  setTargetHoursPerWeek: (n: number) => void;
  updateProblem: (problemId: string, patch: Partial<Problem>) => void;
  setProblemStatus: (problemId: string, status: ProblemStatus) => void;
  setProblemNotes: (problemId: string, notes: string) => void;
  setProblemScore: (problemId: string, score: number | undefined) => void;
  setProblemActualMinutes: (problemId: string, minutes: number | undefined) => void;
  toggleRubric: (weekNumber: number, index: number) => void;
  setReflection: (weekNumber: number, reflection: string) => void;
  submitDeliverable: (weekNumber: number) => void;
  unsubmitDeliverable: (weekNumber: number) => void;
  importState: (state: AppState) => void;
  resetAll: () => void;
};

type Store = AppState & Actions;

function findProblem(weeks: Week[], problemId: string): { week: Week; problem: Problem } | null {
  for (const w of weeks) {
    for (const t of w.topics) {
      for (const p of t.problems) {
        if (p.id === problemId) return { week: w, problem: p };
      }
    }
  }
  return null;
}

function deepClone<T>(x: T): T {
  return JSON.parse(JSON.stringify(x));
}

const initialState: AppState = {
  weeks: deepClone(seedWeeks),
  startDate: null,
  targetHoursPerWeek: 30,
  doneDates: [],
  version: CURRENT_VERSION,
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      ...initialState,

      setStartDate: (iso) => set({ startDate: iso }),
      setTargetHoursPerWeek: (n) => set({ targetHoursPerWeek: n }),

      updateProblem: (problemId, patch) =>
        set((s) => {
          const weeks = deepClone(s.weeks);
          const found = findProblem(weeks, problemId);
          if (!found) return s;
          Object.assign(found.problem, patch);
          return { weeks };
        }),

      setProblemStatus: (problemId, status) =>
        set((s) => {
          const weeks = deepClone(s.weeks);
          const found = findProblem(weeks, problemId);
          if (!found) return s;
          const wasDone = found.problem.status === "done";
          found.problem.status = status;
          let doneDates = s.doneDates;
          if (status === "done" && !wasDone) {
            const today = todayIso();
            if (!doneDates.includes(today)) doneDates = [...doneDates, today];
          }
          return { weeks, doneDates };
        }),

      setProblemNotes: (problemId, notes) =>
        set((s) => {
          const weeks = deepClone(s.weeks);
          const found = findProblem(weeks, problemId);
          if (!found) return s;
          found.problem.notes = notes;
          return { weeks };
        }),

      setProblemScore: (problemId, score) =>
        set((s) => {
          const weeks = deepClone(s.weeks);
          const found = findProblem(weeks, problemId);
          if (!found) return s;
          found.problem.actualScore = score;
          return { weeks };
        }),

      setProblemActualMinutes: (problemId, minutes) =>
        set((s) => {
          const weeks = deepClone(s.weeks);
          const found = findProblem(weeks, problemId);
          if (!found) return s;
          found.problem.actualMinutes = minutes;
          return { weeks };
        }),

      toggleRubric: (weekNumber, index) =>
        set((s) => {
          const weeks = deepClone(s.weeks);
          const w = weeks.find((x) => x.number === weekNumber);
          if (!w) return s;
          w.weeklyDeliverable.rubricChecked[index] = !w.weeklyDeliverable.rubricChecked[index];
          return { weeks };
        }),

      setReflection: (weekNumber, reflection) =>
        set((s) => {
          const weeks = deepClone(s.weeks);
          const w = weeks.find((x) => x.number === weekNumber);
          if (!w) return s;
          w.weeklyDeliverable.reflection = reflection;
          return { weeks };
        }),

      submitDeliverable: (weekNumber) =>
        set((s) => {
          const weeks = deepClone(s.weeks);
          const w = weeks.find((x) => x.number === weekNumber);
          if (!w) return s;
          const allChecked = w.weeklyDeliverable.rubricChecked.every(Boolean);
          const hasReflection = w.weeklyDeliverable.reflection.trim().length > 0;
          if (!allChecked || !hasReflection) return s;
          w.weeklyDeliverable.submitted = true;
          return { weeks };
        }),

      unsubmitDeliverable: (weekNumber) =>
        set((s) => {
          const weeks = deepClone(s.weeks);
          const w = weeks.find((x) => x.number === weekNumber);
          if (!w) return s;
          w.weeklyDeliverable.submitted = false;
          return { weeks };
        }),

      importState: (incoming) =>
        set((s) => ({
          weeks: Array.isArray(incoming.weeks) ? incoming.weeks : s.weeks,
          startDate: typeof incoming.startDate === "string" || incoming.startDate === null ? incoming.startDate : s.startDate,
          targetHoursPerWeek:
            typeof incoming.targetHoursPerWeek === "number" && incoming.targetHoursPerWeek > 0
              ? incoming.targetHoursPerWeek
              : s.targetHoursPerWeek,
          doneDates: Array.isArray(incoming.doneDates) ? incoming.doneDates : s.doneDates,
          version: typeof incoming.version === "number" ? incoming.version : s.version,
        })),

      resetAll: () => set({ ...initialState, weeks: deepClone(seedWeeks) }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      version: CURRENT_VERSION,
      partialize: (state) => ({
        weeks: state.weeks,
        startDate: state.startDate,
        targetHoursPerWeek: state.targetHoursPerWeek,
        doneDates: state.doneDates,
        version: state.version,
      }),
      migrate: (persistedState) => {
        const ps = (persistedState ?? {}) as Partial<AppState>;
        // Always start from the current seed (so curriculum content updates land),
        // then re-graft any user progress that matches by problem id and by week number.
        const fresh = deepClone(seedWeeks);
        if (Array.isArray(ps.weeks)) {
          const oldProblems = new Map<string, Problem>();
          const oldDeliverables = new Map<number, Week["weeklyDeliverable"]>();
          for (const w of ps.weeks as Week[]) {
            if (w && typeof w.number === "number" && w.weeklyDeliverable) {
              oldDeliverables.set(w.number, w.weeklyDeliverable);
            }
            for (const t of w?.topics ?? []) {
              for (const p of t?.problems ?? []) {
                if (p && p.id) oldProblems.set(p.id, p);
              }
            }
          }
          for (const w of fresh) {
            for (const t of w.topics) {
              for (const p of t.problems) {
                const old = oldProblems.get(p.id);
                if (old) {
                  p.status = old.status ?? p.status;
                  p.notes = old.notes ?? p.notes;
                  p.actualScore = old.actualScore;
                  p.actualMinutes = old.actualMinutes;
                }
              }
            }
            const oldDel = oldDeliverables.get(w.number);
            if (oldDel && Array.isArray(oldDel.rubric) && oldDel.rubric.join("|") === w.weeklyDeliverable.rubric.join("|")) {
              w.weeklyDeliverable.rubricChecked = oldDel.rubricChecked ?? w.weeklyDeliverable.rubricChecked;
              w.weeklyDeliverable.reflection = oldDel.reflection ?? w.weeklyDeliverable.reflection;
              w.weeklyDeliverable.submitted = oldDel.submitted ?? w.weeklyDeliverable.submitted;
              w.weeklyDeliverable.actualScore = oldDel.actualScore;
            }
          }
        }
        return {
          weeks: fresh,
          startDate: typeof ps.startDate === "string" ? ps.startDate : null,
          targetHoursPerWeek: typeof ps.targetHoursPerWeek === "number" ? ps.targetHoursPerWeek : 30,
          doneDates: Array.isArray(ps.doneDates) ? ps.doneDates : [],
          version: CURRENT_VERSION,
        } as AppState;
      },
      merge: (persisted, current) => ({ ...current, ...(persisted as Partial<AppState>) }),
    }
  )
);
