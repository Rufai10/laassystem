"use client"

import * as React from "react"
import { dashboardNav, siteConfig } from "@/lib/config"
import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Command } from "lucide-react"
import { useUser } from "@/hooks/use-user"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser()
  const role = user?.role || "sales"

  const filteredMainNav = dashboardNav.mainNav.filter(item => {
    if (role === "admin") return true
    if (role === "manager") {
      // Manager: Dashboard, Leads, Customers, Pipeline, Team, Reports
      return !["Finance", "Messages"].includes(item.title)
    }
    if (role === "sales") {
      // Sales: Dashboard, Leads, Customers, Pipeline
      return ["Dashboard", "Leads", "Customers", "Pipeline"].includes(item.title)
    }
    return false
  })

  const mainNavItems = filteredMainNav.map(item => ({
    title: item.title,
    url: item.href,
    icon: <item.icon />
  }))

  const filteredSecondaryNav = dashboardNav.secondaryNav.filter(item => {
    if (role === "admin") return true
    if (role === "manager") {
      // Manager: No Settings
      return !["Settings"].includes(item.title)
    }
    if (role === "sales") {
      // Sales: No secondary nav items
      return false
    }
    return false
  })

  const secondaryNavItems = filteredSecondaryNav.map(item => ({
    title: item.title,
    url: item.href,
    icon: <item.icon />
  }))

  return (
    <Sidebar collapsible="icon" {...props} className="border-r border-zinc-200/50 dark:border-zinc-800/50">
      <SidebarHeader className="border-b border-zinc-200/50 p-4 dark:border-zinc-800/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/dashboard" className="flex items-center justify-center py-4">
                <div className="flex h-14 w-full items-center justify-center px-4 transition-transform hover:scale-105">
                  <img src="/las logo-01.png" alt="LAAS Logo" className="h-full w-auto object-contain" />
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <NavMain items={mainNavItems} />
        {secondaryNavItems.length > 0 && <NavSecondary items={secondaryNavItems} className="mt-auto" />}
      </SidebarContent>
      <SidebarFooter className="border-t border-zinc-200/50 dark:border-zinc-800/50">
        <NavUser user={dashboardNav.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
