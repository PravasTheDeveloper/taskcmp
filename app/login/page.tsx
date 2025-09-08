"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import Image from "next/image"
import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [show, setShow] = React.useState(false)
  const [remember, setRemember] = React.useState(true)
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  function validateEmail(v: string) {
    return /.+@.+\..+/.test(v)
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!validateEmail(email)) {
      setError("Please enter a valid email.")
      return
    }
    if (!password) {
      setError("Please enter your password.")
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setError("Invalid email or password. Please try again.")
    }, 1000)
  }

  return (
    <div className="min-h-svh flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="text-center">
          <Image src="/assets/main_logo.png" alt="CMPTasks" width={40} height={40} className="mx-auto rounded" />
          <CardTitle className="mt-2">Sign in to CMPTasks</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-3">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={onSubmit} className="grid gap-3">
            <div className="grid gap-1">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShow(!show)} aria-label="Toggle password">
                  {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2">
                  <Checkbox checked={remember} onCheckedChange={(v) => setRemember(Boolean(v))} />
                  Remember me
                </label>
                <Link className="underline" href="/forgot">Forgot your password?</Link>
              </div>
            </div>
            <Button disabled={loading} className="mt-1 bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white">
              {loading ? "Signing in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2 text-xs">
          <div>Don&apos;t have an account? <Link href="/signup" className="underline">Sign Up</Link></div>
          <div className="text-muted-foreground">Privacy • Terms • Help</div>
        </CardFooter>
      </Card>
    </div>
  )
}



