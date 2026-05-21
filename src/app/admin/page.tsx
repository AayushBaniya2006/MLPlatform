"use client";

import { useRef, useState } from "react";
import { useStore } from "@/lib/store";
import { Hydrated } from "@/components/hydrated";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { gradedProblems } from "@/lib/progress";
import type { AppState, Problem, ProblemStatus } from "@/lib/types";
import { Download, Upload, AlertTriangle } from "lucide-react";

function AdminInner() {
  const weeks = useStore((s) => s.weeks);
  const startDate = useStore((s) => s.startDate);
  const targetHoursPerWeek = useStore((s) => s.targetHoursPerWeek);
  const doneDates = useStore((s) => s.doneDates);
  const version = useStore((s) => s.version);
  const setStartDate = useStore((s) => s.setStartDate);
  const setTargetHoursPerWeek = useStore((s) => s.setTargetHoursPerWeek);
  const setProblemStatus = useStore((s) => s.setProblemStatus);
  const setProblemScore = useStore((s) => s.setProblemScore);
  const setProblemActualMinutes = useStore((s) => s.setProblemActualMinutes);
  const importState = useStore((s) => s.importState);
  const resetAll = useStore((s) => s.resetAll);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const allProblems: { weekNum: number; problem: Problem }[] = weeks.flatMap((w) =>
    w.topics.flatMap((t) => t.problems.map((p) => ({ weekNum: w.number, problem: p })))
  );
  const graded = gradedProblems(weeks);

  function exportJson() {
    const snapshot = { weeks, startDate, targetHoursPerWeek, doneDates, version };
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ml-curriculum-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importJson(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as AppState;
        if (!parsed || !Array.isArray(parsed.weeks)) {
          alert("Invalid file: missing weeks array.");
          return;
        }
        importState(parsed);
        alert("State imported.");
      } catch (e) {
        alert("Failed to parse JSON: " + (e as Error).message);
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin</h1>
        <p className="text-sm text-muted-foreground mt-1">Configuration, manual overrides, and data import/export.</p>
      </div>

      <Tabs defaultValue="settings">
        <TabsList>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="overrides">Manual overrides</TabsTrigger>
          <TabsTrigger value="scores">Score entry</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Curriculum settings</CardTitle>
              <CardDescription>These drive the "current week" calculation and the dashboard target.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2 max-w-sm">
                <Label htmlFor="start-date">Start date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate ?? ""}
                  onChange={(e) => setStartDate(e.target.value || null)}
                />
              </div>
              <div className="grid gap-2 max-w-sm">
                <Label htmlFor="target-hours">Target hours per week</Label>
                <Input
                  id="target-hours"
                  type="number"
                  min={1}
                  max={80}
                  value={targetHoursPerWeek}
                  onChange={(e) => setTargetHoursPerWeek(Math.max(1, Number(e.target.value) || 1))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overrides">
          <Card>
            <CardHeader>
              <CardTitle>Manual problem override</CardTitle>
              <CardDescription>Force any problem's status without going through the curriculum view.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-h-[600px] overflow-y-auto rounded-md border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 sticky top-0">
                    <tr>
                      <th className="text-left px-3 py-2 font-medium">Week</th>
                      <th className="text-left px-3 py-2 font-medium">Problem</th>
                      <th className="text-left px-3 py-2 font-medium w-40">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProblems.map(({ weekNum, problem }) => (
                      <tr key={problem.id} className="border-t">
                        <td className="px-3 py-2 align-top text-muted-foreground">W{weekNum}</td>
                        <td className="px-3 py-2 align-top">
                          <p className="font-medium">{problem.title}</p>
                          <p className="text-xs text-muted-foreground">{problem.id}</p>
                        </td>
                        <td className="px-3 py-2 align-top">
                          <Select
                            value={problem.status}
                            onValueChange={(v) => setProblemStatus(problem.id, v as ProblemStatus)}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="not_started">Not started</SelectItem>
                              <SelectItem value="in_progress">In progress</SelectItem>
                              <SelectItem value="done">Done</SelectItem>
                              <SelectItem value="skipped">Skipped</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scores">
          <Card>
            <CardHeader>
              <CardTitle>Score entry</CardTitle>
              <CardDescription>All graded items (those with an expected score). Edit the actual score directly.</CardDescription>
            </CardHeader>
            <CardContent>
              {graded.length === 0 ? (
                <p className="text-sm text-muted-foreground">No graded items found.</p>
              ) : (
                <div className="max-h-[600px] overflow-y-auto rounded-md border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 sticky top-0">
                      <tr>
                        <th className="text-left px-3 py-2 font-medium">Week</th>
                        <th className="text-left px-3 py-2 font-medium">Problem</th>
                        <th className="text-left px-3 py-2 font-medium w-24">Expected</th>
                        <th className="text-left px-3 py-2 font-medium w-32">Actual</th>
                        <th className="text-left px-3 py-2 font-medium w-32">Actual minutes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {graded.map(({ week, problem }) => (
                        <tr key={problem.id} className="border-t">
                          <td className="px-3 py-2 align-top text-muted-foreground">W{week.number}</td>
                          <td className="px-3 py-2 align-top">{problem.title}</td>
                          <td className="px-3 py-2 align-top tabular-nums">{problem.expectedScore}</td>
                          <td className="px-3 py-2 align-top">
                            <Input
                              type="number"
                              min={0}
                              max={100}
                              className="h-8 w-24"
                              value={problem.actualScore ?? ""}
                              onChange={(e) => {
                                const v = e.target.value;
                                setProblemScore(problem.id, v === "" ? undefined : Math.max(0, Math.min(100, Number(v))));
                              }}
                            />
                          </td>
                          <td className="px-3 py-2 align-top">
                            <Input
                              type="number"
                              min={0}
                              className="h-8 w-24"
                              value={problem.actualMinutes ?? ""}
                              onChange={(e) => {
                                const v = e.target.value;
                                setProblemActualMinutes(problem.id, v === "" ? undefined : Math.max(0, Number(v)));
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Backup / restore</CardTitle>
                <CardDescription>Export your full state to JSON, or load a previous export.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button onClick={exportJson}>
                  <Download className="h-4 w-4 mr-2" />
                  Export JSON
                </Button>
                <Button variant="outline" onClick={() => fileRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  Import JSON
                </Button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="application/json"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) importJson(f);
                    e.target.value = "";
                  }}
                />
              </CardContent>
            </Card>

            <Card className="border-destructive/40 bg-destructive/[0.03]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Danger zone
                </CardTitle>
                <CardDescription>Reset wipes all progress, notes, scores, and the start date.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
                  Reset all progress
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset all progress?</DialogTitle>
            <DialogDescription>
              This will erase every problem status, note, score, rubric checkmark, reflection, and the start date.
              Your curriculum content is preserved. This cannot be undone — export first if you want a backup.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                resetAll();
                setConfirmOpen(false);
              }}
            >
              Yes, reset everything
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function Page() {
  return (
    <Hydrated fallback={<div className="text-sm text-muted-foreground">Loading…</div>}>
      <AdminInner />
    </Hydrated>
  );
}
