"use client"

import { Pipeline, initialDeals, type Deal } from "@/components/pipeline"
import { motion } from "framer-motion"
import { LayoutGrid, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { AddDealModal } from "./AddDealModal"

export default function PipelinePage() {
  const [deals, setDeals] = useState<Deal[]>(initialDeals)
  const [modalOpen, setModalOpen] = useState(false)

  const handleAddDeal = (newDeal: Deal) => {
    setDeals(prev => [newDeal, ...prev])
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
        <Pipeline deals={deals} onDealsChange={setDeals} />
      </motion.div>

      <AddDealModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onAdd={handleAddDeal} 
      />
    </div>
  )
}

