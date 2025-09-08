"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TimelineItem { title: string; date: string; }

export default function ProjectTimeline({ items = [] as TimelineItem[] }) {
  const demo = items.length ? items : [
    { title: "Kickoff", date: "Sep 01" },
    { title: "Design Complete", date: "Sep 18" },
    { title: "MVP", date: "Oct 05" },
    { title: "Launch", date: "Oct 20" },
  ]
  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative border-s">
          {demo.map((t, i) => (
            <li key={i} className="ms-6 mb-4">
              <span className="absolute -start-1.5 mt-1 size-3 rounded-full bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)]" />
              <div className="font-medium">{t.title}</div>
              <div className="text-xs text-muted-foreground">{t.date}</div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}



