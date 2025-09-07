"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Log = { id: number; hours: number; note?: string; time: string }

export default function TaskTimeLogs() {
  const [logs, setLogs] = React.useState<Log[]>([{ id: 1, hours: 2, note: "Wireframes", time: "1h ago" }])
  const [hours, setHours] = React.useState(1)
  const [note, setNote] = React.useState("")

  function addLog() {
    setLogs([{ id: Date.now(), hours, note, time: "Just now" }, ...logs])
    setHours(1)
    setNote("")
  }

  const total = logs.reduce((s, l) => s + l.hours, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Time Tracking</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Input type="number" min={0} step={0.5} value={hours} onChange={(e) => setHours(Number(e.target.value))} className="w-32" />
          <Input placeholder="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
          <Button onClick={addLog} className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white">Add Time Log</Button>
        </div>
        <div className="text-sm text-muted-foreground">Total: {total}h</div>
        <div className="space-y-2">
          {logs.map((l) => (
            <div key={l.id} className="rounded border p-2 text-sm flex items-center justify-between">
              <div>
                <div className="font-medium">{l.hours}h {l.note ? `• ${l.note}` : ""}</div>
                <div className="text-xs text-muted-foreground">{l.time}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


