"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface StatItem {
  title: string
  description: string
  value: number | string
  progress?: number
  variant?: "default" | "destructive"
}

interface DashboardStatsProps {
  stats?: StatItem[]
}

const defaultStats: StatItem[] = [
  {
    title: "Active Projects",
    description: "Currently in progress",
    value: 12,
    progress: 62,
  },
  {
    title: "Open Tasks",
    description: "Across all projects",
    value: 84,
    progress: 45,
  },
  {
    title: "Overdue",
    description: "Needs attention",
    value: 7,
    progress: 20,
    variant: "destructive",
  },
  {
    title: "Team Members",
    description: "Active this week",
    value: 18,
    progress: 78,
  },
]

export default function DashboardStats({ stats = defaultStats }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-base">{stat.title}</CardTitle>
            <CardDescription>{stat.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-semibold ${
              stat.variant === "destructive" ? "text-destructive" : ""
            }`}>
              {stat.value}
            </div>
          </CardContent>
          {stat.progress !== undefined && (
            <CardFooter>
              <Progress 
                value={stat.progress} 
                className={stat.variant === "destructive" ? "bg-destructive/20" : ""}
              />
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  )
}

