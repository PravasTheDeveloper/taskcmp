"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserPlus } from "lucide-react"

const members = [
  { name: "Sarah Chen", initials: "SC" },
  { name: "Mike Johnson", initials: "MJ" },
  { name: "Emma Davis", initials: "ED" },
]

export default function TaskAssignDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><UserPlus className="mr-2 size-4" /> Assign Developer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Developer</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2">
          {members.map((m) => (
            <button key={m.name} className="flex items-center gap-3 rounded border p-2 text-left hover:bg-accent">
              <Avatar className="size-8"><AvatarImage /><AvatarFallback>{m.initials}</AvatarFallback></Avatar>
              <span className="text-sm">{m.name}</span>
            </button>
          ))}
        </div>
        <div className="pt-2 text-right">
          <Button className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white">Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}



