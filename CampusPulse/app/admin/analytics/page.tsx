"use client"

import { AppShell } from "@/components/layout/AppShell"
import { AnalyticsView } from "@/components/admin/Analytics"

export default function AnalyticsPage() {
  return (
    <AppShell title="Analytics" subtitle="Department attendance and engagement">
      <section aria-label="Analytics dashboard"> 
        <AnalyticsView />
      </section>
    </AppShell>
  )
}
