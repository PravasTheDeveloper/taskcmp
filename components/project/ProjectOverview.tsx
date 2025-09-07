"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, DollarSign } from "lucide-react"

interface TeamMember { name: string; initials: string; image?: string }

interface ProjectOverviewProps {
  projectName: string
  clientName: string
  clientHref?: string
  status: "in-progress" | "completed" | "pending"
  deadline: string
  budget: string
  team: TeamMember[]
}

export default function ProjectOverview({ projectName, clientName, clientHref = "#", status, deadline, budget, team }: ProjectOverviewProps) {
  const statusColor = status === "completed" ? "text-green-600" : status === "in-progress" ? "text-amber-600" : "text-gray-600"
  const statusLabel = status === "completed" ? "Completed" : status === "in-progress" ? "In Progress" : "Pending Review"

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{projectName}</CardTitle>
        <CardDescription>
          Client: <a href={clientHref} className="underline hover:opacity-80">{clientName}</a>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-3">
        <div>
          <div className="text-sm text-muted-foreground">Status</div>
          <div className={`font-medium ${statusColor}`}>{statusLabel}</div>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="size-4 text-muted-foreground" />
          <div>
            <div className="text-sm text-muted-foreground">Deadline</div>
            <div className="font-medium">{deadline}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="size-4 text-muted-foreground" />
          <div>
            <div className="text-sm text-muted-foreground">Budget</div>
            <div className="font-medium">{budget}</div>
          </div>
        </div>
        <div className="sm:col-span-3">
          <div className="text-sm text-muted-foreground mb-2">Team</div>
          <div className="flex -space-x-2">
            {team.map((m) => (
              <Avatar key={m.name} className="border size-8">
                <AvatarImage src={m.image} alt={m.name} />
                <AvatarFallback>{m.initials}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


