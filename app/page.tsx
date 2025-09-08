"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AppSidebar from "@/components/global/AppSidebar"
import AppHeader from "@/components/global/AppHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar activeItem="dashboard" />
      <SidebarInset>
        <AppHeader />
        <div className="px-4 md:px-6 py-6 space-y-6">
          <h1 className="text-2xl font-bold tracking-tight">Welcome to CMPTasks</h1>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <Card className="hover:shadow-sm transition-shadow">
              <CardHeader><CardTitle>Projects</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">Manage all projects, progress and files.</p>
                <Link href="/projects" className="underline text-sm">Go to Projects</Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-sm transition-shadow">
              <CardHeader><CardTitle>Tasks</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">Track tasks, assign developers and comment.</p>
                <Link href="/tasks" className="underline text-sm">Go to Tasks</Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-sm transition-shadow">
              <CardHeader><CardTitle>Team</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">View members, performance and profiles.</p>
                <Link href="/team" className="underline text-sm">Go to Team</Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
