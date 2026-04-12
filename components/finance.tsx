"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight,
  Receipt,
  FileText,
  Clock,
  MoreHorizontal
} from "lucide-react"

const financialStats = [
  {
    title: "Total Revenue",
    value: "$1,245,000",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  {
    title: "Project Expenses",
    value: "$432,000",
    change: "+4.2%",
    trend: "up",
    icon: CreditCard,
    color: "text-rose-500",
    bg: "bg-rose-500/10"
  },
  {
    title: "Net Profit",
    value: "$813,000",
    change: "+18.3%",
    trend: "up",
    icon: TrendingUp,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    title: "Outstanding",
    value: "$124,500",
    change: "-5.4%",
    trend: "down",
    icon: Clock,
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  }
]

export const recentInvoices = [
  {
    id: "INV-2024-001",
    client: "Hassan Group",
    project: "Modern Villa Design",
    amount: "$45,000",
    status: "Paid",
    date: "Apr 10, 2026"
  },
  {
    id: "INV-2024-002",
    client: "Star Tech",
    project: "Office Renovation",
    amount: "$12,500",
    status: "Pending",
    date: "Apr 08, 2026"
  },
  {
    id: "INV-2024-003",
    client: "Som Real Estate",
    project: "Luxury Apartment Sale",
    amount: "$85,000",
    status: "Paid",
    date: "Apr 05, 2026"
  },
  {
    id: "INV-2024-004",
    client: "Global Logistics",
    project: "Warehouse Design",
    amount: "$32,000",
    status: "Overdue",
    date: "Mar 28, 2026"
  }
]

export function Finance() {
  return (
    <div className="flex flex-col gap-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {financialStats.map((stat, i) => (
          <Card key={i} className="border-border bg-card shadow-sm hover:shadow-md transition-shadow rounded-3xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="size-6" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                  {stat.change}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-3xl font-bold tracking-tight text-foreground">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Invoices Table */}
        <Card className="lg:col-span-2 border-border bg-card shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="p-8 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">Recent Invoices</CardTitle>
                <CardDescription>All project payments and billings.</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl h-9">View All</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-y border-border bg-muted/30">
                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">ID</th>
                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Client / Project</th>
                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Amount</th>
                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentInvoices.map((invoice) => (
                    <tr key={invoice.id} className="group hover:bg-muted/30 transition-colors">
                      <td className="px-8 py-5 text-sm font-medium text-muted-foreground">{invoice.id}</td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-foreground">{invoice.client}</span>
                          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{invoice.project}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm font-bold text-foreground">{invoice.amount}</td>
                      <td className="px-8 py-5">
                        <Badge 
                          variant="outline" 
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                            invoice.status === 'Paid' ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-500' :
                            invoice.status === 'Pending' ? 'border-orange-500/20 bg-orange-500/5 text-orange-500' :
                            'border-rose-500/20 bg-rose-500/5 text-rose-500'
                          }`}
                        >
                          {invoice.status}
                        </Badge>
                      </td>
                      <td className="px-8 py-5 text-sm text-muted-foreground">{invoice.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Financial Summary / Goals */}
        <div className="flex flex-col gap-8">
          <Card className="border-border bg-card shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-bold">Revenue Goal</CardTitle>
              <CardDescription>Annual target for 2026.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold">Progress</span>
                    <span className="text-muted-foreground">$1.2M / $2.0M</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-[60%] bg-primary rounded-full" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-muted/40 border border-border">
                    <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest mb-1">Q2 Status</p>
                    <p className="text-lg font-bold">On Track</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-muted/40 border border-border">
                    <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest mb-1">Growth</p>
                    <p className="text-lg font-bold text-emerald-500">+22%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card shadow-sm rounded-3xl overflow-hidden flex-1">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-bold">Tax Estimates</CardTitle>
              <CardDescription>Quarterly projection.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-orange-500/5 border border-orange-500/10">
                <Receipt className="size-8 text-orange-500" />
                <div>
                  <p className="text-sm font-bold text-foreground">Next Payment Due</p>
                  <p className="text-xs text-muted-foreground">Apr 15, 2026 • $18,400</p>
                </div>
              </div>
              <Button size="lg" className="w-full mt-6 rounded-2xl bg-foreground text-background font-bold h-12">
                Make Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
