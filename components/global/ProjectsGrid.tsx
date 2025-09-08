"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Project {
  name: string
  progress: number
  due: string
}

interface ProjectsGridProps {
  projects?: Project[]
  title?: string
  description?: string
}

const defaultProjects: Project[] = [
  { name: "Atlas", progress: 72, due: "Sep 28" },
  { name: "Orion", progress: 38, due: "Oct 06" },
  { name: "Zephyr", progress: 90, due: "Oct 14" },
]

export default function ProjectsGrid({ 
  projects = defaultProjects,
  title = "Projects",
  description = "Quick view of key projects"
}: ProjectsGridProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <div 
            key={project.name} 
            className="rounded-lg border p-4 transition hover:shadow-sm bg-card"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{project.name}</span>
              <span className="text-xs text-muted-foreground">Due {project.due}</span>
            </div>
            <Progress value={project.progress} />
            <div className="mt-2 text-xs text-muted-foreground">
              {project.progress}% complete
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

