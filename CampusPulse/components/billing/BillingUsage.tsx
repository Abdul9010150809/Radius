"use client"

import { useMemo } from "react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export function BillingUsage() {
  const { tenants, activeTenantId } = useAppStore()
  const tenant = useMemo(
    () => tenants.find((t) => t.id === activeTenantId) ?? tenants[0],
    [tenants, activeTenantId]
  )

  if (!tenant) return null

  const seatPct = Math.min(100, (tenant.usage.seatsUsed / tenant.plan.seats) * 100)
  const scanPct = Math.min(100, tenant.usage.scans / 50000 * 100)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white">{tenant.name}</CardTitle>
            <p className="text-sm text-slate-400">{tenant.plan.name} Plan · Billed to {tenant.billingEmail}</p>
          </div>
          <Badge variant="outline" className="border-indigo-500/60 text-indigo-200 bg-indigo-500/10">
            {tenant.plan.name}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-200">
          <div className="flex items-center justify-between">
            <span>Seats used</span>
            <span className="font-semibold">{tenant.usage.seatsUsed}/{tenant.plan.seats}</span>
          </div>
          <Progress value={seatPct} className="h-2" />
          <div className="flex items-center justify-between">
            <span>QR scans this month</span>
            <span className="font-semibold">{tenant.usage.scans.toLocaleString()}</span>
          </div>
          <Progress value={scanPct} className="h-2" />
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Overage</span>
            <span>${tenant.plan.overagePerUnit}/1k scans beyond quota</span>
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="default" className="flex-1">Upgrade</Button>
            <Button variant="outline" className="flex-1">Manage billing</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader>
          <CardTitle className="text-white">Security & Compliance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-200">
          <div className="flex items-center justify-between">
            <span>SSO</span>
            <Badge variant="secondary" className={cn(tenant.plan.name === 'Enterprise' ? 'bg-emerald-500/20 text-emerald-100' : 'bg-amber-500/20 text-amber-100')}>
              {tenant.plan.name === 'Enterprise' ? 'Enabled' : 'Available on Enterprise'}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Audit Logs</span>
            <Badge variant="secondary" className="bg-indigo-500/20 text-indigo-100">Live</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Data Regions</span>
            <span className="text-slate-300">US-East (default)</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Export & Backup</span>
            <Badge variant="outline" className="border-slate-700 text-slate-200">Scheduled</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
