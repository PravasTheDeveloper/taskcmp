"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import * as React from "react"

export default function ForgotPage() {
  const [email, setEmail] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setMessage("If an account exists, a reset link has been sent.")
    }, 800)
  }

  return (
    <div className="min-h-svh flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="text-center">
          <div className="mx-auto size-10 rounded bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)]" />
          <CardTitle className="mt-2">Reset your password</CardTitle>
        </CardHeader>
        <CardContent>
          {message && (
            <Alert className="mb-3">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={submit} className="grid gap-3">
            <div className="grid gap-1">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <Button disabled={loading} className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white">{loading ? "Sending..." : "Send Reset Link"}</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2 text-xs">
          <div>Remembered it? <Link href="/login" className="underline">Back to Sign In</Link></div>
          <div className="text-muted-foreground">Privacy • Terms • Help</div>
        </CardFooter>
      </Card>
    </div>
  )
}


