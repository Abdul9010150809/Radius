"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const revenueData = [
  { month: 'Jan', revenue: 12500, customers: 8 },
  { month: 'Feb', revenue: 15200, customers: 9 },
  { month: 'Mar', revenue: 18900, customers: 11 },
  { month: 'Apr', revenue: 22400, customers: 13 },
  { month: 'May', revenue: 26800, customers: 15 },
  { month: 'Jun', revenue: 31200, customers: 17 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
}

export function RevenueChart() {
  return (
    <Card className="border-slate-800 bg-slate-900/50">
      <CardHeader>
        <CardTitle className="text-white">Monthly Revenue Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[300px] w-full"
          role="img"
          aria-label="Monthly revenue bar chart"
          tabIndex={0}
        >
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="month" 
              stroke="#94a3b8"
              fontSize={12}
            />
            <YAxis 
              stroke="#94a3b8"
              fontSize={12}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip content={<ChartTooltipContent />} />
            <Bar 
              dataKey="revenue" 
              fill="hsl(var(--primary))" 
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
