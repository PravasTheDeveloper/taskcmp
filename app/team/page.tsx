"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AppSidebar from "@/components/global/AppSidebar"
import AppHeader from "@/components/global/AppHeader"
import AppFooter from "@/components/global/AppFooter"
import AddMemberDialog from "@/components/team/AddMemberDialog"
import TeamMemberCard, { Member } from "@/components/team/TeamMemberCard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const members: Member[] = [
  { id: 1, name: "Sarah Chen", role: "Designer", department: "Product", active: true, tasks: 3, completion: 76, initials: "SC" },
  { id: 2, name: "Mike Johnson", role: "Developer", department: "Engineering", active: true, tasks: 4, completion: 58, initials: "MJ" },
  { id: 3, name: "Emma Davis", role: "QA", department: "Engineering", active: false, tasks: 1, completion: 92, initials: "ED" },
]

export default function TeamPage() {
  return (
    <SidebarProvider>
      <AppSidebar activeItem="team" />
      <SidebarInset>
        <AppHeader searchPlaceholder="Search team..." />

        <div className="px-4 md:px-6 py-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Team Members</h1>
            <AddMemberDialog />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Input placeholder="Search by name, role, department" className="w-64" />
            <Select>
              <SelectTrigger className="w-40"><SelectValue placeholder="Role" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="dev">Developer</SelectItem>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="qa">QA</SelectItem>
                <SelectItem value="exec">Executive</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40"><SelectValue placeholder="Department" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {members.map((m) => (
              <TeamMemberCard key={m.id} m={m} />
            ))}
          </div>

          <AppFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}



