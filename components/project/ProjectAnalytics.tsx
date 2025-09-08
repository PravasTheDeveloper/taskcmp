"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"

const COLORS = ["#6366F1", "#A78BFA", "#22C55E", "#F59E0B", "#EF4444"]

export default function ProjectAnalytics() {
  const taskData = [
    { name: "Completed", value: 58 },
    { name: "Pending", value: 42 },
  ]

  const budgetData = [
    { name: "Week 1", actual: 8, budget: 10 },
    { name: "Week 2", actual: 12, budget: 10 },
    { name: "Week 3", actual: 9, budget: 10 },
    { name: "Week 4", actual: 11, budget: 10 },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Task Completion</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={taskData} dataKey="value" nameKey="name" outerRadius={80} label>
                {taskData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Budget Tracking</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={budgetData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="budget" fill="#A78BFA" />
              <Bar dataKey="actual" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}



