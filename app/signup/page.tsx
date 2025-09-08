"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"
import * as React from "react"
import z from "zod"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const commonFields = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(254, "Email is too long")
    .refine((v) => emailRegex.test(v), "Please enter a valid email"),
  password: z
    .string()
    .min(8, "Use at least 8 characters")
    .refine((v) => /[a-z]/.test(v), "Include a lowercase letter")
    .refine((v) => /[A-Z]/.test(v), "Include an uppercase letter")
    .refine((v) => /\d/.test(v), "Include a number")
    .refine((v) => /[^A-Za-z0-9]/.test(v), "Include a special character"),
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
  const [showPw, setShowPw] = React.useState(false)
  const [showConfirm, setShowConfirm] = React.useState(false)
  const [emailStatus, setEmailStatus] = React.useState<"idle" | "invalid" | "checking" | "taken" | "available">("idle")
  const [pwRules, setPwRules] = React.useState({ len: false, lower: false, upper: false, num: false, special: false })

  React.useEffect(() => {
    const email = form.email.trim().toLowerCase()
    const valid = emailRegex.test(email)
    if (!email) { setEmailStatus("idle"); return }
    if (!valid) { setEmailStatus("invalid"); return }
    let cancelled = false
    setEmailStatus("checking")
    const id = setTimeout(async () => {
      try {
        const res = await fetch(`/api/auth/check-email?email=${encodeURIComponent(email)}`)
        if (!res.ok) throw new Error()
        const data = await res.json()
        if (!cancelled) setEmailStatus(data.exists ? "taken" : "available")
      } catch {
        if (!cancelled) setEmailStatus("invalid")
      }
    }, 350)
    return () => { cancelled = true; clearTimeout(id) }
  }, [form.email])

  React.useEffect(() => {
    const v = form.password || ""
    setPwRules({
      len: v.length >= 8,
      lower: /[a-z]/.test(v),
      upper: /[A-Z]/.test(v),
      num: /\d/.test(v),
      special: /[^A-Za-z0-9]/.test(v),
    })
  }, [form.password])

  function onChange<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm({ ...form, [key]: value })
  }

  // strength helper removed (unused)

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
    const res = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
      accountType: form.accountType,
      name: form.name,
      email: form.email,
      password: form.password,
      country: form.country,
      role: form.role,
    }) })
    setLoading(false)
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setErrors({ email: data.error || "Failed to create account" })
      return
    }
    toast.success("Signup successful. Redirecting to login...")
    setSuccess("Account created. You can now sign in.")
    setTimeout(() => {
      window.location.href = "/login"
    }, 1200)
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
              <Input id="email" type="email" value={form.email} onChange={(e) => onChange("email", e.target.value)} className={emailStatus === "available" ? "border-green-500" : emailStatus === "taken" || emailStatus === "invalid" ? "border-destructive" : ""} />
              <div className="text-xs">
                {emailStatus === "checking" && <span className="text-muted-foreground">Checking email...</span>}
                {emailStatus === "invalid" && <span className="text-destructive">Please enter a valid email</span>}
                {emailStatus === "taken" && <span className="text-destructive">This email is already registered</span>}
                {emailStatus === "available" && <span className="text-green-600">This email is available</span>}
              </div>
              {errors.email && <div className="text-xs text-destructive">{errors.email}</div>}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPw ? "text" : "password"} value={form.password} onChange={(e) => onChange("password", e.target.value)} className={form.password ? (pwRules.len && pwRules.lower && pwRules.upper && pwRules.num && pwRules.special ? "border-green-500" : "border-destructive") : ""} />
                <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" aria-label="Toggle password" onClick={() => setShowPw((v) => !v)}>
                  {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              <div className="text-xs grid grid-cols-1 gap-1 mt-1">
                <span className={pwRules.len ? "text-green-600" : "text-destructive"}>• At least 8 characters</span>
                <span className={pwRules.upper ? "text-green-600" : "text-destructive"}>• Uppercase letter</span>
                <span className={pwRules.lower ? "text-green-600" : "text-destructive"}>• Lowercase letter</span>
                <span className={pwRules.num ? "text-green-600" : "text-destructive"}>• Number</span>
                <span className={pwRules.special ? "text-green-600" : "text-destructive"}>• Special character</span>
              </div>
              {errors.password && <div className="text-xs text-destructive">{errors.password}</div>}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="confirm">Confirm Password</Label>
              <div className="relative">
                <Input id="confirm" type={showConfirm ? "text" : "password"} value={form.confirm} onChange={(e) => onChange("confirm", e.target.value)} />
                <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" aria-label="Toggle confirm password" onClick={() => setShowConfirm((v) => !v)}>
                  {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
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
              {loading ? ("Creating...") : ("Sign Up")}
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



