import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Public routes that don't require auth
  const isPublicRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/forgot") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/asstes") ||
    pathname.startsWith("/public") ||
    pathname.startsWith("/_next")

  // Read session token (JWT) from cookies
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // If unauthenticated and requesting a protected route, redirect to login
  if (!token && !isPublicRoute) {
    const url = new URL("/login", req.url)
    return NextResponse.redirect(url)
  }

  // If authenticated and visiting auth pages, redirect home
  if (token && (pathname.startsWith("/login") || pathname.startsWith("/signup"))) {
    const url = new URL("/", req.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/:path*",
}


