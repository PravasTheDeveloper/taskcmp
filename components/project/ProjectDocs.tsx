"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function ProjectDocs() {
  const [content, setContent] = React.useState("AI-generated draft documentation goes here...")

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Documentation</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline">Export PDF</Button>
          <Button variant="outline">Export DOCX</Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white">Edit</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Documentation</DialogTitle>
              </DialogHeader>
              <textarea
                className="w-full h-64 rounded-md border p-3 bg-background"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="flex justify-end">
                <Button className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white">Save</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {content}
        </div>
      </CardContent>
    </Card>
  )
}


