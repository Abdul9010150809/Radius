"use client"

import { AppShell } from "@/components/layout/AppShell"

export default function EventsPage() {
  return (
    <AppShell title="My Events" subtitle="Your registered events and history">
      <p className="mt-2 text-sm text-muted-foreground">Your registered events and history.</p>
    </AppShell>
  )
}
