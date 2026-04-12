"use client"

import { Reports, analyticsOverview, projectDistribution } from "@/components/reports"
import { motion } from "framer-motion"
import { BarChart3, FileDown, Filter, FileSpreadsheet } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ReportsPage() {
  const handleExportExcel = () => {
    const headers = ["Metric", "Value", "Growth", "Note"]
    const rows = analyticsOverview.map(kpi => [
      kpi.title,
      kpi.value,
      kpi.change,
      kpi.description
    ])

    // Include distribution in same sheet
    const distHeader = ["", "", "", ""] // Spacer
    const distDataHeader = ["Project Category", "Count", "Percentage", "Status"]
    const distRows = projectDistribution.map(p => [
      p.category,
      p.count.toString(),
      `${p.percentage}%`,
      "Active"
    ])

    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.join(",")),
      distHeader.join(","),
      distDataHeader.join(","),
      ...distRows.map(r => r.join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `LAAS_Business_Report_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleGeneratePDF = () => {
    // Basic approach: window.print()
    // For a real PDF we would use jspdf or a print-specific CSS layout.
    // For now, let's trigger the browser's print dialog.
    window.print()
  }

  return (
    <div className="flex flex-1 flex-col gap-8 bg-background/95 px-4 py-8 md:px-8 lg:px-12 print:p-0 print:bg-white">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between print:mb-12"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="size-5 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Analytics & Insight</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Business Reports
          </h1>
          <p className="text-lg text-muted-foreground">
            Analyze project performance, lead conversions, and team productivity.
          </p>
        </div>
        <div className="flex items-center gap-3 print:hidden">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleExportExcel}
            className="h-12 rounded-xl border-border bg-card px-6 hover:bg-muted"
          >
            <FileSpreadsheet className="mr-2 size-5 text-emerald-600" />
            Excel
          </Button>
          <Button 
            size="lg" 
            onClick={handleGeneratePDF}
            className="h-12 rounded-xl bg-primary px-6 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
          >
            <FileDown className="mr-2 size-5" />
            Generate PDF
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-1"
      >
        <Reports />
      </motion.div>

      {/* Print-only Footer */}
      <div className="hidden print:block mt-12 pt-8 border-t border-slate-200 text-center text-xs text-muted-foreground">
        <p>© 2026 LAAS Architects & Engineers. All rights reserved.</p>
        <p>Report generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  )
}


