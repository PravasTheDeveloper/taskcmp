"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

export default function AddMemberDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white">
          <Plus className="mr-2 size-4" /> Add Team Member
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Team Member</DialogTitle>
        </DialogHeader>
        <form className="grid gap-3">
          <div className="grid gap-1">
            <Label>Full Name</Label>
            <Input placeholder="e.g. John Doe" />
          </div>
          <div className="grid gap-1">
            <Label>Email</Label>
            <Input type="email" placeholder="john@company.com" />
          </div>
          <div className="grid gap-1">
            <Label>Role</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
                <SelectItem value="qa">QA</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1">
            <Label>Department</Label>
            <Input placeholder="e.g. Engineering" />
          </div>
          <div className="pt-2">
            <Button type="submit" className="w-full bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white">Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}


