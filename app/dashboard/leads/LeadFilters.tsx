"use client"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

interface LeadFiltersProps {
  search: string
  status: string
  source: string
  onSearch: (value: string) => void
  onStatusChange: (value: string) => void
  onSourceChange: (value: string) => void
}

export function LeadFilters({
  search,
  status,
  source,
  onSearch,
  onStatusChange,
  onSourceChange,
}: LeadFiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm lg:flex-row lg:items-center">
      <div className="flex flex-1 items-center gap-3 rounded-2xl border border-border bg-muted/30 px-4 py-3 transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
        <Search className="size-5 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search by name, phone, or owner..."
          className="h-auto border-none bg-transparent p-0 text-base placeholder:text-muted-foreground focus-visible:ring-0"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-1.5">
          <Filter className="size-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Filters:</span>
        </div>
        
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="h-12 w-full rounded-2xl border-border bg-card lg:w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Contacted">Contacted</SelectItem>
            <SelectItem value="Proposal">Proposal</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
            <SelectItem value="Lost">Lost</SelectItem>
          </SelectContent>
        </Select>

        <Select value={source} onValueChange={onSourceChange}>
          <SelectTrigger className="h-12 w-full rounded-2xl border-border bg-card lg:w-[160px]">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Sources</SelectItem>
            <SelectItem value="Website">Website</SelectItem>
            <SelectItem value="Referral">Referral</SelectItem>
            <SelectItem value="Email">Email</SelectItem>
            <SelectItem value="Conference">Conference</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

