"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, LayoutGrid, DollarSign, Calendar, User, Building2, Loader2, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Deal } from "@/components/pipeline"

interface AddDealModalProps {
  open: boolean
  onClose: () => void
  onAdd: (deal: Deal) => void
}

const AGENT_OPTIONS = ["Eng. Ali", "Arch. Amal", "Arch. Omar", "Yusuf Sales"]

export function AddDealModal({ open, onClose, onAdd }: AddDealModalProps) {
  const [form, setForm] = useState({
    title: "",
    company: "",
    amount: "",
    dueDate: "",
    owner: AGENT_OPTIONS[0],
    priority: "Medium" as "Low" | "Medium" | "High",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.amount) return

    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    
    const newDeal: Deal = {
      id: Math.floor(Math.random() * 10000).toString(),
      title: form.title,
      company: form.company,
      amount: form.amount.startsWith("$") ? form.amount : `$${form.amount}`,
      dueDate: form.dueDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      owner: form.owner,
      priority: form.priority,
      columnId: "new",
    }

    onAdd(newDeal)
    setLoading(false)
    setForm({ title: "", company: "", amount: "", dueDate: "", owner: AGENT_OPTIONS[0], priority: "Medium" })
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card shadow-2xl overflow-hidden">
              <div className="h-1.5 w-full bg-gradient-to-r from-primary via-violet-500 to-blue-500" />
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <LayoutGrid className="size-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">Create New Deal</h2>
                      <p className="text-sm text-muted-foreground">Add a new opportunity to your pipeline</p>
                    </div>
                  </div>
                  <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl transition-colors">
                    <X className="size-5 text-muted-foreground" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider">Deal Title</Label>
                    <div className="relative">
                      <LayoutGrid className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input 
                        placeholder="e.g. Modern Villa Project" 
                        className="pl-10 h-11 rounded-xl"
                        value={form.title}
                        onChange={e => setForm({...form, title: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider">Company / Client</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input 
                        placeholder="e.g. Hassan Group" 
                        className="pl-10 h-11 rounded-xl"
                        value={form.company}
                        onChange={e => setForm({...form, company: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-wider">Deal Value</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input 
                          placeholder="e.g. 450,000" 
                          className="pl-10 h-11 rounded-xl"
                          value={form.amount}
                          onChange={e => setForm({...form, amount: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-wider">Expected Close</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input 
                          placeholder="e.g. Apr 25" 
                          className="pl-10 h-11 rounded-xl"
                          value={form.dueDate}
                          onChange={e => setForm({...form, dueDate: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-wider">Assigned To</Label>
                      <select 
                        className="w-full h-11 rounded-xl border border-border bg-background px-3 text-sm focus:ring-2 focus:ring-primary"
                        value={form.owner}
                        onChange={e => setForm({...form, owner: e.target.value})}
                      >
                        {AGENT_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-wider">Priority</Label>
                      <select 
                        className="w-full h-11 rounded-xl border border-border bg-background px-3 text-sm focus:ring-2 focus:ring-primary"
                        value={form.priority}
                        onChange={e => setForm({...form, priority: e.target.value as any})}
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-6">
                    <Button variant="outline" type="button" onClick={onClose} className="flex-1 h-12 rounded-xl" disabled={loading}>
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1 h-12 rounded-xl bg-primary shadow-lg shadow-primary/20" disabled={loading}>
                      {loading ? <Loader2 className="animate-spin size-5" /> : "Create Deal"}
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
