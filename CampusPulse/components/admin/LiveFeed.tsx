"use client"

import { useEffect, useRef, useState } from "react"
import { Radio } from "lucide-react"
import { LIVE_CHECKINS, EVENTS } from "@/lib/constants"
import { formatRelativeTime } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CheckIn {
  id: string
  name: string
  event: string
  time: Date
  avatar: string
}

export function LiveFeed() {
  const [checkIns, setCheckIns] = useState<CheckIn[]>(LIVE_CHECKINS)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const newCheckIn: CheckIn = {
        id: Date.now().toString(),
        name: `Student ${Math.floor(Math.random() * 99)}`,
        event: EVENTS[Math.floor(Math.random() * EVENTS.length)].title,
        time: new Date(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
      }
      setCheckIns((prev) => [newCheckIn, ...prev].slice(0, 12))
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.scrollTop = 0
  }, [checkIns])

  return (
    <Card className="border-slate-800 bg-slate-900/60">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-white">
            <Radio className="h-4 w-4 text-emerald-400" /> Live Check-ins
          </CardTitle>
          <p className="text-sm text-slate-400">Real-time arrivals with avatars</p>
        </div>
        <Badge variant="success" className="text-xs">
          {checkIns.length} active
        </Badge>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="h-72 space-y-3 overflow-y-auto pr-2">
          {checkIns.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-3"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={item.avatar} />
                  <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <p className="text-xs text-slate-400">{item.event}</p>
                </div>
              </div>
              <span className="text-xs text-slate-400">{formatRelativeTime(item.time)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

