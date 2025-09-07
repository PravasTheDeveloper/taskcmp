"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export type Member = { id: number; name: string; role: string; department: string; active: boolean; tasks: number; completion: number; initials: string }

export default function TeamMemberCard({ m }: { m: Member }) {
  return (
    <Link href={`/team/${m.id}`}>
      <Card className="hover:shadow-sm transition-shadow">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <span className={`size-2 rounded-full ${m.active ? "bg-green-500" : "bg-gray-400"}`} />
            {m.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 mb-2">
            <Avatar className="size-9"><AvatarImage /><AvatarFallback>{m.initials}</AvatarFallback></Avatar>
            <div className="text-sm text-muted-foreground">{m.role} • {m.department}</div>
          </div>
          <div className="text-xs text-muted-foreground mb-1">Active Tasks: {m.tasks}</div>
          <Progress value={m.completion} />
          <div className="text-xs text-muted-foreground mt-1">{m.completion}% complete</div>
        </CardContent>
      </Card>
    </Link>
  )
}


