"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { MessageSquare, Phone, MoreHorizontal, Eye, Pencil } from "lucide-react"
import { StatusBadge } from "./StatusBadge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface LeadRecord {
  id: string
  name: string
  email: string
  phone: string
  company?: string
  source: string
  status: string
  budget: string // Keep for UI, but backend uses 'value'
  value?: number
  assignedTo: string
  lastContact: string
  notes?: string
}

interface LeadRowProps {
  lead: LeadRecord
}

export function LeadRow({ lead }: LeadRowProps) {
  return (
    <TableRow className="group border-b border-border bg-card transition-colors hover:bg-muted/30">
      <TableCell className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-base font-bold text-foreground">{lead.name}</span>
          <span className="text-xs text-muted-foreground">ID: {lead.id}</span>
        </div>
      </TableCell>
      <TableCell className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Phone className="size-3 text-muted-foreground" />
          {lead.phone}
        </div>
      </TableCell>
      <TableCell className="px-6 py-4">
        <span className="inline-flex rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
          {lead.source}
        </span>
      </TableCell>
      <TableCell className="px-6 py-4">
        <StatusBadge status={lead.status} />
      </TableCell>
      <TableCell className="px-6 py-4">
        <span className="text-sm font-semibold text-foreground">{lead.budget}</span>
      </TableCell>
      <TableCell className="px-6 py-4 text-sm text-foreground">{lead.assignedTo}</TableCell>
      <TableCell className="px-6 py-4 text-sm text-muted-foreground">{lead.lastContact}</TableCell>
      <TableCell className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2 transition-opacity md:opacity-0 md:group-hover:opacity-100">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg" title="Quick View">
            <Eye className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg" title="Send Message">
            <MessageSquare className="size-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-lg cursor-pointer">
                <Pencil className="mr-2 size-4" /> Edit Details
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg cursor-pointer">
                <Phone className="mr-2 size-4" /> Call Lead
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg cursor-pointer text-destructive focus:text-destructive">
                Remove Lead
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  )
}

