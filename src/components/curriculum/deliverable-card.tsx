"use client";

import type { Week } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { Award, CheckCircle2 } from "lucide-react";

export function DeliverableCard({ week }: { week: Week }) {
  const d = week.weeklyDeliverable;
  const toggleRubric = useStore((s) => s.toggleRubric);
  const setReflection = useStore((s) => s.setReflection);
  const submit = useStore((s) => s.submitDeliverable);
  const unsubmit = useStore((s) => s.unsubmitDeliverable);

  const allChecked = d.rubricChecked.every(Boolean);
  const hasReflection = d.reflection.trim().length > 0;
  const canSubmit = allChecked && hasReflection && !d.submitted;
  const checkedCount = d.rubricChecked.filter(Boolean).length;

  return (
    <Card className="border-amber-300 dark:border-amber-700/60 bg-amber-50/50 dark:bg-amber-950/20 ring-1 ring-amber-200/60 dark:ring-amber-900/40">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-start gap-3">
            <Award className="h-5 w-5 mt-1 text-amber-600 dark:text-amber-400" />
            <div>
              <Badge variant="outline" className="mb-2 border-amber-400 text-amber-700 dark:text-amber-300">
                DELIVERABLE
              </Badge>
              <CardTitle className="text-lg">{d.title}</CardTitle>
              <CardDescription className="mt-1">
                {checkedCount}/{d.rubric.length} rubric items checked
                {d.expectedScore !== undefined && (
                  <>
                    {" · "}
                    <span className="font-medium">Expected: {d.expectedScore}</span>
                  </>
                )}
                {d.actualScore !== undefined && (
                  <>
                    {" · "}
                    <span className="font-medium text-foreground">Actual: {d.actualScore}</span>
                  </>
                )}
              </CardDescription>
            </div>
          </div>
          {d.submitted && (
            <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white shrink-0">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
              Submitted
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed">{d.description}</p>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rubric</p>
          <div className="space-y-2">
            {d.rubric.map((item, idx) => (
              <label key={idx} className="flex items-start gap-2.5 text-sm cursor-pointer">
                <Checkbox
                  className="mt-0.5"
                  checked={d.rubricChecked[idx]}
                  onCheckedChange={() => toggleRubric(week.number, idx)}
                />
                <span className={d.rubricChecked[idx] ? "line-through text-muted-foreground" : ""}>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Reflection</p>
          <Textarea
            value={d.reflection}
            onChange={(e) => setReflection(week.number, e.target.value)}
            rows={4}
            placeholder="What did you build, what did you learn, what would you do differently?"
            className="bg-background"
          />
        </div>

        <div className="flex items-center gap-2">
          {d.submitted ? (
            <Button variant="outline" onClick={() => unsubmit(week.number)}>
              Unmark submitted
            </Button>
          ) : (
            <Button onClick={() => submit(week.number)} disabled={!canSubmit}>
              Mark submitted
            </Button>
          )}
          {!d.submitted && !canSubmit && (
            <p className="text-xs text-muted-foreground">
              {!allChecked && "Check all rubric items"}
              {!allChecked && !hasReflection && " and "}
              {!hasReflection && "write a reflection"}
              {" to submit."}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
