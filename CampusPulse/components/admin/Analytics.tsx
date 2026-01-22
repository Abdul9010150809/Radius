"use client"

import React, { useMemo, useState } from "react"
import { motion } from "framer-motion"
import {
  BarChart3,
  Users,
  TrendingUp,
  Download,
  Calendar,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, THead, TR, TH, TBody, TD } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { ANALYTICS_DATA } from "@/lib/constants"

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f97316", "#14b8a6", "#22c55e"]
const COLOR_CLASSES = [
  "bg-indigo-400",
  "bg-violet-400",
  "bg-pink-400",
  "bg-orange-400",
  "bg-teal-400",
  "bg-green-400",
]

export function AnalyticsView() {
  const [sortBy, setSortBy] = useState<"department" | "attendance" | "engagement">("attendance")
  const [direction, setDirection] = useState<"asc" | "desc">("desc")
  const [page, setPage] = useState(0)
  const pageSize = 3

  const sorted = useMemo(() => {
    const data = [...ANALYTICS_DATA]
    return data.sort((a, b) => {
      const valueA = a[sortBy]
      const valueB = b[sortBy]
      if (valueA === valueB) return 0
      const compare = valueA > valueB ? 1 : -1
      return direction === "asc" ? compare : -compare
    })
  }, [sortBy, direction])

  const pageCount = Math.ceil(sorted.length / pageSize)
  const paged = sorted.slice(page * pageSize, page * pageSize + pageSize)

  const toggleSort = (key: typeof sortBy) => {
    if (sortBy === key) {
      setDirection((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortBy(key)
      setDirection("desc")
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Department-wise attendance and engagement metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="rounded-lg border bg-background px-3 py-2 text-sm" aria-label="Select time period for analytics">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
          </select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total Attendance", value: "3,847", icon: Users, color: "text-indigo-300" },
          { label: "Engagement Rate", value: "94.2%", icon: TrendingUp, color: "text-emerald-300" },
          { label: "Active Events", value: "24", icon: Calendar, color: "text-purple-300" },
          { label: "Avg. Duration", value: "2.4h", icon: BarChart3, color: "text-orange-300" },
        ].map((stat, i) => (
          <motion.div key={i} variants={item}>
            <Card className="border-slate-800 bg-slate-900/60">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.1em] text-slate-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`rounded-full bg-slate-800 p-3 ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Department Attendance Bar Chart */}
        <motion.div variants={item}>
          <Card className="h-full border-slate-800 bg-slate-900/60">
            <CardHeader>
              <CardTitle>Department-wise Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{ attendance: { label: "Attendance" } }}
                className="h-[300px]"
                role="img"
                aria-label="Department-wise attendance bar chart"
                tabIndex={0}
              >
                <BarChart data={ANALYTICS_DATA}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="department" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(222 47% 11%)",
                      border: "1px solid hsl(217 91% 60%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="attendance" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Engagement Line Chart */}
        <motion.div variants={item}>
          <Card className="h-full border-slate-800 bg-slate-900/60">
            <CardHeader>
              <CardTitle>Engagement Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{ engagement: { label: "Engagement" } }}
                className="h-[300px]"
                role="img"
                aria-label="Engagement trends line chart"
                tabIndex={0}
              >
                <LineChart data={ANALYTICS_DATA}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="department" className="text-xs" />
                  <YAxis className="text-xs" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(222 47% 11%)",
                      border: "1px solid hsl(217 91% 60%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="engagement"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ fill: "#22c55e" }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item}>
        <Card className="border-slate-800 bg-slate-900/60">
          <CardHeader>
            <CardTitle>Department Table (Sortable & Paginated)</CardTitle>
            <p className="text-sm text-slate-400">Tap a column to sort; 3 rows per page.</p>
          </CardHeader>
          <CardContent>
            <Table>
              <THead>
                <TH onClick={() => toggleSort("department")}>Department {sortBy === "department" ? (direction === "asc" ? "↑" : "↓") : ""}</TH>
                <TH onClick={() => toggleSort("attendance")}>Attendance {sortBy === "attendance" ? (direction === "asc" ? "↑" : "↓") : ""}</TH>
                <TH onClick={() => toggleSort("engagement")}>Engagement % {sortBy === "engagement" ? (direction === "asc" ? "↑" : "↓") : ""}</TH>
              </THead>
              <TBody>
                {paged.map((row) => (
                  <TR key={row.department}>
                    <TD className="font-semibold text-white">{row.department}</TD>
                    <TD>{row.attendance}</TD>
                    <TD className="text-emerald-300">{row.engagement}%</TD>
                  </TR>
                ))}
              </TBody>
            </Table>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
              <span>
                Page {page + 1} of {pageCount}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 0}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                >
                  Prev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page + 1 >= pageCount}
                  onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs for additional insights */}
      <motion.div variants={item}>
        <Tabs defaultValue="breakdown" className="w-full">
          <TabsList>
            <TabsTrigger value="breakdown">Event Breakdown</TabsTrigger>
            <TabsTrigger value="trends">Weekly Trends</TabsTrigger>
            <TabsTrigger value="top">Top Performers</TabsTrigger>
          </TabsList>
          <TabsContent value="breakdown" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Pie Chart */}
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                            <Pie
                              data={ANALYTICS_DATA}
                              dataKey="attendance"
                              nameKey="department"
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              label
                            >
                              {ANALYTICS_DATA.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  {/* Legend */}
                  <div className="space-y-3">
                    <h4 className="font-medium">Attendance Distribution</h4>
                    {ANALYTICS_DATA.map((entry, index) => (
                      <div key={entry.department} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "h-3 w-3 rounded-full",
                              COLOR_CLASSES[index % COLOR_CLASSES.length]
                            )}
                          />
                          <span className="text-sm">{entry.department}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{entry.attendance}</span>
                          <Badge variant="secondary">
                            {Math.round((entry.attendance / 1600) * 100)}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="trends" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { day: "Mon", attendance: 450 },
                        { day: "Tue", attendance: 380 },
                        { day: "Wed", attendance: 520 },
                        { day: "Thu", attendance: 480 },
                        { day: "Fri", attendance: 620 },
                        { day: "Sat", attendance: 380 },
                        { day: "Sun", attendance: 290 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="attendance" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="top" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { name: "Hackathon 2024", attendance: 245, engagement: 98 },
                    { name: "Career Fair", attendance: 520, engagement: 92 },
                    { name: "AI/ML Symposium", attendance: 180, engagement: 95 },
                    { name: "Code Workshop", attendance: 45, engagement: 100 },
                  ].map((event, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg font-bold">
                          {i + 1}
                        </div>
                        <div>
                          <p className="font-medium">{event.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {event.attendance} attendees
                          </p>
                        </div>
                      </div>
                      <Badge variant="success">{event.engagement}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}

