"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, Plus } from "lucide-react"

export default function AddTaskDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white">
          <Plus className="mr-2 size-4" /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>
        <form className="grid gap-3">
          <div className="grid gap-1">
            <Label>Task Name</Label>
            <Input placeholder="e.g. Implement Cart" />
          </div>
          <div className="grid gap-1">
            <Label>Project</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Select project" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ecom">E-commerce Platform</SelectItem>
                <SelectItem value="redesign">Mobile App Redesign</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1">
            <Label>Assignee</Label>
            <Input placeholder="e.g. Sarah Chen" />
          </div>
          <div className="grid gap-1">
            <Label>Status</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="not-started">Not Started</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1">
            <Label>Priority</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1">
            <Label>Deadline</Label>
            <div className="relative">
              <Input type="date" className="pr-9" />
              <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            </div>
          </div>
          <div className="grid gap-1">
            <Label>Estimate</Label>
            <Input placeholder="e.g. 12h" />
          </div>
          <div className="grid gap-1">
            <Label>Description</Label>
            <Textarea rows={4} placeholder="Task details..." />
          </div>
          <div className="pt-2">
            <Button type="submit" className="w-full bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white">Create Task</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}



