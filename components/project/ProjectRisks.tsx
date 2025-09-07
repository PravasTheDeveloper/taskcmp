"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Risk { title: string; level: "Low" | "Medium" | "High"; owner: string }

export default function ProjectRisks({ items = [] as Risk[] }) {
  const demo: Risk[] = items.length ? items : [
    { title: "Payment provider SLAs", level: "Medium", owner: "Emma" },
    { title: "Design assets delay", level: "High", owner: "Mike" },
  ]
  const color = (l: Risk["level"]) => l === "High" ? "bg-red-100 text-red-700" : l === "Medium" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-700"
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risks & Issues</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {demo.map((r, i) => (
          <div key={i} className="rounded border p-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{r.title}</div>
              <div className="text-xs text-muted-foreground">Owner: {r.owner}</div>
            </div>
            <Badge className={color(r.level)} variant="secondary">{r.level}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}


