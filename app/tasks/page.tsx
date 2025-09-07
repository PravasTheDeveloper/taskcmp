"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AppSidebar from "@/components/global/AppSidebar"
import AppHeader from "@/components/global/AppHeader"
import AppFooter from "@/components/global/AppFooter"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import AddTaskDialog from "@/components/task/AddTaskDialog"
import TasksKpis from "@/components/task/TasksKpis"
import TasksFilters from "@/components/task/TasksFilters"
import TasksCharts from "@/components/task/TasksCharts"

const tasks = [
  { id: 1, name: "Design Project Mockup", project: "E-commerce Platform", progress: 45, due: "Oct 18" },
  { id: 2, name: "Implement Cart", project: "E-commerce Platform", progress: 10, due: "Oct 22" },
]

export default function TasksIndexPage() {
  return (
    <SidebarProvider>
      <AppSidebar activeItem="tasks" />
      <SidebarInset>
        <AppHeader searchPlaceholder="Search tasks..." />

        <div className="px-4 md:px-6 py-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
            <AddTaskDialog />
          </div>
          <TasksKpis />
          <TasksCharts />
          <TasksFilters />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {tasks.map((t) => (
              <Card key={t.id} className="hover:shadow-sm transition-shadow">
                <CardHeader>
                  <CardTitle className="text-base">{t.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-2">{t.project}</div>
                  <Progress value={t.progress} />
                  <div className="text-xs text-muted-foreground mt-2">Due {t.due}</div>
                  <div className="mt-3">
                    <Link href={`/tasks/${t.id}`} className="text-sm font-medium underline hover:opacity-80">Open Task</Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <AppFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}


