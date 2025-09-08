"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AppSidebar from "@/components/global/AppSidebar"
import AppFooter from "@/components/global/AppFooter"
import TaskHeader from "@/components/task/TaskHeader"
import TaskOverview from "@/components/task/TaskOverview"
import TaskAssignDialog from "@/components/task/TaskAssignDialog"
import TaskTimeLogs from "@/components/task/TaskTimeLogs"
import TaskFiles from "@/components/task/TaskFiles"
import TaskComments from "@/components/task/TaskComments"
import TaskHistory from "@/components/task/TaskHistory"

export default function TaskPage() {
  const projectName = "E-commerce Platform"
  const taskName = "Design Project Mockup"

  return (
    <SidebarProvider>
      <AppSidebar activeItem="tasks" />
      <SidebarInset>
        <TaskHeader projectName={projectName} taskName={taskName} />

        <div className="px-4 md:px-6 py-6 space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <TaskOverview />
              <TaskAssignDialog />
              <TaskTimeLogs />
              <TaskFiles />
            </div>
            <div className="space-y-6">
              <TaskComments />
              <TaskHistory />
            </div>
          </div>
          <AppFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}



