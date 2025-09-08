"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CommentItem {
  id: number
  author: string
  text: string
  time: string
  avatarUrl?: string
}

export default function LiveComments() {
  const [comments, setComments] = React.useState<CommentItem[]>([
    { id: 1, author: "Ava", text: "Updated the sprint goals for Project Atlas.", time: "2m ago" },
    { id: 2, author: "Kai", text: "Reviewed PR #128 and left comments.", time: "15m ago" },
  ])
  const [newComment, setNewComment] = React.useState("")

  function handleAddComment() {
    const text = newComment.trim()
    if (!text) return
    setComments((prev) => [
      { id: Date.now(), author: "You", text, time: "Just now" },
      ...prev,
    ])
    setNewComment("")
  }

  return (
    <div className="space-y-3 p-4">
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
              <AvatarImage src={c.avatarUrl} />
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
    </div>
  )
}


