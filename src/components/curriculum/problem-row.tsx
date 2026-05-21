"use client";

import { useState } from "react";
import type { Problem, ProblemStatus } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStore } from "@/lib/store";
import { statusColor } from "@/lib/progress";
import { formatMinutes, cn } from "@/lib/utils";
import { ProblemDialog } from "./problem-dialog";
import { FileText } from "lucide-react";

export function ProblemRow({ problem }: { problem: Problem }) {
  const setStatus = useStore((s) => s.setProblemStatus);
  const [open, setOpen] = useState(false);
  const c = statusColor(problem.status);
  const checked = problem.status === "done";
  const hasNotes = problem.notes.trim().length > 0;

  return (
    <div className="flex items-start gap-3 rounded-md border bg-background p-3 hover:bg-accent/30 transition-colors">
      <Checkbox
        className="mt-1"
        checked={checked}
        onCheckedChange={(v) => setStatus(problem.id, v ? "done" : "not_started")}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="min-w-0">
            <p className={cn("text-sm font-medium leading-snug", checked && "line-through text-muted-foreground")}>
              {problem.title}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
              <span>{problem.source}</span>
              <span>·</span>
              <span>{formatMinutes(problem.estimatedMinutes)}</span>
              {problem.expectedScore !== undefined && (
                <>
                  <span>·</span>
                  <span>Expected score: {problem.expectedScore}</span>
                </>
              )}
              {problem.actualScore !== undefined && (
                <>
                  <span>·</span>
                  <span className="font-medium text-foreground">Actual: {problem.actualScore}</span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Select value={problem.status} onValueChange={(v) => setStatus(problem.id, v as ProblemStatus)}>
              <SelectTrigger className={cn("h-8 w-[140px] text-xs", c.chip, "border-0")}>
                <span className={cn("mr-2 inline-block h-2 w-2 rounded-full", c.dot)} />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not_started">Not started</SelectItem>
                <SelectItem value="in_progress">In progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
                <SelectItem value="skipped">Skipped</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
              <FileText className={cn("h-3.5 w-3.5", hasNotes && "text-amber-500")} />
              <span className="ml-1">Details</span>
            </Button>
          </div>
        </div>
      </div>
      <ProblemDialog problem={problem} open={open} onOpenChange={setOpen} />
    </div>
  );
}
