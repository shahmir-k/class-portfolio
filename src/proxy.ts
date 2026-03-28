import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (!path.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_session")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Optimistic check — the cookie exists.
  // Full JWT verification happens in each API route handler via isAdmin().
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
