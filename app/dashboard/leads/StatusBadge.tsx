import { Badge } from "@/components/ui/badge"

const statusStyles: Record<string, string> = {
  New: "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",
  Contacted: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
  Proposal: "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400",
  Closed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
  Lost: "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400",
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge 
      variant="outline"
      className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${statusStyles[status] ?? "bg-muted text-muted-foreground border-border"}`}
    >
      {status}
    </Badge>
  )
}

