"use client"

import { ArrowRight, CheckCircle2, Shield, Sparkles, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const FEATURES = [
  {
    title: "Multi-tenant control",
    body: "Segment campuses, regions, and programs with org-level RBAC and usage visibility.",
    icon: <Shield className="h-5 w-5 text-indigo-300" />,
  },
  {
    title: "Realtime attendance",
    body: "QR-based entry, fraud checks, and live command center for ops teams.",
    icon: <Users className="h-5 w-5 text-indigo-300" />,
  },
  {
    title: "Engagement intelligence",
    body: "See leading indicators for drop-off, capacity risks, and team health.",
    icon: <Sparkles className="h-5 w-5 text-indigo-300" />,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-930 to-slate-900 text-slate-100">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-200">CP</div>
          <span>CampusPulse</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Button variant="ghost" className="text-slate-200" asChild>
            <a href="/">App</a>
          </Button>
          <Button variant="ghost" className="text-slate-200" asChild>
            <a href="/admin/chatbot">AI Assistant</a>
          </Button>
          <Button asChild className="bg-indigo-500 text-white hover:bg-indigo-600">
            <a href="/">Launch Console</a>
          </Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-16">
        <section className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr] items-center py-10">
          <div className="space-y-6">
            <Badge variant="outline" className="border-indigo-400/60 bg-indigo-500/10 text-indigo-100">B2B SaaS for campuses</Badge>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Run attendance, engagement, and team-building from one console.</h1>
            <p className="text-lg text-slate-300">CampusPulse gives universities realtime visibility into events, student engagement, and cross-campus programs—with AI assistance and enterprise-grade controls.</p>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-indigo-500 text-white hover:bg-indigo-600" asChild>
                <a href="/">Open Dashboard</a>
              </Button>
              <Button variant="outline" className="border-slate-700 text-slate-100" asChild>
                <a href="/admin/chatbot">Try AI Assistant</a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" />SSO-ready</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" />Seat & usage metering</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" />Audit trails</span>
            </div>
          </div>

          <Card className="border-slate-800 bg-slate-900/70 shadow-xl">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Live organization</p>
                  <p className="text-xl font-semibold text-white">EduPlus Consortium</p>
                </div>
                <Badge variant="outline" className="border-emerald-500/50 bg-emerald-500/10 text-emerald-100">Up 12% WoW</Badge>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-sm text-slate-300">Attendance today</p>
                <div className="mt-2 flex items-end gap-3 text-3xl font-bold">3,847 <span className="text-sm text-emerald-300">+8.2%</span></div>
                <p className="text-xs text-slate-500">2 events over 90% capacity · zero scanner issues</p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3">
                  <p className="text-slate-400">Engagement</p>
                  <p className="text-lg font-semibold">94.2%</p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3">
                  <p className="text-slate-400">Scans/mo</p>
                  <p className="text-lg font-semibold">45,800</p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3">
                  <p className="text-slate-400">Seats used</p>
                  <p className="text-lg font-semibold">143/250</p>
                </div>
              </div>
              <Button className="w-full" variant="outline">
                View analytics <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="border-slate-800 bg-slate-900/70">
              <CardContent className="space-y-3 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="text-sm text-slate-300">{feature.body}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  )
}
