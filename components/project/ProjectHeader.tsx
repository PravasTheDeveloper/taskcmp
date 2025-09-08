"use client"

import AppHeader from "@/components/global/AppHeader"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { FileText, Pencil, Plus, Upload } from "lucide-react"

interface ProjectHeaderProps {
  projectName: string
  status: "in-progress" | "completed" | "pending"
}

function StatusBadge({ status }: { status: ProjectHeaderProps["status"] }) {
  const map = {
    "in-progress": "bg-amber-100 text-amber-700",
    completed: "bg-green-100 text-green-700",
    pending: "bg-gray-100 text-gray-700",
  }
  const label = {
    "in-progress": "In Progress",
    completed: "Completed",
    pending: "Pending Review",
  }[status]
  return <span className={`text-xs px-2 py-1 rounded ${map[status]}`}>{label}</span>
}

export default function ProjectHeader({ projectName, status }: ProjectHeaderProps) {
  return (
    <>
      <AppHeader showBrand={true} />

      <div className="px-4 md:px-6 pt-4 pb-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{projectName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="px-4 md:px-6 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold leading-tight">{projectName}</h1>
          <div className="mt-1"><StatusBadge status={status} /></div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Pencil className="mr-2 size-4" /> Edit Project</Button>
          <Button variant="outline"><Upload className="mr-2 size-4" /> Upload Files</Button>
          <Button variant="outline"><FileText className="mr-2 size-4" /> Documentation</Button>
          <Button className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white"><Plus className="mr-2 size-4" /> Add Task</Button>
        </div>
      </div>
    </>
  )
}



