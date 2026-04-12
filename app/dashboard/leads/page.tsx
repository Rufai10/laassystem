"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Users, Target, CheckCircle2, PhoneCall, Home, Building2 } from "lucide-react"
import { LeadFilters } from "./LeadFilters"
import { LeadTable } from "./LeadTable"
import { AddLeadModal } from "./AddLeadModal"
import { motion, AnimatePresence } from "framer-motion"
import type { LeadRecord } from "./LeadRow"
import { useLanguage } from "@/components/language-provider"

const mockLeads: LeadRecord[] = [
  {
    id: "L-101",
    name: "Mohamed Omar",
    phone: "+252 61 5550191",
    source: "Website",
    status: "New",
    budget: "$250,000",
    assignedTo: "Eng. Ali",
    lastContact: "Today",
  },
  {
    id: "L-102",
    name: "Samira Warsame",
    phone: "+252 61 5550137",
    source: "Referral",
    status: "Contacted",
    budget: "$120,000",
    assignedTo: "Arch. Amina",
    lastContact: "2 days ago",
  },
  {
    id: "L-103",
    name: "Abdi Hassan",
    phone: "+252 61 5550184",
    source: "Property Portal",
    status: "Proposal",
    budget: "$450,000",
    assignedTo: "Arch. Farah",
    lastContact: "Yesterday",
  },
  {
    id: "L-104",
    name: "Nadia Isse",
    phone: "+252 61 5550168",
    source: "Facebook Ads",
    status: "Closed",
    budget: "$85,000",
    assignedTo: "Yusuf Sales",
    lastContact: "Last week",
  },
  {
    id: "L-105",
    name: "Ahmed Ibrahim",
    phone: "+252 61 5550144",
    source: "Website",
    status: "Lost",
    budget: "$600,000",
    assignedTo: "Eng. Ali",
    lastContact: "3 days ago",
  },
  {
    id: "L-106",
    name: "Fatima Noor",
    phone: "+252 61 5550170",
    source: "Referral",
    status: "Contacted",
    budget: "$310,000",
    assignedTo: "Arch. Amina",
    lastContact: "Today",
  },
  {
    id: "L-107",
    name: "Ibrahim Aden",
    phone: "+252 61 5550155",
    source: "Email Inquiry",
    status: "Proposal",
    budget: "$190,000",
    assignedTo: "Arch. Farah",
    lastContact: "Yesterday",
  },
  {
    id: "L-108",
    name: "Asma Mohamud",
    phone: "+252 61 5550119",
    source: "Office Visit",
    status: "New",
    budget: "$95,000",
    assignedTo: "Yusuf Sales",
    lastContact: "Today",
  },
]

export default function LeadsPage() {
  const { t } = useLanguage()
  const [leads, setLeads] = useState<LeadRecord[]>(mockLeads)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("All")
  const [source, setSource] = useState("All")
  const [page, setPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)

  const handleAddLead = (lead: LeadRecord) => {
    setLeads(prev => [lead, ...prev])
    setPage(1)
  }

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch = [lead.name, lead.phone, lead.assignedTo, lead.source]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())

      const matchesStatus = status === "All" ? true : lead.status === status
      const matchesSource = source === "All" ? true : lead.source === source

      return matchesSearch && matchesStatus && matchesSource
    })
  }, [search, status, source])

  const stats = useMemo(() => {
    return {
      total: filteredLeads.length,
      new: filteredLeads.filter(l => l.status === "New").length,
      contacted: filteredLeads.filter(l => l.status === "Contacted").length,
      proposal: filteredLeads.filter(l => l.status === "Proposal").length,
    }
  }, [filteredLeads])

  const pageSize = 6
  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / pageSize))
  const currentPage = Math.min(page, totalPages)

  const pagedLeads = useMemo(
    () => filteredLeads.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [filteredLeads, currentPage]
  )

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
            <Home className="size-5 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">LAAS Architects & Engineers</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t("leads_title")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("leads_desc")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            size="lg"
            className="h-12 rounded-xl bg-primary px-6 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
            onClick={() => setModalOpen(true)}
          >
            <Plus className="mr-2 size-5" />
            {t("add_inquiry")}
          </Button>
        </div>
      </motion.div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: t("stats_total"), value: stats.total, icon: Building2, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: t("stats_new"), value: stats.new, icon: Target, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Phone Screen", value: stats.contacted, icon: PhoneCall, color: "text-amber-500", bg: "bg-amber-500/10" },
          { label: "Quotations", value: stats.proposal, icon: CheckCircle2, color: "text-violet-500", bg: "bg-violet-500/10" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group flex items-center gap-4 rounded-3xl border border-border bg-card p-6 transition-all hover:bg-accent/50"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg}`}>
              <stat.icon className={`size-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <h3 className="text-2xl font-bold tracking-tight text-foreground">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-6">
        <LeadFilters
          search={search}
          status={status}
          source={source}
          onSearch={(value) => {
            setSearch(value)
            setPage(1)
          }}
          onStatusChange={(value) => {
            setStatus(value)
            setPage(1)
          }}
          onSourceChange={(value) => {
            setSource(value)
            setPage(1)
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={`${status}-${source}-${search}-${page}`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            <LeadTable 
              leads={pagedLeads} 
              page={currentPage} 
              totalPages={totalPages} 
              onPageChange={setPage} 
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <AddLeadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddLead}
      />
    </div>
  )
}


