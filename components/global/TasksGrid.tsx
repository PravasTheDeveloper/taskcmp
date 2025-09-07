"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface TaskStatus {
  label: string
  count: number
}

interface TasksGridProps {
  tasks?: TaskStatus[]
  title?: string
  description?: string
}

const defaultTasks: TaskStatus[] = [
  { label: "Backlog", count: 24 },
  { label: "In Progress", count: 36 },
  { label: "Review", count: 12 },
  { label: "Completed", count: 58 },
]

export default function TasksGrid({ 
  tasks = defaultTasks,
  title = "Tasks",
  description = "Status summary"
}: TasksGridProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tasks.map((task) => (
          <div key={task.label} className="rounded-lg border p-4 bg-card">
            <div className="text-sm text-muted-foreground">{task.label}</div>
            <div className="text-2xl font-semibold">{task.count}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
