"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AppSidebar from "@/components/global/AppSidebar"
import AppFooter from "@/components/global/AppFooter"
import ProjectHeader from "@/components/project/ProjectHeader"
import ProjectOverview from "@/components/project/ProjectOverview"
import ProjectTasks from "@/components/project/ProjectTasks"
import ProjectComments from "@/components/project/ProjectComments"
import ProjectFiles from "@/components/project/ProjectFiles"
import ProjectDocs from "@/components/project/ProjectDocs"
import ProjectTimeline from "@/components/project/ProjectTimeline"
import ProjectAnalytics from "@/components/project/ProjectAnalytics"
import ProjectStats from "@/components/project/ProjectStats"
import ProjectRisks from "@/components/project/ProjectRisks"
import ProjectBudget from "@/components/project/ProjectBudget"

export default function ProjectPage() {
  const projectName = "E-commerce Platform"

  return (
    <SidebarProvider>
      <AppSidebar activeItem="projects" />
      <SidebarInset>
        <ProjectHeader projectName={projectName} status="in-progress" />

        <div className="px-4 md:px-6 py-6 space-y-6">
          <ProjectStats />
          <ProjectOverview
            projectName={projectName}
            clientName="TechCorp Inc."
            clientHref="#"
            status="in-progress"
            deadline="Dec 15, 2024"
            budget="$120,000"
            team={[{ name: "Sarah Chen", initials: "SC" }, { name: "Mike Johnson", initials: "MJ" }, { name: "Emma Davis", initials: "ED" }]}
          />

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <ProjectTasks
                tasks={[
                  { id: 1, name: "Design product pages", assignee: { name: "Sarah Chen", initials: "SC" }, status: "in-progress", deadline: "Oct 10", progress: 45 },
                  { id: 2, name: "Implement cart", assignee: { name: "Mike Johnson", initials: "MJ" }, status: "not-started", deadline: "Oct 18", progress: 10 },
                  { id: 3, name: "Payment integration", assignee: { name: "Emma Davis", initials: "ED" }, status: "completed", deadline: "Oct 05", progress: 100 },
                ]}
              />
              <ProjectDocs />
              <ProjectFiles />
              <ProjectRisks />
              <ProjectBudget />
            </div>

            <div className="space-y-6">
              <ProjectAnalytics />
              <ProjectTimeline />
              <ProjectComments />
            </div>
          </div>

          <AppFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}


