"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

type TaskStatus = "not-started" | "in-progress" | "completed"

interface Task {
  id: number
  name: string
  assignee: { name: string; initials: string; image?: string }
  status: TaskStatus
  deadline: string
  progress: number
}

interface ProjectTasksProps {
  tasks: Task[]
}

export default function ProjectTasks({ tasks }: ProjectTasksProps) {
  const [data] = React.useState<Task[]>(tasks)
  const [filter, setFilter] = React.useState<TaskStatus | "all">("all")

  const filtered = data.filter((t) => (filter === "all" ? true : t.status === filter))

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Tasks</CardTitle>
        <div className="flex gap-2">
          <Select onValueChange={(v: TaskStatus | "all") => setFilter(v)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="not-started">Not Started</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white">
                <Plus className="mr-2 size-4" /> Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Task</DialogTitle>
              </DialogHeader>
              <form className="grid gap-3">
                <div className="grid gap-1">
                  <Label>Task Name</Label>
                  <Input placeholder="e.g. Setup CI/CD" />
                </div>
                <div className="grid gap-1">
                  <Label>Assigned Developer</Label>
                  <Input placeholder="e.g. John Doe" />
                </div>
                <div className="grid gap-1">
                  <Label>Deadline</Label>
                  <Input type="date" />
                </div>
                <div className="grid gap-1">
                  <Label>Priority</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1">
                  <Label>Description</Label>
                  <Textarea rows={4} placeholder="Task details..." />
                </div>
                <div className="pt-2">
                  <Button type="submit" className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white w-full">Create</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-3">
          {filtered.map((t) => (
            <div key={t.id} className="rounded-lg border p-4 bg-card">
              <div className="flex flex-wrap items-center gap-3 justify-between">
                <div className="min-w-0">
                  <div className="font-medium truncate">{t.name}</div>
                  <div className="text-xs text-muted-foreground">Due {t.deadline}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Avatar className="size-7">
                    <AvatarImage src={t.assignee.image} alt={t.assignee.name} />
                    <AvatarFallback>{t.assignee.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{t.assignee.name}</span>
                </div>
                <div className="w-40">
                  <Select defaultValue={t.status}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not-started">Not Started</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="min-w-40 grow">
                  <Progress value={t.progress} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


