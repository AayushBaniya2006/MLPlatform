"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { todayIso } from "@/lib/utils";
import { prerequisites } from "@/data/curriculum";
import { CheckCircle2 } from "lucide-react";

export function StartDatePrompt() {
  const startDate = useStore((s) => s.startDate);
  const setStartDate = useStore((s) => s.setStartDate);
  const [draft, setDraft] = useState<string>(todayIso());

  if (startDate) return null;

  return (
    <div className="container mx-auto max-w-2xl py-10 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Before you begin — prerequisites</CardTitle>
          <CardDescription>
            What you should have in place before Week 1. Setup gaps you don&apos;t close now will compound by Week 2.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2.5">
            {prerequisites.map((p, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-emerald-500" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Set your start date</CardTitle>
          <CardDescription>
            This is the day Week 1 begins. The dashboard uses it to compute which week you&apos;re currently in.
            You can change it any time in Admin.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="start-date">Start date</Label>
            <Input id="start-date" type="date" value={draft} onChange={(e) => setDraft(e.target.value)} />
          </div>
          <Button onClick={() => setStartDate(draft)}>Begin the 12 weeks</Button>
        </CardContent>
      </Card>
    </div>
  );
}
