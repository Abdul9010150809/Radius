"use client"

import { motion } from "framer-motion"
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn, trendColor } from "@/lib/utils"

const defaultSeries = [18, 22, 20, 24, 28, 26, 30]

export function KPICard({
  label,
  value,
  change,
  Icon,
  accent = "indigo",
  series = defaultSeries,
}: {
  label: string
  value: string | number
  change: number
  Icon: LucideIcon
  accent?: "indigo" | "emerald"
  series?: number[]
}) {
  const isPositive = change >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.08em] text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
          <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
            <Badge variant={isPositive ? "success" : "destructive"} className="rounded-full px-2 py-0">
              {isPositive ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
              {change}%
            </Badge>
            <span>vs last week</span>
          </div>
        </div>
        <div className={cn("rounded-2xl p-3", accent === "indigo" ? "bg-indigo-500/15 text-indigo-200" : "bg-emerald-500/15 text-emerald-200") }>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="mt-4 h-16">
        <Sparkline data={series} color={accent === "indigo" ? "#818cf8" : "#34d399"} />
      </div>
    </motion.div>
  )
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * 100
      const y = 100 - ((val - min) / (max - min || 1)) * 100
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <defs>
        <linearGradient id={`spark-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        fill={`url(#spark-${color})`}
        stroke={color}
        strokeWidth="2"
        points={`0,100 ${points} 100,100`}
        strokeLinejoin="round"
        className="opacity-80"
      />
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        points={points}
        strokeLinecap="round"
      />
    </svg>
  )
}
