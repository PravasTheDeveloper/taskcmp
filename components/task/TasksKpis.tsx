"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TasksKpis({ total = 58, inProgress = 22, notStarted = 18, completed = 18, overdue = 6 }: { total?: number; inProgress?: number; notStarted?: number; completed?: number; overdue?: number }) {
  const items = [
    { label: "Total", value: total },
    { label: "In Progress", value: inProgress },
    { label: "Not Started", value: notStarted },
    { label: "Completed", value: completed },
    { label: "Overdue", value: overdue },
  ]
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {items.map((i) => (
        <Card key={i.label} className="hover:shadow-sm transition-shadow">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">{i.label}</CardTitle>
            <CardDescription>&nbsp;</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{i.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


