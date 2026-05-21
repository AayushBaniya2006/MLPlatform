import { AlertTriangle } from "lucide-react";

export function KillCriterion({ text }: { text: string }) {
  return (
    <div className="rounded-md border-l-4 border-red-500 bg-red-50 dark:bg-red-950/30 dark:border-red-700 p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0 text-red-600 dark:text-red-400" />
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-red-700 dark:text-red-300">
            Kill criterion
          </p>
          <p className="text-sm leading-relaxed text-red-900 dark:text-red-100">{text}</p>
        </div>
      </div>
    </div>
  );
}
