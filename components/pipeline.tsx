"use client"

import { useState } from "react"
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Calendar, DollarSign, User, GripVertical } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// --- Types ---
export interface Deal {
  id: string
  title: string
  company: string
  amount: string
  dueDate: string
  owner: string
  priority: "Low" | "Medium" | "High"
  columnId: string
}

interface Column {
  id: string
  title: string
  deals: Deal[]
}

// --- Initial Data ---
export const initialDeals: Deal[] = [
  { id: "1", title: "Modern Villa Design", company: "Hassan Group", amount: "$450,000", dueDate: "Apr 25", owner: "Eng. Ali", priority: "High", columnId: "new" },
  { id: "2", title: "Office Renovation", company: "Star Tech", amount: "$85,000", dueDate: "May 2", owner: "Arch. Amal", priority: "Medium", columnId: "new" },
  { id: "3", title: "Luxury Apartment Sale", company: "Som Real Estate", amount: "$230,000", dueDate: "Apr 20", owner: "Eng. Ali", priority: "High", columnId: "contacted" },
  { id: "4", title: "Warehouse Design", company: "Global Logistics", amount: "$120,000", dueDate: "Jun 10", owner: "Arch. Omar", priority: "Low", columnId: "proposal" },
  { id: "5", title: "Residential Complex", company: "Civic Engineering", amount: "$3.5M", dueDate: "Dec 30", owner: "Eng. Ali", priority: "High", columnId: "negotiation" },
  { id: "6", title: "School Extension", company: "City Council", amount: "$560,000", dueDate: "Jun 15", owner: "Arch. Amal", priority: "Medium", columnId: "closed" },
]


const COLUMNS: { id: string; title: string }[] = [
  { id: "new", title: "New Lead" },
  { id: "contacted", title: "Contacted" },
  { id: "proposal", title: "Proposal" },
  { id: "negotiation", title: "Negotiation" },
  { id: "closed", title: "Closed" },
]

// --- Components ---

function DealCard({ deal, isOverlay = false }: { deal: Deal, isOverlay?: boolean }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: deal.id,
    data: {
      type: "Deal",
      deal,
    },
  })

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  }

  const priorityColors = {
    High: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    Medium: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    Low: "bg-slate-500/10 text-slate-600 border-slate-500/20",
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`relative p-4 shadow-sm transition-all hover:shadow-md ${isDragging ? "opacity-30 border-primary" : "border-border bg-card"} ${isOverlay ? "rotate-3 shadow-xl ring-1 ring-primary cursor-grabbing" : "cursor-grab"}`}
      {...attributes}
      {...listeners}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="outline" className={`rounded-full px-2 py-0 text-[10px] font-bold ${priorityColors[deal.priority]}`}>
            {deal.priority}
          </Badge>
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-lg opacity-0 group-hover:opacity-100">
            <MoreHorizontal className="size-3" />
          </Button>
        </div>
        
        <div className="space-y-1">
          <h4 className="line-clamp-1 font-bold text-foreground">{deal.title}</h4>
          <p className="text-xs text-muted-foreground">{deal.company}</p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
            <DollarSign className="size-3" />
            {deal.amount}
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
            <Calendar className="size-3" />
            {deal.dueDate}
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-border pt-3">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-bold">
            {deal.owner[0]}
          </div>
          <span className="text-[10px] font-medium text-muted-foreground">{deal.owner}</span>
        </div>
      </div>
    </Card>
  )
}

function PipelineColumn({ column, deals }: { column: { id: string; title: string }; deals: Deal[] }) {
  const { setNodeRef } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  })

  const columnAmount = deals.reduce((acc, deal) => {
    const val = parseFloat(deal.amount.replace(/[^0-9.]/g, ""))
    const multiplier = deal.amount.includes("M") ? 1000000 : 1
    return acc + (isNaN(val) ? 0 : val * multiplier)
  }, 0)

  const formattedTotal = columnAmount >= 1000000 
    ? `$${(columnAmount / 1000000).toFixed(1)}M` 
    : `$${(columnAmount / 1000).toFixed(0)}K`

  return (
    <div className="flex h-full min-w-[280px] max-w-[320px] flex-col gap-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold tracking-tight text-foreground uppercase">{column.title}</h3>
          <Badge variant="secondary" className="rounded-full h-5 px-1.5 text-[10px] font-bold">
            {deals.length}
          </Badge>
        </div>
        <span className="text-xs font-bold text-muted-foreground">{formattedTotal}</span>
      </div>

      <div 
        ref={setNodeRef}
        className="flex flex-1 flex-col gap-3 rounded-2xl bg-muted/40 p-3 ring-1 ring-border shadow-inner min-h-[300px]"
      >
        <SortableContext items={deals.map(d => d.id)} strategy={verticalListSortingStrategy}>
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}

interface PipelineProps {
  deals: Deal[]
  onDealsChange: (deals: Deal[]) => void
}

export function Pipeline({ deals, onDealsChange }: PipelineProps) {
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Deal") {
      setActiveDeal(event.active.data.current.deal)
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveADeal = active.data.current?.type === "Deal"
    const isOverADeal = over.data.current?.type === "Deal"

    if (!isActiveADeal) return

    // Dropping a Deal over another Deal
    if (isActiveADeal && isOverADeal) {
      const activeIndex = deals.findIndex((d) => d.id === activeId)
      const overIndex = deals.findIndex((d) => d.id === overId)

      if (deals[activeIndex].columnId !== deals[overIndex].columnId) {
        const newDeals = [...deals]
        newDeals[activeIndex].columnId = deals[overIndex].columnId
        onDealsChange(arrayMove(newDeals, activeIndex, overIndex - 1))
        return
      }

      onDealsChange(arrayMove(deals, activeIndex, overIndex))
    }

    // Dropping a Deal over a Column
    const isOverAColumn = over.data.current?.type === "Column"
    if (isActiveADeal && isOverAColumn) {
      const activeIndex = deals.findIndex((d) => d.id === activeId)
      const newDeals = [...deals]
      newDeals[activeIndex].columnId = overId as string
      onDealsChange(arrayMove(newDeals, activeIndex, activeIndex))
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveDeal(null)
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveADeal = active.data.current?.type === "Deal"
    const isOverADeal = over.data.current?.type === "Deal"

    if (isActiveADeal && isOverADeal) {
      const activeIndex = deals.findIndex((d) => d.id === activeId)
      const overIndex = deals.findIndex((d) => d.id === overId)
      onDealsChange(arrayMove(deals, activeIndex, overIndex))
    }
  }

  return (
    <div className="flex h-[calc(100vh-280px)] w-full overflow-hidden">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <div className="flex h-full w-full gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-thin scrollbar-thumb-border">
          {COLUMNS.map((column) => (
            <PipelineColumn
              key={column.id}
              column={column}
              deals={deals.filter((d) => d.columnId === column.id)}
            />
          ))}
        </div>

        <DragOverlay dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: "0.5",
              },
            },
          }),
        }}>
          {activeDeal ? <DealCard deal={activeDeal} isOverlay /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}