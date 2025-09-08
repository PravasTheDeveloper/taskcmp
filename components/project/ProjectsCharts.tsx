"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts"

export default function ProjectsCharts() {
  const velocity = [
    { name: "W1", early: 6, late: 4 },
    { name: "W2", early: 7, late: 3 },
    { name: "W3", early: 5, late: 5 },
    { name: "W4", early: 8, late: 2 },
  ]

  const completion = [
    { name: "Running", value: 12 },
    { name: "Queue", value: 9 },
    { name: "Requests", value: 6 },
    { name: "Completed", value: 15 },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Schedule Performance (Early vs Late)</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={velocity}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="early" stroke="#22C55E" strokeWidth={2} />
              <Line type="monotone" dataKey="late" stroke="#EF4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={completion}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}



