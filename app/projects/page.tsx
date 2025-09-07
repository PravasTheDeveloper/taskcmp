"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AppSidebar from "@/components/global/AppSidebar"
import AppHeader from "@/components/global/AppHeader"
import AppFooter from "@/components/global/AppFooter"
import CreateProjectDialog from "@/components/project/CreateProjectDialog"
import ProjectsKpis from "@/components/project/ProjectsKpis"
import ProjectsCharts from "@/components/project/ProjectsCharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

type ProjectStatus = "running" | "queue" | "request"

const projects: Array<{ id: number; name: string; client: string; status: ProjectStatus; progress: number; due: string; priority: "High" | "Medium" | "Low" }> = [
  { id: 1, name: "E-commerce Platform", client: "TechCorp Inc.", status: "running", progress: 75, due: "Dec 15, 2024", priority: "High" },
  { id: 2, name: "Mobile App Redesign", client: "StartupXYZ", status: "queue", progress: 45, due: "Jan 20, 2025", priority: "Medium" },
  { id: 3, name: "Data Analytics Dashboard", client: "DataFlow Corp", status: "running", progress: 90, due: "Nov 30, 2024", priority: "High" },
  { id: 4, name: "Marketing Website", client: "Brandify", status: "request", progress: 0, due: "TBD", priority: "Low" },
]

function Section({ filter }: { filter: ProjectStatus | "all" }) {
  const list = projects.filter((p) => (filter === "all" ? true : p.status === filter))
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {list.map((p) => (
        <Card key={p.id} className="hover:shadow-sm transition-shadow">
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              <span className="truncate">{p.name}</span>
              <span className={`text-xs px-2 py-1 rounded ${
                p.priority === "High" ? "bg-red-100 text-red-700" : p.priority === "Medium" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-700"
              }`}>{p.priority}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-2">{p.client}</div>
            <div className="text-xs text-muted-foreground mb-1">Progress</div>
            <Progress value={p.progress} />
            <div className="text-xs text-muted-foreground mt-2">Due {p.due}</div>
            <div className="mt-3">
              <Link href={`/projects/${p.id}`} className="text-sm font-medium underline hover:opacity-80">Open Project</Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function ProjectsIndexPage() {
  return (
    <SidebarProvider>
      <AppSidebar activeItem="projects" />
      <SidebarInset>
        <AppHeader searchPlaceholder="Search projects..." />

        <div className="px-4 md:px-6 py-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
            <CreateProjectDialog />
          </div>

          <ProjectsKpis />
          <ProjectsCharts />

          <Tabs defaultValue="running" className="space-y-6">
            <TabsList>
              <TabsTrigger value="running">Running</TabsTrigger>
              <TabsTrigger value="queue">In Queue</TabsTrigger>
              <TabsTrigger value="request">Requests</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
            <TabsContent value="running"><Section filter="running" /></TabsContent>
            <TabsContent value="queue"><Section filter="queue" /></TabsContent>
            <TabsContent value="request"><Section filter="request" /></TabsContent>
            <TabsContent value="all"><Section filter="all" /></TabsContent>
          </Tabs>

          <AppFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}


