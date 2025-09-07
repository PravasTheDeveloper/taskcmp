"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Stat = { label: string; value: string | number; sublabel?: string }

interface ProjectStatsProps {
  stats?: Stat[]
}

const defaultStats: Stat[] = [
  { label: "Total Tasks", value: 124, sublabel: "+8 this week" },
  { label: "In Progress", value: 36 },
  { label: "Completed", value: 78 },
  { label: "Overdue", value: 10 },
]

export default function ProjectStats({ stats = defaultStats }: ProjectStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {stats.map((s, i) => (
        <Card key={i} className="hover:shadow-sm transition-shadow">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">{s.label}</CardTitle>
            {s.sublabel && <CardDescription>{s.sublabel}</CardDescription>}
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{s.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


