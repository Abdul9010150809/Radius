"use client"

import { AppShell } from "@/components/layout/AppShell"
import { LiveFeed } from "@/components/admin/LiveFeed"

export default function FeedPage() {
  return (
    <AppShell title="Live Feed" subtitle="Real-time check-ins and activity stream">
      <LiveFeed />
    </AppShell>
  )
}
