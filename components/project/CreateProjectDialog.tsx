"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, Plus } from "lucide-react"

export default function CreateProjectDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white">
          <Plus className="mr-2 size-4" /> New Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>
        <form className="grid gap-3">
          <div className="grid gap-1">
            <Label>Project Name</Label>
            <Input placeholder="e.g. E-commerce Platform" />
          </div>
          <div className="grid gap-1">
            <Label>Client</Label>
            <Input placeholder="e.g. TechCorp Inc." />
          </div>
          <div className="grid gap-1">
            <Label>Status</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="queue">In Queue</SelectItem>
                <SelectItem value="request">Request</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1">
            <Label>Budget (USD)</Label>
            <Input type="number" placeholder="e.g. 120000" />
          </div>
          <div className="grid gap-1">
            <Label>Deadline</Label>
            <div className="relative">
              <Input type="date" className="pr-9" />
              <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            </div>
          </div>
          <div className="grid gap-1">
            <Label>Description</Label>
            <Textarea rows={4} placeholder="High-level project description..." />
          </div>
          <div className="grid gap-1">
            <Label>Tags</Label>
            <Input placeholder="e.g. ecommerce, web, payments" />
          </div>
          <div className="pt-2">
            <Button type="submit" className="w-full bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white">Create Project</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}


