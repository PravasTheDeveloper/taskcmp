"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload } from "lucide-react"

interface FileItem {
  id: number
  name: string
  type: string
  uploader: string
  time: string
}

export default function ProjectFiles() {
  const [files] = React.useState<FileItem[]>([
    { id: 1, name: "Requirements.pdf", type: "document", uploader: "Ava", time: "2h ago" },
  ])

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Files</CardTitle>
        <div className="flex items-center gap-2">
          <Input type="file" className="w-56" />
          <Button variant="outline"><Upload className="mr-2 size-4" /> Upload</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {files.map((f) => (
          <div key={f.id} className="rounded border p-3 flex items-center justify-between">
            <div className="min-w-0">
              <div className="font-medium truncate">{f.name}</div>
              <div className="text-xs text-muted-foreground">{f.type} • {f.uploader} • {f.time}</div>
            </div>
            <div className="flex gap-2 text-sm">
              <Button variant="outline" size="sm">View</Button>
              <Button variant="outline" size="sm">Download</Button>
              <Button variant="ghost" size="sm">Delete</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}


