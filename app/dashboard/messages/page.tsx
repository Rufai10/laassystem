"use client"

import { Messages } from "@/components/messages"
import { motion } from "framer-motion"
import { MessageSquare, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MessagesPage() {
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
            <MessageSquare className="size-5 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Communication Hub</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Customer Messages
          </h1>
          <p className="text-lg text-muted-foreground">
            Send SMS and Email reminders, and manage all customer conversations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button size="lg" className="h-12 rounded-xl bg-primary px-6 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30">
            <Send className="mr-2 size-5" />
            Compose New
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-1"
      >
        <Messages />
      </motion.div>
    </div>
  )
}