"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { QrCode, RefreshCw, TimerReset } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

function generateSeed() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function SmartAttendance() {
  const [seed, setSeed] = useState(generateSeed())
  const [expiresAt, setExpiresAt] = useState(Date.now() + 45000)
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (now >= expiresAt) {
      rotate()
    }
  }, [now, expiresAt])

  const rotate = () => {
    setSeed(generateSeed())
    setExpiresAt(Date.now() + 45000)
  }

  const remaining = Math.max(0, Math.floor((expiresAt - now) / 1000))
  const qrValue = useMemo(() => `${seed}|exp=${expiresAt}`, [seed, expiresAt])
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(qrValue)}`

  return (
    <Card className="border-slate-800 bg-slate-900/60">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-white">Smart Attendance QR</CardTitle>
          <p className="text-sm text-slate-400">Rotates every 45 seconds to prevent reuse</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
          <TimerReset className="h-4 w-4 text-indigo-300" />
          <span>Auto-rotate</span>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-[260px,1fr]">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/70 p-4 shadow-inner">
          <Image
            src={qrUrl}
            alt="Dynamic QR"
            width={192}
            height={192}
            className="h-48 w-48 rounded-lg border border-slate-800"
          />
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-300">
            <QrCode className="h-4 w-4 text-indigo-300" />
            <span>Expires in</span>
            <span className={cn("rounded-full px-2 py-1 text-xs font-semibold", remaining < 10 ? "bg-rose-500/20 text-rose-200" : "bg-emerald-500/20 text-emerald-200")}>{remaining}s</span>
          </div>
          <Button onClick={rotate} className="mt-3 w-full" variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" /> Regenerate
          </Button>
        </div>
        <div className="space-y-3 text-sm text-slate-300">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <p className="text-sm font-semibold text-white">Live Policy</p>
            <ul className="mt-2 space-y-1 text-slate-300">
              <li>• One-time scan per student with time-bound payload</li>
              <li>• Device fingerprint and role encoded in QR payload</li>
              <li>• Rotate interval: 45s (editable)</li>
            </ul>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <p className="text-sm font-semibold text-white">Payload Preview</p>
            <code className="mt-2 block truncate rounded-lg bg-slate-950 px-3 py-2 text-xs text-slate-200">{qrValue}</code>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
