"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ActivityItem {
  text: string
  time: string
}

interface ActivityFeedProps {
  activities?: ActivityItem[]
  title?: string
  description?: string
}

const defaultActivities: ActivityItem[] = [
  { text: "Maya closed task #432 in Atlas", time: "1h ago" },
  { text: "Leo uploaded design specs to Orion", time: "3h ago" },
  { text: "Nina created milestone M2 for Zephyr", time: "Yesterday" },
]

export default function ActivityFeed({ 
  activities = defaultActivities,
  title = "Activity Feed",
  description = "Recent updates"
}: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-0.5 size-2.5 rounded-full bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)]" />
              <div>
                <div className="text-sm">{activity.text}</div>
                <div className="text-xs text-muted-foreground">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
