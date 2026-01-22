"use client"

import { useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { useAppStore } from "@/lib/store"

export function BillingChips() {
  const { tenants, activeTenantId } = useAppStore()
  const tenant = useMemo(() => tenants.find((t) => t.id === activeTenantId) ?? tenants[0], [tenants, activeTenantId])

  if (!tenant) return null

  const seatLabel = `${tenant.usage.seatsUsed}/${tenant.plan.seats} seats`
  const scansLabel = `${tenant.usage.scans.toLocaleString()} scans/mo`
  const mauLabel = `${tenant.usage.monthlyActiveUsers.toLocaleString()} MAU`

  return (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-indigo-500/15 text-indigo-100 border border-indigo-500/40">{tenant.plan.name} plan</Badge>
      <Badge variant="outline" className="border-slate-700 text-slate-100 bg-slate-900/60">{seatLabel}</Badge>
      <Badge variant="outline" className="border-slate-700 text-slate-100 bg-slate-900/60">{scansLabel}</Badge>
      <Badge variant="outline" className="border-slate-700 text-slate-100 bg-slate-900/60">{mauLabel}</Badge>
    </div>
  )
}
