export type ProblemStatus = "not_started" | "in_progress" | "done" | "skipped";

export type ResourceType = "video" | "book" | "paper" | "repo" | "article";

export type Resource = {
  label: string;
  url: string;
  type: ResourceType;
};

export type Problem = {
  id: string;
  title: string;
  description: string;
  source: string;
  sourceUrl?: string;
  estimatedMinutes: number;
  expectedScore?: number;
  actualScore?: number;
  actualMinutes?: number;
  status: ProblemStatus;
  notes: string;
};

export type Topic = {
  id: string;
  title: string;
  summary: string;
  resources: Resource[];
  problems: Problem[];
};

export type Phase =
  | "Phase 0: Math Audit"
  | "Phase 1: fast.ai"
  | "Phase 2: Karpathy"
  | "Phase 3: Specialization";

export type WeeklyDeliverable = {
  title: string;
  description: string;
  rubric: string[];
  rubricChecked: boolean[];
  submitted: boolean;
  reflection: string;
  expectedScore?: number;
  actualScore?: number;
};

export type Week = {
  number: number;
  phase: Phase;
  title: string;
  goal: string;
  estimatedHours: number;
  topics: Topic[];
  weeklyDeliverable: WeeklyDeliverable;
  killCriterion: string;
};

export type AppState = {
  weeks: Week[];
  startDate: string | null;
  targetHoursPerWeek: number;
  doneDates: string[];
  version: number;
};
