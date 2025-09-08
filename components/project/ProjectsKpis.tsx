"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProjectsKpis({
  total = 42,
  running = 12,
  queue = 9,
  requests = 6,
  completed = 15,
}: {
  total?: number; running?: number; queue?: number; requests?: number; completed?: number
}) {
  const items = [
    { label: "Total", value: total },
    { label: "Running", value: running },
    { label: "In Queue", value: queue },
    { label: "Requests", value: requests },
    { label: "Completed", value: completed },
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



