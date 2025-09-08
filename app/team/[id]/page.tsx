"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AppSidebar from "@/components/global/AppSidebar"
import AppHeader from "@/components/global/AppHeader"
import AppFooter from "@/components/global/AppFooter"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"

export default function TeamMemberProfile() {
  const member = { name: "Sarah Chen", role: "Designer", email: "sarah@company.com", phone: "+1 555-1234", department: "Product", joined: "Feb 12, 2023", completion: 76 }
  const tasks = [
    { name: "Design Mockups", status: "In Progress", progress: 60, deadline: "Oct 18" },
    { name: "Checkout UX", status: "Completed", progress: 100, deadline: "Oct 05" },
  ]
  const missed = [
    { name: "Landing Page", deadline: "Sep 28", reason: "Awaiting assets" },
  ]
  const pie = [ { name: "On Time", value: 80 }, { name: "Missed", value: 20 } ]
  const trend = [ { name: "Jun", pct: 65 }, { name: "Jul", pct: 72 }, { name: "Aug", pct: 68 }, { name: "Sep", pct: 76 } ]
  const COLORS = ["#22C55E", "#EF4444"]

  return (
    <SidebarProvider>
      <AppSidebar activeItem="team" />
      <SidebarInset>
        <AppHeader searchPlaceholder="Search team..." />
        <div className="px-4 md:px-6 py-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="size-12"><AvatarImage /><AvatarFallback>SC</AvatarFallback></Avatar>
              <div>
                <div className="text-xl font-semibold">{member.name}</div>
                <div className="text-sm text-muted-foreground">{member.role} • {member.department}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Edit Profile</Button>
              <Button variant="outline">Message</Button>
              <Button className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white">Assign to Project</Button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <Card>
                <CardHeader><CardTitle>Task Summary</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {tasks.map((t, i) => (
                    <div key={i} className="rounded border p-3">
                      <div className="flex items-center justify-between">
                        <a href="#" className="font-medium underline">{t.name}</a>
                        <span className="text-xs text-muted-foreground">Due {t.deadline}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mb-1">{t.status}</div>
                      <Progress value={t.progress} />
                      <div className="text-xs text-muted-foreground mt-1">{t.progress}% complete</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Missed Deadlines</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {missed.map((m, i) => (
                    <div key={i} className="rounded border p-3 flex items-center justify-between">
                      <div>
                        <div className="font-medium">{m.name}</div>
                        <div className="text-xs text-muted-foreground">Original deadline: {m.deadline}</div>
                      </div>
                      <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-700">{m.reason}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle>Performance Metrics</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">Completed Tasks: 48</div>
                  <div className="text-sm">Pending Tasks: 12</div>
                  <div className="text-sm">Task Accuracy: 94%</div>
                  <div className="text-sm">Work Quality: 4.6/5</div>
                  <div className="mt-2">
                    <div className="text-xs text-muted-foreground mb-1">Overall Completion</div>
                    <Progress value={member.completion} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>On-time vs Missed</CardTitle></CardHeader>
                <CardContent className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pie} dataKey="value" nameKey="name" outerRadius={80} label>
                        {pie.map((_, idx) => (<Cell key={idx} fill={COLORS[idx % COLORS.length]} />))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Completion Trend</CardTitle></CardHeader>
                <CardContent className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trend}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="pct" stroke="#6366F1" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div><div className="text-sm text-muted-foreground">Email</div><div className="font-medium">{member.email}</div></div>
              <div><div className="text-sm text-muted-foreground">Phone</div><div className="font-medium">{member.phone}</div></div>
              <div><div className="text-sm text-muted-foreground">Department</div><div className="font-medium">{member.department}</div></div>
              <div><div className="text-sm text-muted-foreground">Joining Date</div><div className="font-medium">{member.joined}</div></div>
            </CardContent>
          </Card>

          <AppFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}



