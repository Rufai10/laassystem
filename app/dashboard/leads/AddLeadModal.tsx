"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, UserPlus, Phone, DollarSign, Users, Globe, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { LeadRecord } from "./LeadRow"

interface AddLeadModalProps {
  open: boolean
  onClose: () => void
  onAdd: (lead: LeadRecord) => void
}

const STATUS_OPTIONS = ["New", "Contacted", "Proposal", "Closed", "Lost"]
const SOURCE_OPTIONS = ["Website", "Referral", "Property Portal", "Facebook Ads", "Email Inquiry", "Office Visit"]
const AGENT_OPTIONS = ["Eng. Ali", "Arch. Amina", "Arch. Farah", "Yusuf Sales"]

export function AddLeadModal({ open, onClose, onAdd }: AddLeadModalProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    source: SOURCE_OPTIONS[0],
    status: STATUS_OPTIONS[0],
    budget: "",
    assignedTo: AGENT_OPTIONS[0],
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = "Name is required"
    if (!form.phone.trim()) errs.phone = "Phone is required"
    if (!form.budget.trim()) errs.budget = "Budget is required"
    return errs
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setLoading(true)
    // Simulate async save
    await new Promise((r) => setTimeout(r, 800))
    const newLead: LeadRecord = {
      id: `L-${Math.floor(Math.random() * 9000) + 100}`,
      name: form.name.trim(),
      phone: form.phone.trim(),
      source: form.source,
      status: form.status,
      budget: form.budget.trim().startsWith("$") ? form.budget.trim() : `$${form.budget.trim()}`,
      assignedTo: form.assignedTo,
      lastContact: "Today",
    }
    onAdd(newLead)
    setLoading(false)
    setForm({ name: "", phone: "", source: SOURCE_OPTIONS[0], status: STATUS_OPTIONS[0], budget: "", assignedTo: AGENT_OPTIONS[0] })
    setErrors({})
    onClose()
  }

  const handleClose = () => {
    if (loading) return
    setErrors({})
    setForm({ name: "", phone: "", source: SOURCE_OPTIONS[0], status: STATUS_OPTIONS[0], budget: "", assignedTo: AGENT_OPTIONS[0] })
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
          >
            <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card shadow-2xl overflow-hidden">
              {/* Header gradient bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-primary via-violet-500 to-blue-500" />

              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                      <UserPlus className="size-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">Add New Inquiry</h2>
                      <p className="text-sm text-muted-foreground">Fill in client details below</p>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label="Close modal"
                  >
                    <X className="size-5" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="lead-name" className="text-sm font-semibold text-foreground">
                      Client Name
                    </Label>
                    <div className="relative">
                      <UserPlus className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                      <Input
                        id="lead-name"
                        placeholder="e.g. Mohamed Hassan"
                        value={form.name}
                        onChange={(e) => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: "" })) }}
                        className={`pl-10 h-11 rounded-xl border-border bg-background transition-all focus:ring-2 focus:ring-primary/30 ${errors.name ? "border-red-500 focus:ring-red-500/30" : ""}`}
                      />
                    </div>
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="lead-phone" className="text-sm font-semibold text-foreground">
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                      <Input
                        id="lead-phone"
                        placeholder="+252 61 xxxxxxx"
                        value={form.phone}
                        onChange={(e) => { setForm(f => ({ ...f, phone: e.target.value })); setErrors(er => ({ ...er, phone: "" })) }}
                        className={`pl-10 h-11 rounded-xl border-border bg-background transition-all focus:ring-2 focus:ring-primary/30 ${errors.phone ? "border-red-500 focus:ring-red-500/30" : ""}`}
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                  </div>

                  {/* Budget */}
                  <div className="space-y-2">
                    <Label htmlFor="lead-budget" className="text-sm font-semibold text-foreground">
                      Budget
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                      <Input
                        id="lead-budget"
                        placeholder="e.g. 250,000"
                        value={form.budget}
                        onChange={(e) => { setForm(f => ({ ...f, budget: e.target.value })); setErrors(er => ({ ...er, budget: "" })) }}
                        className={`pl-10 h-11 rounded-xl border-border bg-background transition-all focus:ring-2 focus:ring-primary/30 ${errors.budget ? "border-red-500 focus:ring-red-500/30" : ""}`}
                      />
                    </div>
                    {errors.budget && <p className="text-xs text-red-500">{errors.budget}</p>}
                  </div>

                  {/* Source + Status row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lead-source" className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                        <Globe className="size-3.5" /> Source
                      </Label>
                      <select
                        id="lead-source"
                        value={form.source}
                        onChange={(e) => setForm(f => ({ ...f, source: e.target.value }))}
                        className="w-full h-11 rounded-xl border border-border bg-background px-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      >
                        {SOURCE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lead-status" className="text-sm font-semibold text-foreground">
                        Status
                      </Label>
                      <select
                        id="lead-status"
                        value={form.status}
                        onChange={(e) => setForm(f => ({ ...f, status: e.target.value }))}
                        className="w-full h-11 rounded-xl border border-border bg-background px-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      >
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Assigned To */}
                  <div className="space-y-2">
                    <Label htmlFor="lead-agent" className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                      <Users className="size-3.5" /> Assign To
                    </Label>
                    <select
                      id="lead-agent"
                      value={form.assignedTo}
                      onChange={(e) => setForm(f => ({ ...f, assignedTo: e.target.value }))}
                      className="w-full h-11 rounded-xl border border-border bg-background px-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    >
                      {AGENT_OPTIONS.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 h-12 rounded-xl border-border"
                      onClick={handleClose}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 h-12 rounded-xl bg-primary shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 size-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <UserPlus className="mr-2 size-4" />
                          Add Lead
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
