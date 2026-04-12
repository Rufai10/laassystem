"use client"

import * as React from "react"
import { 
  LayoutGrid, 
  Globe, 
  Maximize, 
  Minimize,
  Bell, 
  Search, 
  ChevronDown,
  Settings
} from "lucide-react"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { 
  InputGroup, 
  InputGroupInput, 
  InputGroupAddon 
} from "@/components/ui/input-group"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { dashboardNav } from "@/lib/config"
import { useLanguage } from "@/components/language-provider"

export function SiteHeader() {
  const user = dashboardNav.user
  const { t } = useLanguage()

  const [isFullscreen, setIsFullscreen] = React.useState(false)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  const [lang, setLang] = React.useState("English")

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between border-b bg-background/95 px-4 backdrop-blur-md transition-[width,height] ease-linear">
      <div className="flex items-center gap-4 flex-1">
        <SidebarTrigger className="-ml-1" />
        
        {/* Search Bar - Matches the screenshot look */}
        <div className="hidden md:flex items-center gap-2 max-w-md w-full ml-2">
          <InputGroup className="bg-muted/40 border-none shadow-none focus-within:ring-1 focus-within:ring-primary/20 transition-all rounded-lg max-w-sm">
            <InputGroupInput 
              placeholder={t("search_placeholder")} 
              className="placeholder:text-muted-foreground/60 h-9"
            />
            <InputGroupAddon align="inline-end">
              <Search className="size-4 text-primary" />
            </InputGroupAddon>
          </InputGroup>
          
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <LayoutGrid className="size-5" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        {/* Right side icons */}
        <ModeToggle />
        

        
        <Button 
          variant="ghost" 
          size="icon" 
          className="hidden sm:flex text-muted-foreground hover:text-foreground"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? <Minimize className="size-5" /> : <Maximize className="size-5" />}
        </Button>
        
        <div className="relative">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Bell className="size-5" />
            <span className="absolute top-2.5 right-2.5 flex h-1.5 w-1.5 rounded-full bg-orange-500 border border-background" />
          </Button>
        </div>
      </div>
    </header>
  )
}
