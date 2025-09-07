"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

type Status = "not-started" | "in-progress" | "completed"

export default function TaskOverview() {
  const [status, setStatus] = React.useState<Status>("in-progress")
  const [priority, setPriority] = React.useState<"High" | "Medium" | "Low">("High")
  const [progress, setProgress] = React.useState(45)
  const [estimate, setEstimate] = React.useState("12h")
  const inProgress = status !== "completed"

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Task Overview</CardTitle>
        <CardDescription>Manage core details and status</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Assigned Developer</div>
          <div className="flex items-center gap-2">
            <Avatar className="size-8"><AvatarImage /><AvatarFallback>SC</AvatarFallback></Avatar>
            <a className="text-sm underline" href="#">Sarah Chen</a>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Deadline</div>
          <div className="text-sm">Oct 18, 2024</div>
        </div>
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Status</div>
          <Select value={status} onValueChange={(v) => setStatus(v as Status)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="not-started">Not Started</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Priority</div>
          <Select value={priority} onValueChange={(v: "High" | "Medium" | "Low") => setPriority(v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Estimated Time</div>
          <Input value={estimate} onChange={(e) => setEstimate(e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <div className="text-sm text-muted-foreground mb-1">Progress</div>
          <Progress value={progress} className={inProgress ? "bg-amber-100" : "bg-green-100"} />
          <div className="text-xs text-muted-foreground mt-1">{progress}% complete</div>
          <div className="flex gap-2 mt-3">
            <Button size="sm" variant="outline" onClick={() => setProgress(Math.max(0, progress - 5))}>-5%</Button>
            <Button size="sm" variant="outline" onClick={() => setProgress(Math.min(100, progress + 5))}>+5%</Button>
          </div>
        </div>
        <div className="sm:col-span-2">
          <div className="text-sm text-muted-foreground mb-1">Description</div>
          <div className="text-sm">Create responsive mockups for the checkout and product pages. Ensure accessibility and performance best practices.</div>
        </div>
      </CardContent>
    </Card>
  )
}


