import type { Resource } from "@/lib/types";
import { BookOpen, FileText, GitBranch, PlayCircle, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = {
  video: PlayCircle,
  book: BookOpen,
  paper: FileText,
  repo: GitBranch,
  article: Newspaper,
};

export function ResourceChip({ resource }: { resource: Resource }) {
  const Icon = ICONS[resource.type];
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        "bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{resource.label}</span>
    </a>
  );
}
