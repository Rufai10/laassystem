"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  MoreHorizontal,
  ShieldCheck,
  X,
  Check,
  Loader2,
  UserCog,
  Trash2,
  Eye,
  Lock,
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Wallet,
  Settings,
  ChevronDown,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// ─── Types ────────────────────────────────────────────────────────────────────

export type SystemRole = "Admin" | "Sales"

export type Permissions = {
  dashboard: boolean
  leads: boolean
  projects: boolean
  reports: boolean
  finance: boolean
  team: boolean
  settings: boolean
}

export interface TeamMember {
  id: number
  name: string
  role: string
  systemRole: SystemRole
  email: string
  phone: string
  location: string
  status: "Active" | "On Leave" | "Inactive"
  projects: number
  joinDate: string
  avatar: string
  permissions: Permissions
}

export const MODULE_META: { key: keyof Permissions; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "dashboard", label: "Dashboard",  icon: LayoutDashboard },
  { key: "leads",     label: "Leads",      icon: Users },
  { key: "projects",  label: "Projects",   icon: FileText },
  { key: "reports",   label: "Reports",    icon: BarChart3 },
  { key: "finance",   label: "Finance",    icon: Wallet },
  { key: "team",      label: "Team",       icon: Users },
  { key: "settings",  label: "Settings",   icon: Settings },
]

export const ROLE_PRESETS: Record<SystemRole, Permissions> = {
  Admin: {
    dashboard: true, leads: true, projects: true,
    reports: true, finance: true, team: true, settings: true,
  },
  Sales: {
    dashboard: true, leads: true, projects: false,
    reports: true, finance: false, team: false, settings: false,
  },
}

export const ROLE_COLORS: Record<SystemRole, string> = {
  Admin: "bg-red-500/10 text-red-500 border-red-500/20",
  Sales: "bg-amber-500/10 text-amber-500 border-amber-500/20",
}

// ─── Seed data ────────────────────────────────────────────────────────────────

export const seedMembers: TeamMember[] = [
  {
    id: 1, name: "Eng. Ali Hassan", role: "Senior Civil Engineer",
    systemRole: "Admin", email: "ali.hassan@laas.so", phone: "+252 61 550191",
    location: "Mogadishu", status: "Active", projects: 12, joinDate: "Jan 2023",
    avatar: "AH", permissions: { ...ROLE_PRESETS.Admin },
  },
  {
    id: 2, name: "Arch. Amal Warsame", role: "Principal Architect",
    systemRole: "Admin", email: "amal.warsame@laas.so", phone: "+252 61 550137",
    location: "Hargeisa", status: "Active", projects: 8, joinDate: "Mar 2023",
    avatar: "AW", permissions: { ...ROLE_PRESETS.Admin },
  },
  {
    id: 3, name: "Arch. Omar Farole", role: "Interior Designer",
    systemRole: "Sales", email: "omar.farole@laas.so", phone: "+252 61 550184",
    location: "Mogadishu", status: "On Leave", projects: 5, joinDate: "Jun 2023",
    avatar: "OF", permissions: { ...ROLE_PRESETS.Sales },
  },
  {
    id: 4, name: "Yusuf Mohamed", role: "Sales Manager",
    systemRole: "Sales", email: "yusuf.m@laas.so", phone: "+252 61 550168",
    location: "Mogadishu", status: "Active", projects: 45, joinDate: "Feb 2024",
    avatar: "YM", permissions: { ...ROLE_PRESETS.Sales },
  },
  {
    id: 5, name: "Eng. Amina Isse", role: "Structural Engineer",
    systemRole: "Admin", email: "amina.isse@laas.so", phone: "+252 61 550144",
    location: "Garowe", status: "Active", projects: 15, joinDate: "Nov 2023",
    avatar: "AI", permissions: { ...ROLE_PRESETS.Admin },
  },
  {
    id: 6, name: "Farah Aden", role: "Project Coordinator",
    systemRole: "Sales", email: "farah.a@laas.so", phone: "+252 61 550170",
    location: "Mogadishu", status: "Active", projects: 20, joinDate: "May 2024",
    avatar: "FA", permissions: { ...ROLE_PRESETS.Sales },
  },
]

// ─── Permission Toggle ────────────────────────────────────────────────────────

function PermToggle({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none ${
        checked ? "bg-primary" : "bg-muted"
      }`}
      aria-checked={checked}
      role="switch"
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  )
}

// ─── Edit Role Modal ──────────────────────────────────────────────────────────

function EditRoleModal({
  member,
  onClose,
  onSave,
}: {
  member: TeamMember
  onClose: () => void
  onSave: (updated: TeamMember) => void
}) {
  const [systemRole, setSystemRole] = useState<SystemRole>(member.systemRole)
  const [permissions, setPermissions] = useState<Permissions>({ ...member.permissions })
  const [saving, setSaving] = useState(false)

  const applyPreset = (role: SystemRole) => {
    setSystemRole(role)
    setPermissions({ ...ROLE_PRESETS[role] })
  }

  const togglePerm = (key: keyof Permissions) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 700))
    onSave({ ...member, systemRole, permissions })
    setSaving(false)
    onClose()
  }

  const activeCount = Object.values(permissions).filter(Boolean).length

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      />
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: "spring", stiffness: 340, damping: 28 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
      >
        <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card shadow-2xl overflow-hidden">
          {/* Gradient bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-primary via-violet-500 to-blue-500" />

          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                  <UserCog className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Edit Role & Access</h2>
                  <p className="text-sm text-muted-foreground">{member.name}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* System Role Selector */}
            <div className="mb-6">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">
                System Role
              </Label>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(ROLE_PRESETS) as SystemRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => applyPreset(r)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      systemRole === r
                        ? `${ROLE_COLORS[r]} ring-2 ring-current/30 scale-105`
                        : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Selecting a role auto-fills permissions. You can still fine-tune below.
              </p>
            </div>

            {/* Permissions Grid */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Module Access
                </Label>
                <span className="text-xs font-semibold text-primary">
                  {activeCount}/{MODULE_META.length} enabled
                </span>
              </div>

              <div className="rounded-2xl border border-border overflow-hidden divide-y divide-border">
                {MODULE_META.map(({ key, label, icon: Icon }) => (
                  <div
                    key={key}
                    className={`flex items-center justify-between px-4 py-3 transition-colors ${
                      permissions[key] ? "bg-primary/5" : "bg-card"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                          permissions[key] ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="size-4" />
                      </div>
                      <span className={`text-sm font-medium ${permissions[key] ? "text-foreground" : "text-muted-foreground"}`}>
                        {label}
                      </span>
                    </div>
                    <PermToggle
                      checked={permissions[key]}
                      onChange={() => togglePerm(key)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-11 rounded-xl border-border"
                onClick={onClose}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 h-11 rounded-xl bg-primary shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <><Loader2 className="mr-2 size-4 animate-spin" /> Saving...</>
                ) : (
                  <><ShieldCheck className="mr-2 size-4" /> Save Changes</>
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─── Member Card ──────────────────────────────────────────────────────────────

function MemberCard({
  member,
  onEdit,
  onRemove,
}: {
  member: TeamMember
  onEdit: (m: TeamMember) => void
  onRemove: (id: number) => void
}) {
  const activePerms = Object.values(member.permissions).filter(Boolean).length

  return (
    <Card className="group overflow-hidden border-border bg-card transition-all hover:shadow-lg hover:shadow-primary/5">
      <CardContent className="p-0">
        <div className="flex flex-col">
          {/* Header banner */}
          <div className="h-20 bg-muted/30 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle, var(--primary) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            {/* Avatar */}
            <div className="absolute -bottom-8 left-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-card bg-primary text-xl font-bold text-primary-foreground shadow-sm">
                {member.avatar}
              </div>
            </div>
            {/* Actions */}
            <div className="absolute top-3 right-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg bg-card/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-xl">
                  <DropdownMenuLabel>Member Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="rounded-lg cursor-pointer"
                    onClick={() => onEdit(member)}
                  >
                    <UserCog className="mr-2 size-4" /> Edit Role & Access
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="rounded-lg cursor-pointer text-destructive focus:text-destructive"
                    onClick={() => onRemove(member.id)}
                  >
                    <Trash2 className="mr-2 size-4" /> Remove Member
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Body */}
          <div className="pt-10 pb-6 px-6">
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <h3 className="text-lg font-bold tracking-tight text-foreground">{member.name}</h3>
                <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
                  <Briefcase className="size-3.5" />
                  {member.role}
                </div>
              </div>
              <Badge
                variant={member.status === "Active" ? "default" : "secondary"}
                className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
              >
                {member.status}
              </Badge>
            </div>

            {/* Contact info */}
            <div className="mt-5 space-y-2.5">
              {[
                { icon: Mail,   text: member.email },
                { icon: Phone,  text: member.phone },
                { icon: MapPin, text: member.location },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted/50">
                    <Icon className="size-3.5" />
                  </div>
                  <span className="truncate">{text}</span>
                </div>
              ))}
            </div>

            {/* Role chip + permissions summary */}
            <div className="mt-5 flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-bold ${ROLE_COLORS[member.systemRole]}`}
              >
                <Lock className="size-3" />
                {member.systemRole}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-muted text-xs font-semibold text-muted-foreground">
                <Eye className="size-3" />
                {activePerms}/{MODULE_META.length} modules
              </span>
            </div>

            {/* Footer */}
            <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Projects</span>
                <span className="text-sm font-bold text-foreground">{member.projects} Managed</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-8 rounded-xl border-border text-xs font-semibold gap-1.5 hover:border-primary/50 hover:text-primary transition-all"
                onClick={() => onEdit(member)}
              >
                <UserCog className="size-3.5" />
                Edit Access
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────

interface TeamProps {
  members: TeamMember[]
  onSave: (updated: TeamMember) => void
  onRemove: (id: number) => void
}

export function Team({ members, onSave, onRemove }: TeamProps) {
  const [editing, setEditing] = useState<TeamMember | null>(null)

  // Role summary bar
  const roleCounts = members.reduce<Record<string, number>>((acc, m) => {
    acc[m.systemRole] = (acc[m.systemRole] ?? 0) + 1
    return acc
  }, {})

  return (
    <>
      {/* Role summary strip */}
      <div className="mb-6 flex flex-wrap gap-3">
        {(Object.keys(ROLE_PRESETS) as SystemRole[]).map((r) => (
          <div
            key={r}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-semibold ${ROLE_COLORS[r]}`}
          >
            <Lock className="size-3.5" />
            {r}
            <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-current/20 px-1 text-xs font-bold">
              {roleCounts[r] ?? 0}
            </span>
          </div>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: i * 0.05 }}
          >
            <MemberCard
              member={member}
              onEdit={setEditing}
              onRemove={onRemove}
            />
          </motion.div>
        ))}
      </div>

      {/* Edit modal */}
      {editing && (
        <EditRoleModal
          member={editing}
          onClose={() => setEditing(null)}
          onSave={onSave}
        />
      )}
    </>
  )
}