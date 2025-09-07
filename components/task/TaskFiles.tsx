"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload } from "lucide-react"

type TaskFile = { id: number; name: string; version: number; uploader: string; time: string; type: string }

export default function TaskFiles() {
  const [files, setFiles] = React.useState<TaskFile[]>([
    { id: 1, name: "mockups.png", version: 1, uploader: "Sarah", time: "2h ago", type: "image" },
  ])

  function addVersion(fileId: number) {
    const f = files.find((x) => x.id === fileId)
    if (!f) return
    setFiles([{ ...f, version: f.version + 1, id: Date.now(), time: "Just now" }, ...files])
  }

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
              <div className="font-medium truncate">{f.name} <span className="text-xs text-muted-foreground">v{f.version}</span></div>
              <div className="text-xs text-muted-foreground">{f.type} • {f.uploader} • {f.time}</div>
            </div>
            <div className="flex gap-2 text-sm">
              <Button variant="outline" size="sm">View</Button>
              <Button variant="outline" size="sm">Download</Button>
              <Button variant="ghost" size="sm" onClick={() => addVersion(f.id)}>New Version</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}


