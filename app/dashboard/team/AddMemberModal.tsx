"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, UserPlus, Mail, Phone, MapPin, Briefcase, Loader2, ShieldCheck, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TeamMember, SystemRole, ROLE_PRESETS } from "@/components/team"
import { registerUser } from "@/lib/api"
import { toast } from "sonner"

interface AddMemberModalProps {
  open: boolean
  onClose: () => void
  onAdd: (member: TeamMember) => void
}

export function AddMemberModal({ open, onClose, onAdd }: AddMemberModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "", // Required for registration
    phone: "",
    location: "Mogadishu",
    role: "", // Professional title (e.g. Sales Executive)
    systemRole: "Sales" as SystemRole,
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) {
      toast.error("Name, Email, and Password are required")
      return
    }

    setLoading(true)
    try {
      // 1. Register user in database
      const userData = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.systemRole.toLowerCase(),
      }

      const createdUser = await registerUser(userData)
      
      // 2. Map to UI TeamMember type
      const newMember: TeamMember = {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        phone: form.phone,
        location: form.location,
        role: form.role || (form.systemRole === "Admin" ? "Administrator" : "Sales Representative"),
        systemRole: form.systemRole,
        status: "Active",
        projects: 0,
        joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${form.name}`,
        permissions: { ...ROLE_PRESETS[form.systemRole] },
      }

      onAdd(newMember)
      toast.success("Team member registered in database!")
      setLoading(false)
      setForm({ name: "", email: "", password: "", phone: "", location: "Mogadishu", role: "", systemRole: "Sales" })
      onClose()
    } catch (error: any) {
      toast.error(error.message || "Failed to register team member")
      setLoading(false)
    }
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
                      <UserPlus className="size-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">Invite Team Member</h2>
                      <p className="text-sm text-muted-foreground">Add a new user to your organization</p>
                    </div>
                  </div>
                  <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl transition-colors">
                    <X className="size-5 text-muted-foreground" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider">Full Name</Label>
                    <div className="relative">
                      <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input 
                        placeholder="Mohamed Ali" 
                        className="pl-10 h-11 rounded-xl"
                        value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-wider">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input 
                          type="email"
                          placeholder="m.ali@laas.so" 
                          className="pl-10 h-11 rounded-xl"
                          value={form.email}
                          onChange={e => setForm({...form, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-wider">Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input 
                          placeholder="+252 61..." 
                          className="pl-10 h-11 rounded-xl"
                          value={form.phone}
                          onChange={e => setForm({...form, phone: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider">Set Initial Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input 
                        type="password"
                        placeholder="••••••••" 
                        className="pl-10 h-11 rounded-xl"
                        value={form.password}
                        onChange={e => setForm({...form, password: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-wider">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input 
                          placeholder="Mogadishu" 
                          className="pl-10 h-11 rounded-xl"
                          value={form.location}
                          onChange={e => setForm({...form, location: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-wider">Professional Role</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input 
                          placeholder="e.g. Sales Executive" 
                          className="pl-10 h-11 rounded-xl"
                          value={form.role}
                          onChange={e => setForm({...form, role: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Label className="text-xs font-bold uppercase tracking-wider">System Access Level</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {(["Admin", "Sales"] as SystemRole[]).map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => setForm({...form, systemRole: role})}
                          className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                            form.systemRole === role 
                              ? "border-primary bg-primary/5 text-primary" 
                              : "border-border bg-background hover:border-primary/30"
                          }`}
                        >
                          <div className="text-left">
                            <p className="font-bold">{role}</p>
                            <p className="text-[10px] opacity-70">
                              {role === "Admin" ? "Full Access" : "Sales Access"}
                            </p>
                          </div>
                          {form.systemRole === role && <ShieldCheck className="size-5" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-6">
                    <Button variant="outline" type="button" onClick={onClose} className="flex-1 h-12 rounded-xl" disabled={loading}>
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1 h-12 rounded-xl bg-primary shadow-lg shadow-primary/20" disabled={loading}>
                      {loading ? <Loader2 className="animate-spin size-5" /> : "Invite Member"}
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
