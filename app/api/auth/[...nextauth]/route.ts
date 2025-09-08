import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { JWT } from "next-auth/jwt"
import type { User as NextAuthUser } from "next-auth"
import type { AdapterUser } from "next-auth/adapters"
import { connectToDatabase } from "@/lib/db"
import User from "@/models/User"
import bcrypt from "bcryptjs"

const handler = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<string, string> | undefined) {
        if (!credentials?.email || !credentials?.password) return null
        await connectToDatabase()
        const user = await User.findOne({ email: credentials.email })
        if (!user) return null
        const valid = await bcrypt.compare(credentials.password, user.passwordHash)
        if (!valid) return null
        return { id: String(user._id), name: user.fullName, email: user.email, role: user.role, avatarUrl: user.avatarUrl }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser | AdapterUser }) {
      if (user) {
        const u = user as NextAuthUser & { role?: string; avatarUrl?: string | null }
        if (u.role) token.role = u.role
        if (u.name) token.name = u.name
        if (u.avatarUrl) token.avatarUrl = u.avatarUrl
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string | undefined
        session.user.name = (token.name as string | null) ?? session.user.name
        session.user.avatarUrl = token.avatarUrl as string | undefined
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }


