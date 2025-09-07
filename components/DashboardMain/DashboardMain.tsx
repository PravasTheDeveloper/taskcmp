"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import AppSidebar from "@/components/global/AppSidebar"
import AppHeader from "@/components/global/AppHeader"
import DashboardStats from "@/components/global/DashboardStats"
import ProjectsGrid from "@/components/global/ProjectsGrid"
import TasksGrid from "@/components/global/TasksGrid"
import ActivityFeed from "@/components/global/ActivityFeed"
import LiveComments from "@/components/global/LiveComments"
import AppFooter from "@/components/global/AppFooter"

export default function DashboardMain() {
  return (
    <SidebarProvider>
      <AppSidebar activeItem="dashboard" />
      
      <SidebarInset>
        <AppHeader />

        <div className="px-4 py-6 md:px-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
              <p className="text-muted-foreground">Track projects, tasks, and team activity.</p>
            </div>
            <Button className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white shadow-sm hover:brightness-95">
              Create Task
            </Button>
          </div>

          {/* Stats Grid */}
          <DashboardStats />

          {/* Content Grid */}
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              <ProjectsGrid />
              <TasksGrid />
            </div>

            <div className="space-y-4">
              <ActivityFeed />
              <LiveComments />
            </div>
          </div>

          {/* Footer */}
          <AppFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}


