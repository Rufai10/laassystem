"use client"

import { Pipeline, initialDeals, type Deal } from "@/components/pipeline"
import { motion } from "framer-motion"
import { LayoutGrid, Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { AddDealModal } from "./AddDealModal"
import { fetchLeads, updateLead } from "@/lib/api"
import { toast } from "sonner"

export default function PipelinePage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const getDeals = async () => {
      try {
        setLoading(true)
        const data = await fetchLeads()
        const mappedDeals: Deal[] = data.map((l: any) => ({
          id: l.id,
          title: l.name,
          company: l.company || "Individual",
          amount: l.value ? `$${l.value.toLocaleString()}` : "$0",
          dueDate: new Date(l.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          owner: l.assignedTo?.name || "Unassigned",
          priority: "Medium", // Optional: add to schema if needed
          columnId: l.status || "New",
        }))
        setDeals(mappedDeals)
      } catch (error) {
        console.error(error)
        toast.error("Connected to local simulation. Real database fetch failed.")
      } finally {
        setLoading(false)
      }
    }
    getDeals()
  }, [])

  const handleAddDeal = (newDeal: Deal) => {
    setDeals(prev => [newDeal, ...prev])
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateLead(id, { status: newStatus })
      toast.success(`Deal status updated to ${newStatus}`)
    } catch (error: any) {
      toast.error(error.message || "Failed to update status in database")
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-8 bg-background/95 px-4 py-8 md:px-8 lg:px-12">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <LayoutGrid className="size-5 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Sales Pipeline</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Deals Pipeline
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your sales stages and track deal progress visually.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            size="lg" 
            onClick={() => setModalOpen(true)}
            className="h-12 rounded-xl bg-primary px-6 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
          >
            <Plus className="mr-2 size-5" />
            New Deal
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-1"
      >
        {loading ? (
          <div className="flex h-[400px] w-full items-center justify-center">
            <Loader2 className="size-10 animate-spin text-primary" />
          </div>
        ) : (
          <Pipeline deals={deals} onDealsChange={setDeals} onStatusChange={handleStatusChange} />
        )}
      </motion.div>

      <AddDealModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onAdd={handleAddDeal} 
      />
    </div>
  )
}

