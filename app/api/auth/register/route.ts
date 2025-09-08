import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { accountType, name, email, password, country, role, avatarUrl } = body

    if (!name || !email || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 })

    await connectToDatabase()
    const existing = await User.findOne({ email })
    if (existing) return NextResponse.json({ error: "Email already registered" }, { status: 400 })

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({
      fullName: name,
      email,
      passwordHash,
      country: accountType === "client" ? country : undefined,
      role: accountType === "client" ? "client" : (role?.toLowerCase?.() || "developer"),
      avatarUrl,
    })

    return NextResponse.json({ id: user._id }, { status: 201 })
  } catch (e) {
    const errMsg = e instanceof Error ? e.message : String(e)
    console.error("/api/auth/register error:", errMsg)
    const msg = process.env.NODE_ENV !== "production" && e instanceof Error ? errMsg : "Server error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}


