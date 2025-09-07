"use client"

import AppHeader from "@/components/global/AppHeader"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Pencil, MessageSquarePlus, UserPlus, CheckCircle2 } from "lucide-react"

export default function TaskHeader({ projectName, taskName }: { projectName: string; taskName: string }) {
  return (
    <>
      <AppHeader />
      <div className="px-4 md:px-6 pt-4 pb-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="/projects">Projects</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="/projects/1">{projectName}</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{taskName}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="px-4 md:px-6 pb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold leading-tight">{taskName}</h1>
        <div className="flex gap-2">
          <Button variant="outline"><Pencil className="mr-2 size-4" /> Edit Task</Button>
          <Button variant="outline"><CheckCircle2 className="mr-2 size-4" /> Change Status</Button>
          <Button variant="outline"><UserPlus className="mr-2 size-4" /> Assign Developer</Button>
          <Button className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white"><MessageSquarePlus className="mr-2 size-4" /> Add Comment</Button>
        </div>
      </div>
    </>
  )
}


