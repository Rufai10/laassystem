"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Mail, 
  MessageSquare, 
  Send, 
  History, 
  User, 
  AtSign, 
  Type, 
  Smartphone,
  CheckCircle2,
  Clock
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

// --- Mock Data ---
const recentMessages: any[] = []

export function Messages() {
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("email")

  const handleSend = (type: string) => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      toast.success(`${type} message has been sent!`, {
        description: `Your message has been successfully delivered to the client.`,
      })
    }, 1500)
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
      {/* Messaging Card */}
      <Card className="overflow-hidden border-border bg-card shadow-2xl rounded-3xl">
        <CardHeader className="border-b border-border bg-muted/20 p-8">
          <CardTitle className="text-2xl font-bold">Compose Message</CardTitle>
          <CardDescription>Select your channel and send a message to your customer.</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <Tabs defaultValue="email" onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 h-14 p-1.5 bg-muted rounded-2xl">
              <TabsTrigger value="email" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300">
                <Mail className="mr-2 size-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="sms" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300">
                <MessageSquare className="mr-2 size-4" />
                SMS
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent value="email" className="mt-0 space-y-6">
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email-recipient" className="text-sm font-semibold ml-1">Recipient Email</Label>
                      <div className="relative group">
                        <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input 
                          id="email-recipient" 
                          placeholder="client@laas.com" 
                          className="h-12 pl-11 rounded-xl bg-muted/30 border-border focus-visible:ring-primary/20"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email-subject" className="text-sm font-semibold ml-1">Subject</Label>
                      <div className="relative group">
                        <Type className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input 
                          id="email-subject" 
                          placeholder="New LAAS properties" 
                          className="h-12 pl-11 rounded-xl bg-muted/30 border-border focus-visible:ring-primary/20"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email-message" className="text-sm font-semibold ml-1">Message Content</Label>
                      <Textarea 
                        id="email-message" 
                        placeholder="Type your email message here..." 
                        className="min-h-[160px] rounded-xl bg-muted/30 border-border p-4 focus-visible:ring-primary/20 resize-none"
                      />
                    </div>
                  </div>
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button 
                      onClick={() => handleSend("Email")}
                      disabled={loading}
                      className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                          Sending message...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="size-5" />
                          Send Email
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </TabsContent>

                <TabsContent value="sms" className="mt-0 space-y-6">
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="sms-recipient" className="text-sm font-semibold ml-1">Phone Number</Label>
                      <div className="relative group">
                        <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input 
                          id="sms-recipient" 
                          placeholder="+1 234 567 8900" 
                          className="h-12 pl-11 rounded-xl bg-muted/30 border-border focus-visible:ring-primary/20"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="sms-message" className="text-sm font-semibold ml-1">SMS Message</Label>
                      <Textarea 
                        id="sms-message" 
                        placeholder="Type your SMS message here..." 
                        className="min-h-[160px] rounded-xl bg-muted/30 border-border p-4 focus-visible:ring-primary/20 resize-none"
                      />
                    </div>
                  </div>
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button 
                      onClick={() => handleSend("SMS")}
                      disabled={loading}
                      className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 transition-all"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                          Sending message...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <MessageSquare className="size-5" />
                          Send SMS
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>

      {/* History Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 px-2">
          <History className="size-5 text-primary" />
          <h3 className="text-xl font-bold">Recent Messages</h3>
        </div>
        <div className="grid gap-4">
          {recentMessages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:bg-accent/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${msg.type === "Email" ? "bg-blue-500/10 text-blue-500" : "bg-emerald-500/10 text-emerald-500"}`}>
                    {msg.type === "Email" ? <Mail className="size-4" /> : <MessageSquare className="size-4" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{msg.recipient}</h4>
                    {msg.subject && <p className="text-xs text-muted-foreground font-medium">Sub: {msg.subject}</p>}
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                    <Clock className="size-3" />
                    {msg.date}
                  </div>
                  <Badge variant="outline" className="rounded-full px-2 py-0 text-[10px] font-bold border-primary/20 bg-primary/5 text-primary uppercase">
                    {msg.status}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1 italic px-1">
                "{msg.preview}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

