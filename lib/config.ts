import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  Files,
  HelpCircle,
  Database,
  Search,
  Command,
  FileText,
  Briefcase,
  FileChartColumn,
  User,
  Wallet,
  TrendingUp,
  UserCheck,
  MessageSquare
} from "lucide-react"

export const siteConfig = {
  name: "LAAS Dashboard", 
  description: "A professional dashboard system for all your applications.",
}

export const dashboardNav = {
  user: {
    name: "Admin User",
    email: "admin@example.com",
    avatar: "/avatars/admin.jpg",
  },

  // Main Navigation
  mainNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Leads",
      href: "/dashboard/leads",
      icon: Briefcase ,
    },
    {
      title: "Pipeline",
      href: "/dashboard/pipeline",
      icon: TrendingUp,
    },
    {
      title: "Team",
      href: "/dashboard/team",
      icon: UserCheck,
    },
    {
      title: "Messages",
      href: "/dashboard/messages",
      icon: MessageSquare,
    },
    {
      title: "Finance",
      href: "/dashboard/finance",
      icon: Wallet,
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: BarChart3,
    },
  ],

  // Secondary Navigation
  secondaryNav: [
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
    {
      title: "Get Help",
      href: "/dashboard/help",
      icon: HelpCircle,
    },
    {
      title: "Search",
      href: "/dashboard/search",
      icon: Search,
    },
  ],

  // Documents Navigation
  documentsNav: [
    {
      name: "Data Library",
      url: "/dashboard/data",
      icon: Database,
    },
    {
      name: "Reports",
      url: "/dashboard/reports",
      icon: Files,
    },
    {
      name: "Proposals",
      url: "/dashboard/proposals",
      icon: FileText,
    },
  ],
}

