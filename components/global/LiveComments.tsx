"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquareText } from "lucide-react"

interface Comment {
  id: number
  author: string
  text: string
  time: string
}

interface LiveCommentsProps {
  initialComments?: Comment[]
  title?: string
  description?: string
  placeholder?: string
}

const defaultComments: Comment[] = [
  { id: 1, author: "Ava", text: "Updated the sprint goals for Project Atlas.", time: "2m ago" },
  { id: 2, author: "Kai", text: "Reviewed PR #128 and left comments.", time: "15m ago" },
]

export default function LiveComments({ 
  initialComments = defaultComments,
  title = "Live Comments",
  description = "Collaborate with your team",
  placeholder = "Write a comment..."
}: LiveCommentsProps) {
  const [comments, setComments] = React.useState<Comment[]>(initialComments)
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquareText className="size-4" /> {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Input
            placeholder={placeholder}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="h-9 rounded"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddComment()
            }}
          />
          <Button 
            onClick={handleAddComment} 
            className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white"
          >
            Send
          </Button>
        </div>
        <Separator />
        <div className="space-y-3 max-h-64 overflow-auto pr-1">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-3">
              <Avatar className="size-7">
                <AvatarImage alt={comment.author} />
                <AvatarFallback>{comment.author.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm">
                  <span className="font-medium">{comment.author}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{comment.time}</span>
                </div>
                <div className="text-sm text-foreground/90">{comment.text}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
