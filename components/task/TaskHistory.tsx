"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TaskHistory() {
  const history = [
    { text: "Status changed to In Progress", time: "Yesterday" },
    { text: "Assigned to Sarah Chen", time: "2 days ago" },
    { text: "Priority set to High", time: "2 days ago" },
  ]
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task History</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative border-s">
          {history.map((h, i) => (
            <li key={i} className="ms-6 mb-4">
              <span className="absolute -start-1.5 mt-1 size-3 rounded-full bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)]" />
              <div className="text-sm">{h.text}</div>
              <div className="text-xs text-muted-foreground">{h.time}</div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}


