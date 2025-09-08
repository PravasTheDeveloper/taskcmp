"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import * as React from "react"
import z from "zod"

const commonFields = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Use at least 8 characters"),
  confirm: z.string(),
  agree: z.boolean().refine((v) => v, "You must agree to Terms & Conditions"),
})

const clientFields = z.object({
  accountType: z.literal("client"),
  country: z.string().min(1, "Country is required"),
  role: z.string().optional(),
})

const teamFields = z.object({
  accountType: z.literal("team"),
  role: z.enum(["Developer", "Designer", "QA", "Executive", "HR"]),
  country: z.string().optional(),
})

const schema = z
  .discriminatedUnion("accountType", [clientFields.merge(commonFields), teamFields.merge(commonFields)])
  .superRefine((d, ctx) => {
    if (d.password !== d.confirm) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["confirm"], message: "Passwords do not match" })
    }
  })

export default function SignupPage() {
  const [form, setForm] = React.useState({ accountType: "client" as "client" | "team", name: "", email: "", password: "", confirm: "", agree: false, country: "", role: "" })
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

  const canSubmit = schema.safeParse(form).success && !loading

  return (
    <div className="min-h-svh flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="text-center">
          <Image src="/assets/main_logo.png" alt="CMPTasks" width={40} height={40} className="mx-auto rounded" />
          <CardTitle className="mt-2">Create your CMPTasks account</CardTitle>
        </CardHeader>
        <CardContent>
          {success && (
            <Alert className="mb-3">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={onSubmit} className="grid gap-3">
            <div className="grid gap-1 w-full">
              <Label>Account Type</Label>
              <Select value={form.accountType} onValueChange={(v) => onChange("accountType", v as "client" | "team")}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="team">Team Member</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
            {form.accountType === "client" && (
              <div className="grid gap-1">
                <Label htmlFor="country">Country</Label>
                <Input id="country" value={form.country} onChange={(e) => onChange("country", e.target.value)} />
                {errors.country && <div className="text-xs text-destructive">{errors.country}</div>}
              </div>
            )}
            {form.accountType === "team" && (
              <div className="grid gap-1">
                <Label>Role</Label>
                <Select value={form.role} onValueChange={(v) => onChange("role", v)}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Select role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Developer">Developer</SelectItem>
                    <SelectItem value="Designer">Designer</SelectItem>
                    <SelectItem value="QA">QA</SelectItem>
                    <SelectItem value="Executive">Executive</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && <div className="text-xs text-destructive">{errors.role}</div>}
              </div>
            )}
            <label className="flex items-center gap-2 text-sm">
              <Checkbox checked={form.agree} onCheckedChange={(v) => onChange("agree", Boolean(v))} /> I agree to the <Link href="#" className="underline">Terms & Conditions</Link>
            </label>
            {errors.agree && <div className="text-xs text-destructive">{errors.agree}</div>}
            <Button disabled={!canSubmit} className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white">
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



