"use client"

import { AppShell } from "@/components/layout/AppShell"

export default function AdminSettingsPage() {
  return (
    <AppShell title="Settings" subtitle="Organization and application settings">
      <p className="mt-2 text-sm text-muted-foreground">Organization and application settings for admins.</p>
    </AppShell>
  )
}
