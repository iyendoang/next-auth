// middleware.ts
import { getCookie } from "cookies-next";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = getCookie("token", { req }); // Get token from cookies in the request
  const { pathname } = req.nextUrl;

  // If the user is not authenticated and tries to access admin routes
  if (!token && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // If the user is authenticated and tries to access login or register pages
  if (token && (pathname === "/auth/login" || pathname === "/auth/register")) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next(); // Continue the request
}
