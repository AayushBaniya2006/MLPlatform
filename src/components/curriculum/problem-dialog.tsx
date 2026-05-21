"use client";

import { useState, useEffect } from "react";
import type { Problem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/lib/store";
import { ExternalLink } from "lucide-react";

export function ProblemDialog({
  problem,
  open,
  onOpenChange,
}: {
  problem: Problem;
  open: boolean;
  onOpenChange: (b: boolean) => void;
}) {
  const setProblemNotes = useStore((s) => s.setProblemNotes);
  const setProblemScore = useStore((s) => s.setProblemScore);
  const setProblemActualMinutes = useStore((s) => s.setProblemActualMinutes);

  const [notes, setNotes] = useState(problem.notes);
  const [score, setScore] = useState<string>(problem.actualScore?.toString() ?? "");
  const [mins, setMins] = useState<string>(problem.actualMinutes?.toString() ?? "");

  useEffect(() => {
    setNotes(problem.notes);
    setScore(problem.actualScore?.toString() ?? "");
    setMins(problem.actualMinutes?.toString() ?? "");
  }, [problem.id, problem.notes, problem.actualScore, problem.actualMinutes]);

  function save() {
    setProblemNotes(problem.id, notes);
    const parsedScore = score.trim() === "" ? undefined : Math.max(0, Math.min(100, Number(score)));
    setProblemScore(problem.id, Number.isFinite(parsedScore as number) ? (parsedScore as number) : undefined);
    const parsedMins = mins.trim() === "" ? undefined : Math.max(0, Number(mins));
    setProblemActualMinutes(problem.id, Number.isFinite(parsedMins as number) ? (parsedMins as number) : undefined);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{problem.title}</DialogTitle>
          <DialogDescription>
            <span className="font-medium">Source:</span> {problem.source}
            {problem.sourceUrl && (
              <a
                href={problem.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 inline-flex items-center gap-1 text-primary hover:underline"
              >
                Open <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</p>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{problem.description}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Your notes / reflection</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={6}
            placeholder="Capture what you learned, what surprised you, what's still unclear."
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {problem.expectedScore !== undefined && (
            <div className="space-y-2">
              <Label htmlFor="score">
                Actual score{" "}
                <span className="text-muted-foreground font-normal">(expected: {problem.expectedScore})</span>
              </Label>
              <Input id="score" type="number" min={0} max={100} value={score} onChange={(e) => setScore(e.target.value)} />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="actual-mins">
              Actual minutes <span className="text-muted-foreground font-normal">(est: {problem.estimatedMinutes})</span>
            </Label>
            <Input id="actual-mins" type="number" min={0} value={mins} onChange={(e) => setMins(e.target.value)} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={save}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
