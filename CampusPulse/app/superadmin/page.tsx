"use client"

import { AppShell } from "@/components/layout/AppShell"
import { PlatformMetrics } from "@/components/superadmin/PlatformMetrics"
import { UniversityTable } from "@/components/superadmin/UniversityTable"
import { RevenueChart } from "@/components/superadmin/RevenueChart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SuperAdminPage() {
  return (
    <AppShell title="Platform Overview" subtitle="Manage universities and monitor platform health">
        <section aria-label="Platform metrics"> 
          <PlatformMetrics />
        </section>

        <div className="grid gap-6 lg:grid-cols-2" role="region" aria-label="Revenue and health">
          <div>
            <RevenueChart />
          </div>
        <Card className="border-slate-800 bg-slate-900/50">
          <CardHeader>
            <CardTitle className="text-white">Platform Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <HealthMetric label="API Response Time" value="145ms" status="good" />
            <HealthMetric label="Uptime" value="99.98%" status="good" />
            <HealthMetric label="Active Sessions" value="2,847" status="normal" />
            <HealthMetric label="Error Rate" value="0.02%" status="good" />
          </CardContent>
        </Card>
      </div>

      <section aria-label="Universities list">
        <h2 className="mb-4 text-xl font-semibold text-white">Universities</h2>
        <UniversityTable />
      </section>
    </AppShell>
  )
}

function HealthMetric({ 
  label, 
  value, 
  status 
}: { 
  label: string
  value: string
  status: 'good' | 'warning' | 'normal'
}) {
  const colors = {
    good: 'text-emerald-400',
    warning: 'text-amber-400',
    normal: 'text-blue-400',
  }

  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-300">{label}</span>
      <span className={`font-semibold ${colors[status]}`}>{value}</span>
    </div>
  )
}
