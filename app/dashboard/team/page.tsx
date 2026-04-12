"use client"

import { Team, seedMembers, type TeamMember } from "@/components/team"
import { motion } from "framer-motion"
import { Users, UserPlus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { AddMemberModal } from "./AddMemberModal"
import { fetchUsers, deleteUser } from "@/lib/api"
import { toast } from "sonner"

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true)
        const data = await fetchUsers()
        const mappedMembers: TeamMember[] = data.map((u: any) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
          status: u.status || "offline",
          avatar: u.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}`,
          lastActive: u.lastActive ? new Date(u.lastActive).toLocaleDateString() : "Never",
        }))
        setMembers(mappedMembers)
      } catch (error) {
        console.error(error)
        setMembers(seedMembers)
        toast.error("Connected to local simulation. Real database fetch failed.")
      } finally {
        setLoading(false)
      }
    }
    getUsers()
  }, [])

  const handleAddMember = (newMember: TeamMember) => {
    setMembers(prev => [newMember, ...prev])
  }

  const handleSaveMember = (updated: TeamMember) => {
    setMembers(prev => prev.map(m => m.id === updated.id ? updated : m))
    toast.info("Profile update saved (local session).")
  }

  const handleRemoveMember = async (id: string | number) => {
    try {
      await deleteUser(id.toString())
      setMembers(prev => prev.filter(m => m.id !== id))
      toast.success("Member removed from database")
    } catch (error: any) {
      toast.error(error.message || "Failed to remove member")
    }
  }

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
            <Users className="size-5 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Organization</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Team Members
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your architects, engineers, and sales representative team.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            size="lg" 
            onClick={() => setModalOpen(true)}
            className="h-12 rounded-xl bg-primary px-6 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
          >
            <UserPlus className="mr-2 size-5" />
            Invite Member
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-1"
      >
        {loading ? (
          <div className="flex h-[400px] w-full items-center justify-center">
            <Loader2 className="size-10 animate-spin text-primary" />
          </div>
        ) : (
          <Team 
            members={members} 
            onSave={handleSaveMember} 
            onRemove={handleRemoveMember} 
          />
        )}
      </motion.div>

      <AddMemberModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onAdd={handleAddMember} 
      />
    </div>
  )
}