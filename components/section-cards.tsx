"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Users, Activity, BarChart3 } from "lucide-react"

/**
 * SectionCards Component
 * 
 * TODO: Backend Integration (Node.js/Express, Prisma, MySQL, NestJS)
 * 1. Create an API route in your backend (e.g., GET /api/dashboard/stats)
 * 2. Use fetch() or axios inside a useEffect() or useQuery hook here.
 * 3. Map the stats array to the data returned from your database via Prisma.
 * Example: const stats = await prisma.order.aggregate({ _sum: { total: true } })
 */

export function SectionCards() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$0",
      trend: "0%",
      trendType: "up",
      description: "Annual Revenue",
      icon: DollarSign,
      color: "from-emerald-500/15 to-emerald-500/5",
    },
    {
      title: "Active Projects",
      value: "0",
      trend: "0",
      trendType: "up",
      description: "Ongoing Construction",
      icon: Activity,
      color: "from-blue-500/15 to-blue-500/5",
    },
    {
      title: "New Leads",
      value: "0",
      trend: "0%",
      trendType: "up",
      description: "Qualified Inquiries",
      icon: Users,
      color: "from-orange-500/15 to-orange-500/5",
    },
    {
      title: "Lead Conversion",
      value: "0%",
      trend: "0%",
      trendType: "up",
      description: "Lead to Contract",
      icon: BarChart3,
      color: "from-purple-500/15 to-purple-500/5",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Card key={i} className={`group relative overflow-hidden border-border bg-gradient-to-br ${stat.color} shadow-sm transition-all hover:shadow-lg rounded-[2rem]`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
            <CardDescription className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {stat.title}
            </CardDescription>
            <div className="rounded-xl bg-background/50 p-2 shadow-sm">
              <stat.icon className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardHeader className="pt-0 px-6">
            <CardTitle className="text-3xl font-black tracking-tight">{stat.value}</CardTitle>
            <CardAction className="mt-2">
              <Badge variant="outline" className="bg-background/80 backdrop-blur-md rounded-full px-2 py-0 text-[10px] font-bold border-border/50">
                {stat.trendType === "up" ? <TrendingUp className="mr-1 h-3 w-3 text-emerald-500" /> : <TrendingDown className="mr-1 h-3 w-3 text-rose-500" />}
                {stat.trend}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="pt-0 px-6 pb-6 text-[10px] font-bold uppercase tracking-tighter text-muted-foreground/60">
            {stat.description}
          </CardFooter>
        </Card>
      ))}
    </div>
  )

}
