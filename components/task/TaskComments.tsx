"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type C = { id: number; author: string; text: string; time: string; hasFile?: boolean; mentions?: string[] }

export default function TaskComments() {
  const [comments, setComments] = React.useState<C[]>([
    { id: 1, author: "Ava", text: "@Mike please review latest mockups.", time: "2m ago", mentions: ["Mike"] },
    { id: 2, author: "Mike", text: "Uploaded new design files.", time: "1h ago", hasFile: true },
  ])
  const [text, setText] = React.useState("")
  const [filter, setFilter] = React.useState<"all" | "mentions" | "files">("all")

  function add() {
    if (!text.trim()) return
    setComments([{ id: Date.now(), author: "You", text, time: "Just now" }, ...comments])
    setText("")
  }

  const filtered = comments.filter((c) => {
    if (filter === "mentions") return (c.mentions ?? []).length > 0
    if (filter === "files") return !!c.hasFile
    return true
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Input placeholder="Write a comment... use @ to mention" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") add() }} />
          <Button onClick={add} className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white">Send</Button>
        </div>
        <div className="flex gap-2 text-xs">
          <button className={`px-2 py-1 rounded ${filter === "all" ? "bg-accent" : ""}`} onClick={() => setFilter("all")}>All</button>
          <button className={`px-2 py-1 rounded ${filter === "mentions" ? "bg-accent" : ""}`} onClick={() => setFilter("mentions")}>Mentions</button>
          <button className={`px-2 py-1 rounded ${filter === "files" ? "bg-accent" : ""}`} onClick={() => setFilter("files")}>With Files</button>
        </div>
        <Separator />
        <div className="space-y-3">
          {filtered.map((c) => (
            <div key={c.id} className="flex items-start gap-3">
              <Avatar className="size-7"><AvatarImage /><AvatarFallback>{c.author.slice(0,2).toUpperCase()}</AvatarFallback></Avatar>
              <div>
                <div className="text-sm"><span className="font-medium">{c.author}</span> <span className="text-xs text-muted-foreground">{c.time}</span></div>
                <div className="text-sm text-foreground/90">{c.text}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}



