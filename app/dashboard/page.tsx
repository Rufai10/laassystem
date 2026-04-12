"use client"

import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { WelcomeBanner } from "@/components/welcome-banner"
import { SectionCards } from "@/components/section-cards"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Plus, Download } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-10 bg-background/95 px-4 py-8 md:px-8 lg:px-12">
      {/* Top Banner section */}
      <WelcomeBanner />

      {/* Global Dashboard Stats */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <SectionCards />
      </motion.div>

      {/* Main Content Row: Chart & Actions */}
      <div className="grid gap-8 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-8 h-full"
        >
          <ChartAreaInteractive />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-4 flex flex-col gap-6"
        >
          <div className="rounded-[2rem] border border-border bg-card p-8 shadow-sm flex-1 flex flex-col justify-center items-center text-center space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Plus className="size-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold">New Project</h3>
              <p className="text-sm text-muted-foreground">Start a new villa design or renovation layout.</p>
            </div>
            <Button size="lg" className="w-full h-14 rounded-2xl font-bold shadow-lg shadow-primary/20">
              Launch Project
            </Button>
          </div>

          <div className="rounded-[2rem] border border-border bg-muted/30 p-8 shadow-sm flex flex-col justify-center items-center text-center space-y-4">
            <div className="h-12 w-12 rounded-xl bg-background border border-border flex items-center justify-center text-muted-foreground font-bold">
              <Download className="size-5" />
            </div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Full Audit Report</p>
            <Button variant="outline" className="w-full h-12 rounded-xl border-border bg-background">
              Get PDF
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 flex items-center justify-between border-t border-border pt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
        <div>LAAS Architecture CRM • Version 2.0</div>
        <div>Mogadishu • Hargeisa • Garowe</div>
      </div>
    </div>
  )
}

