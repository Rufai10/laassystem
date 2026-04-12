"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  ArrowUpRight, 
  Target, 
  Users, 
  Briefcase,
  Download, 
  FileDown, 
  Calendar,
  ChevronRight
} from "lucide-react"

export const analyticsOverview: any[] = []

export const projectDistribution: any[] = []


export function Reports() {
  return (
    <div className="flex flex-col gap-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {analyticsOverview.map((kpi, i) => (
          <Card key={i} className="border-border bg-card shadow-sm rounded-3xl overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{kpi.title}</span>
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  <ArrowUpRight className="size-3" />
                  {kpi.change}
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-4xl font-bold tracking-tight text-foreground">{kpi.value}</h3>
                <p className="text-xs text-muted-foreground">{kpi.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Project Distribution */}
        <Card className="lg:col-span-2 border-border bg-card shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="p-8 pb-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">Project Distribution</CardTitle>
                <CardDescription>Breakdown by architecture and engineering categories.</CardDescription>
              </div>
              <PieChart className="size-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="flex h-4 w-full rounded-full bg-muted overflow-hidden">
              {projectDistribution.map((item, i) => (
                <div 
                  key={i} 
                  style={{ width: `${item.percentage}%` }} 
                  className={`${item.color} h-full first:rounded-l-full last:rounded-r-full transition-all hover:opacity-80`} 
                />
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {projectDistribution.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/40 border border-border">
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${item.color}`} />
                    <span className="text-sm font-bold text-foreground">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold">{item.count} Projects</span>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">{item.percentage}% of total</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Reports / Actions */}
        <div className="flex flex-col gap-8">
          <Card className="border-border bg-card shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-bold">Report Explorer</CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-2">
              {[
                { label: "Q1 Financial Summary", icon: FileDown },
                { label: "Lead Trends 2026", icon: BarChart },
                { label: "Team Performance Logs", icon: Users },
                { label: "Site Inspection Audits", icon: Target },
              ].map((report, i) => (
                <Button 
                  key={i}
                  variant="ghost" 
                  className="w-full justify-between h-12 rounded-xl px-4 hover:bg-primary hover:text-primary-foreground transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <report.icon className="size-4 opacity-70 group-hover:opacity-100" />
                    <span className="text-sm font-bold">{report.label}</span>
                  </div>
                  <ChevronRight className="size-4 opacity-50 group-hover:opacity-100" />
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border bg-primary shadow-lg shadow-primary/20 rounded-3xl overflow-hidden flex-1">
            <CardContent className="p-8 flex flex-col h-full justify-between">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Calendar className="size-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Monthly Review</h4>
                  <p className="text-sm text-white/80 leading-relaxed">Your monthly performance audit will be ready in 3 days.</p>
                </div>
              </div>
              <Button size="lg" className="w-full mt-8 rounded-2xl bg-white text-primary font-bold h-12 hover:bg-white/90">
                Setup Automatic Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}