import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string
      avatarUrl?: string | null
    }
  }

  interface User {
    role?: string
    avatarUrl?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
    avatarUrl?: string | null
  }
}


