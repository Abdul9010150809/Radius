"use client"

import { AppShell } from "@/components/layout/AppShell"
import { AttendanceScanner } from "@/components/admin/AttendanceScanner"

export default function AttendancePage() {
  return (
    <AppShell title="Attendance" subtitle="Dynamic QR code generator and scanner">
      <AttendanceScanner />
    </AppShell>
  )
}
