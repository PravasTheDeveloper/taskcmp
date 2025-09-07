"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import * as React from "react"
import z from "zod"

const schema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Use at least 8 characters"),
  confirm: z.string(),
  agree: z.boolean().refine((v) => v, "You must agree to Terms & Conditions"),
}).refine((d) => d.password === d.confirm, {
  message: "Passwords do not match",
  path: ["confirm"],
})

export default function SignupPage() {
  const [form, setForm] = React.useState({ name: "", email: "", password: "", confirm: "", agree: false })
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState("")

  function onChange<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm({ ...form, [key]: value })
  }

  function strength(pw: string) {
    const score = [/[a-z]/, /[A-Z]/, /\d/, /[^\w]/].reduce((s, r) => s + Number(r.test(pw)), 0) + Math.min(2, Math.floor(pw.length / 4))
    return score >= 5 ? "Strong" : score >= 3 ? "Medium" : "Weak"
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrors({})
    setSuccess("")
    const result = schema.safeParse(form)
    if (!result.success) {
      const errs: Record<string, string> = {}
      result.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message })
      setErrors(errs)
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess("Account created. Please verify your email.")
    }, 1000)
  }

  return (
    <div className="min-h-svh flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="text-center">
          <div className="mx-auto size-10 rounded bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)]" />
          <CardTitle className="mt-2">Create your CMPTasks account</CardTitle>
        </CardHeader>
        <CardContent>
          {success && (
            <Alert className="mb-3">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={onSubmit} className="grid gap-3">
            <div className="grid gap-1">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={form.name} onChange={(e) => onChange("name", e.target.value)} />
              {errors.name && <div className="text-xs text-destructive">{errors.name}</div>}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => onChange("email", e.target.value)} />
              {errors.email && <div className="text-xs text-destructive">{errors.email}</div>}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={form.password} onChange={(e) => onChange("password", e.target.value)} />
              <div className="text-xs text-muted-foreground">Strength: {strength(form.password)}</div>
              {errors.password && <div className="text-xs text-destructive">{errors.password}</div>}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input id="confirm" type="password" value={form.confirm} onChange={(e) => onChange("confirm", e.target.value)} />
              {errors.confirm && <div className="text-xs text-destructive">{errors.confirm}</div>}
            </div>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox checked={form.agree} onCheckedChange={(v) => onChange("agree", Boolean(v))} /> I agree to the <Link href="#" className="underline">Terms & Conditions</Link>
            </label>
            {errors.agree && <div className="text-xs text-destructive">{errors.agree}</div>}
            <Button disabled={loading} className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white">
              {loading ? "Creating..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2 text-xs">
          <div>Already have an account? <Link href="/login" className="underline">Sign In</Link></div>
          <div className="text-muted-foreground">Privacy • Terms • Help</div>
        </CardFooter>
      </Card>
    </div>
  )
}


