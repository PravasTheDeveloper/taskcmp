import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import User from "@/models/User"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const email = (searchParams.get("email") || "").trim().toLowerCase()
    if (!email) return NextResponse.json({ error: "Missing email" }, { status: 400 })

    await connectToDatabase()
    const exists = await User.exists({ email })
    return NextResponse.json({ exists: Boolean(exists) })
  } catch (e) {
    const msg = process.env.NODE_ENV !== "production" && e instanceof Error ? e.message : "Server error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}


