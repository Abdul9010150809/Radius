"use client"

import { AppShell } from "@/components/layout/AppShell"
import { ProfileView } from "@/components/common/ProfileView"

export default function StudentProfilePage() {
  return (
    <AppShell title="Student Profile" subtitle="Your digital portfolio and stats">
      <div className="mt-4">
        <ProfileView />
      </div>
    </AppShell>
  )
}
