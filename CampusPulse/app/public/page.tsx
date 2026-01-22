"use client"

import { motion } from "framer-motion"
import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { EventDiscovery } from "@/components/student/EventDiscovery"
import { useAppStore } from "@/lib/store"
import { Badge } from "@/components/ui/badge"
import { Lock } from "lucide-react"
import { AppShell } from "@/components/layout/AppShell"

export default function PublicPage() {
  return (
    <AppShell title="Public Events" subtitle="Browse campus events (Sign in for full access)">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Public Events</h1>
          <p className="text-sm text-slate-400">Browse campus events (Sign in for full access)</p>
        </div>
        <Badge variant="outline" className="border-amber-500/60 bg-amber-500/10 text-amber-200">
          <Lock className="mr-1 h-3 w-3" />
          Limited Access
        </Badge>
      </div>

      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
        <p className="text-sm text-slate-300">
          You&apos;re viewing in <strong>Public mode</strong>. Sign in with your university email to access team recruitment, attendance tracking, and more.
        </p>
      </div>

      <EventDiscovery />
    </AppShell>
  )
}
