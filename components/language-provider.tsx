"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type Locale = "en" | "so"

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Nav
    "dashboard": "Dashboard",
    "leads": "Leads",
    "pipeline": "Pipeline",
    "team": "Team",
    "finance": "Finance",
    "reports": "Reports",
    "settings": "Settings",
    // Common
    "add_new": "Add New",
    "search_placeholder": "Search here....",
    "notifications": "Notifications",
    "profile": "Profile",
    "logout": "Logout",
    // Leads Page
    "leads_title": "Property Leads",
    "leads_desc": "Manage inquiries for villa designs and apartments.",
    "add_inquiry": "Add New Inquiry",
    "stats_total": "Total Inquiries",
    "stats_new": "New Leads",
  },
  so: {
    // Nav
    "dashboard": "Dashboard",
    "leads": "Macaamiisha",
    "pipeline": "Pipeline",
    "team": "Kooxda",
    "finance": "Dhaqaalaha",
    "reports": "Warbixinada",
    "settings": "Settings",
    // Common
    "add_new": "Ku dar cusub",
    "search_placeholder": "Halkan ka raadi....",
    "notifications": "Ogaysiisyada",
    "profile": "Profile-ka",
    "logout": "Kabax",
    // Leads Page
    "leads_title": "Macaamiisha Cusub",
    "leads_desc": "Maamul weydiimaha naqshadaha guryaha iyo guryaha iibka ah.",
    "add_inquiry": "Ku dar Weydiin Cusub",
    "stats_total": "Wadarta Weydiimaha",
    "stats_new": "Macaamiisha Cusub",
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")

  // Load saved language
  useEffect(() => {
    const saved = localStorage.getItem("laas_locale") as Locale
    if (saved && (saved === "en" || saved === "so")) {
      setLocale(saved)
    }
  }, [])

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem("laas_locale", newLocale)
  }

  const t = (key: string) => {
    return translations[locale][key] || key
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
