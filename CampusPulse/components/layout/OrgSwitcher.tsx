"use client"

import { Building2 } from "lucide-react"
import { useMemo } from "react"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"

export function OrgSwitcher() {
  const { tenants, activeTenantId, setActiveTenant } = useAppStore()
  const activeTenant = useMemo(
    () => tenants.find((t) => t.id === activeTenantId) ?? tenants[0],
    [tenants, activeTenantId]
  )

  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm text-slate-100">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-200">
        <Building2 className="h-4 w-4" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-slate-400">Organization</span>
        <Select
          value={activeTenant?.id}
          onChange={(e) => setActiveTenant(e.target.value)}
          className="bg-transparent text-white focus:outline-none"
        >
          {tenants.map((tenant) => (
            <option key={tenant.id} value={tenant.id} className="bg-slate-900 text-slate-100">
              {tenant.name} · {tenant.plan.name}
            </option>
          ))}
        </Select>
      </div>
    </div>
  )
}
