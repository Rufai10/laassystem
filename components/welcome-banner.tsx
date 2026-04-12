"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export function WelcomeBanner() {
  const [time, setTime] = React.useState(new Date())

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary/95 to-primary/80 p-10 text-primary-foreground shadow-2xl"
    >
      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary-foreground/80 font-bold text-xs uppercase tracking-[0.2em]">
            <Sparkles className="size-4" />
            <span>LAAS Architecture & Real Estate</span>
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Sanad Wanaagsan, Admin! 👋
            </h1>
            <p className="text-primary-foreground/70 text-lg font-medium max-w-md">
              Mashaariicdaadu waxay u socdaan si habsami leh. Waxaad haysataa <span className="text-white font-bold underline decoration-white/30 underline-offset-4">12 leads</span> oo cusub oo sugaya jawaabtaada.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:items-end bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
          <div className="text-4xl font-black tracking-tighter tabular-nums">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <p className="text-primary-foreground/80 text-xs font-bold uppercase tracking-wider mt-1">{formattedDate}</p>
        </div>
      </div>

      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 size-64 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 size-64 rounded-full bg-blue-500/10 blur-3xl" />
    </motion.div>
  )
}
