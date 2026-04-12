"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Inbox, ChevronLeft, ChevronRight } from "lucide-react"
import { LeadRow, type LeadRecord } from "./LeadRow"

interface LeadTableProps {
  leads: LeadRecord[]
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function LeadTable({ leads, page, totalPages, onPageChange }: LeadTableProps) {
  if (!leads.length) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card p-12 text-center shadow-sm">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-muted text-muted-foreground">
          <Inbox className="size-10" />
        </div>
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground">No leads found</h2>
        <p className="mt-2 max-w-xs text-muted-foreground">
          We couldn't find any leads matching your current filters. Try adjusting your search or add a new lead.
        </p>
        <Button size="lg" className="mt-8 rounded-xl px-8 shadow-lg">
          Add New Lead
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border bg-muted/30 hover:bg-muted/30">
              <TableHead className="h-14 px-6 font-bold text-foreground">Name</TableHead>
              <TableHead className="h-14 px-6 font-bold text-foreground">Phone</TableHead>
              <TableHead className="h-14 px-6 font-bold text-foreground">Source</TableHead>
              <TableHead className="h-14 px-6 font-bold text-foreground">Status</TableHead>
              <TableHead className="h-14 px-6 font-bold text-foreground">Budget</TableHead>
              <TableHead className="h-14 px-6 font-bold text-foreground">Owner</TableHead>
              <TableHead className="h-14 px-6 font-bold text-foreground">Contacted</TableHead>
              <TableHead className="h-14 px-6 text-right font-bold text-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <LeadRow key={lead.id} lead={lead} />
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-4 border-t border-border bg-muted/20 p-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm font-medium text-muted-foreground">
          Showing <span className="text-foreground">{leads.length}</span> of <span className="text-foreground">{leads.length}</span> results
        </p>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9 rounded-lg border-border"
            disabled={page === 1} 
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeft className="mr-1 size-4" />
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                variant={page === index + 1 ? "default" : "ghost"}
                size="icon"
                className="h-9 w-9 rounded-lg transition-all"
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9 rounded-lg border-border"
            disabled={page === totalPages} 
            onClick={() => onPageChange(page + 1)}
          >
            Next
            <ChevronRight className="ml-1 size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

