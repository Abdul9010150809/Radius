"use client"

import { useMemo, useState } from "react"
import { Bot, Send, Sparkles, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"

const SUGGESTIONS = [
  "Summarize today's attendance anomalies",
  "Draft an announcement for tomorrow's career fair",
  "Create a checklist for live event ops",
  "List top 5 engaged departments this week",
]

type Message = {
  id: string
  sender: "user" | "bot"
  text: string
  ts: string
}

export default function ChatbotPage() {
  const { tenants, activeTenantId } = useAppStore()
  const tenant = useMemo(() => tenants.find((t) => t.id === activeTenantId) ?? tenants[0], [tenants, activeTenantId])

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      sender: "bot",
      text: `Hi! I'm your CampusPulse assistant. I'm scoped to ${tenant?.name ?? "your org"}. Ask me about attendance, live feed, or ops playbooks.`,
      ts: "09:00",
    },
    {
      id: "m2",
      sender: "user",
      text: "Give me a quick health summary for today",
      ts: "09:01",
    },
    {
      id: "m3",
      sender: "bot",
      text: "Sure. Attendance trending +8% vs last week. 2 events over 90% capacity. Live feed stable. No scanner errors in the last hour.",
      ts: "09:02",
    },
  ])
  const [draft, setDraft] = useState("")

  const handleSend = () => {
    if (!draft.trim()) return
    const userMessage: Message = {
      id: crypto.randomUUID(),
      sender: "user",
      text: draft.trim(),
      ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    const botMessage: Message = {
      id: crypto.randomUUID(),
      sender: "bot",
      text: "(Mock reply) I'll route this to the assistant once backend is connected.",
      ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages((prev) => [...prev, userMessage, botMessage])
    setDraft("")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Bot className="h-4 w-4 text-indigo-300" />
          <span>AI Assistant · Org-scoped to {tenant?.name}</span>
          <Badge variant="outline" className="border-indigo-500/50 text-indigo-100 bg-indigo-500/10">Frontend-only</Badge>
        </div>
        <p className="text-sm text-slate-400">Use this assistant to draft announcements, summarize attendance, and pull quick ops insights.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <Card className="border-slate-800 bg-slate-900/60">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-white">Conversation</CardTitle>
            <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-100">Live mock</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="max-h-[480px] overflow-y-auto space-y-3 pr-1">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-3",
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {msg.sender === "bot" && (
                    <div className="h-8 w-8 rounded-full bg-indigo-500/20 text-indigo-200 flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-xl rounded-2xl border px-4 py-3 text-sm shadow-sm",
                      msg.sender === "user"
                        ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-50"
                        : "border-slate-800 bg-slate-900/70 text-slate-100"
                    )}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                    <span className="mt-1 block text-[11px] text-slate-400">{msg.ts}</span>
                  </div>
                  {msg.sender === "user" && (
                    <div className="h-8 w-8 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3 space-y-2">
              <Textarea
                placeholder="Ask about attendance, draft an email, or request a summary..."
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="min-h-[80px] resize-none"
              />
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Responses are mocked; connect to your LLM backend to enable.</span>
                <Button size="sm" onClick={handleSend}>
                  <Send className="mr-2 h-4 w-4" /> Send
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-slate-800 bg-slate-900/60">
            <CardHeader>
              <CardTitle className="text-white">Suggested prompts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setDraft(suggestion)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-left text-sm text-slate-100 hover:border-indigo-500"
                >
                  <div className="flex items-center gap-2 text-indigo-200">
                    <Sparkles className="h-4 w-4" />
                    <span>{suggestion}</span>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900/60">
            <CardHeader>
              <CardTitle className="text-white">Playbooks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-200">
              <div className="flex items-center justify-between">
                <span>High-capacity event response</span>
                <Badge variant="outline" className="border-slate-700 text-slate-200">Ready</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Scanner outage comms</span>
                <Badge variant="outline" className="border-slate-700 text-slate-200">Ready</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Engagement drop drill</span>
                <Badge variant="outline" className="border-slate-700 text-slate-200">Draft</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
