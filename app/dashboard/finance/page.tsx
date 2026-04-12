"use client"

import { Finance, recentInvoices } from "@/components/finance"
import { motion } from "framer-motion"
import { DollarSign, Download, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FinancePage() {
  const handleExport = () => {
    // CSV Header
    const headers = ["Invoice ID", "Client", "Project", "Amount", "Status", "Date"]
    
    // CSV Rows
    const rows = recentInvoices.map(inv => [
      inv.id,
      inv.client,
      inv.project,
      inv.amount.replace(",", ""), // remove comma for clean CSV
      inv.status,
      inv.date
    ])

    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n")

    // Create BLOB and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `LAAS_Finance_Report_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
            <DollarSign className="size-5 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Financial Overview</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Finance & ROI
          </h1>
          <p className="text-lg text-muted-foreground">
            Track revenue, invoices, and project budgets for LAAS.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="lg" className="h-12 rounded-xl border-border bg-card px-6">
            <Calendar className="mr-2 size-5" />
            Last 30 Days
          </Button>
          <Button 
            size="lg" 
            onClick={handleExport}
            className="h-12 rounded-xl bg-primary px-6 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
          >
            <Download className="mr-2 size-5" />
            Export Report
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-1"
      >
        <Finance />
      </motion.div>
    </div>
  )
}

