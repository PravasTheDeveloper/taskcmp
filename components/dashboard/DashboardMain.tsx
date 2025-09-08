"use client"

import * as React from "react"
import AppSidebar from "@/components/global/AppSidebar"
import AppHeader from "@/components/global/AppHeader"
import AppFooter from "@/components/global/AppFooter"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquareText } from "lucide-react"

export default function DashboardMain() {
  const [comments, setComments] = React.useState<Array<{ id: number; author: string; text: string; time: string }>>([
    { id: 1, author: "Ava", text: "Updated the sprint goals for Project Atlas.", time: "2m ago" },
    { id: 2, author: "Kai", text: "Reviewed PR #128 and left comments.", time: "15m ago" },
  ])
  const [newComment, setNewComment] = React.useState("")

  function handleAddComment() {
    if (!newComment.trim()) return
    setComments((prev) => [
      { id: Date.now(), author: "You", text: newComment.trim(), time: "Just now" },
      ...prev,
    ])
    setNewComment("")
  }

  return (
    <SidebarProvider>
      <AppSidebar activeItem="dashboard" />
      <SidebarInset>
        <AppHeader />

        <div className="px-4 py-6 md:px-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
              <p className="text-muted-foreground">Track projects, tasks, and team activity.</p>
            </div>
            <Button className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white shadow-sm hover:brightness-95">
              Create Task
            </Button>
          </div>

          {/* Top Stats */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Active Projects</CardTitle>
                <CardDescription>Currently in progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">12</div>
              </CardContent>
              <CardFooter>
                <Progress value={62} />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Open Tasks</CardTitle>
                <CardDescription>Across all projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">84</div>
              </CardContent>
              <CardFooter>
                <Progress value={45} />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Overdue</CardTitle>
                <CardDescription>Needs attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold text-destructive">7</div>
              </CardContent>
              <CardFooter>
                <Progress value={20} className="bg-destructive/20" />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Team Members</CardTitle>
                <CardDescription>Active this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">18</div>
              </CardContent>
              <CardFooter>
                <Progress value={78} />
              </CardFooter>
            </Card>
          </div>

          {/* Projects + Activity */}
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Projects</CardTitle>
                <CardDescription>Quick view of key projects</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {[
                  { name: "Atlas", progress: 72, due: "Sep 28" },
                  { name: "Orion", progress: 38, due: "Oct 06" },
                  { name: "Zephyr", progress: 90, due: "Oct 14" },
                ].map((p) => (
                  <div key={p.name} className="rounded-lg border p-4 transition hover:shadow-sm bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{p.name}</span>
                      <span className="text-xs text-muted-foreground">Due {p.due}</span>
                    </div>
                    <Progress value={p.progress} />
                    <div className="mt-2 text-xs text-muted-foreground">{p.progress}% complete</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity Feed</CardTitle>
                <CardDescription>Recent updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { text: "Maya closed task #432 in Atlas", time: "1h ago" },
                    { text: "Leo uploaded design specs to Orion", time: "3h ago" },
                    { text: "Nina created milestone M2 for Zephyr", time: "Yesterday" },
                  ].map((a, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 size-2.5 rounded-full bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)]" />
                      <div>
                        <div className="text-sm">{a.text}</div>
                        <div className="text-xs text-muted-foreground">{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tasks + Comments */}
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
                <CardDescription>Status summary</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { label: "Backlog", count: 24 },
                  { label: "In Progress", count: 36 },
                  { label: "Review", count: 12 },
                  { label: "Completed", count: 58 },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg border p-4 bg-card">
                    <div className="text-sm text-muted-foreground">{s.label}</div>
                    <div className="text-2xl font-semibold">{s.count}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquareText className="size-4" /> Live Comments
                </CardTitle>
                <CardDescription>Collaborate with your team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <input
                    className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleAddComment() }}
                  />
                  <Button onClick={handleAddComment} className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white">
                    Send
                  </Button>
                </div>
                <Separator />
                <div className="space-y-3 max-h-64 overflow-auto pr-1">
                  {comments.map((c) => (
                    <div key={c.id} className="flex items-start gap-3">
                      <Avatar className="size-7">
                        <AvatarImage />
                        <AvatarFallback>{c.author.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm">
                          <span className="font-medium">{c.author}</span>
                          <span className="ml-2 text-xs text-muted-foreground">{c.time}</span>
                        </div>
                        <div className="text-sm text-foreground/90">{c.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <AppFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}


