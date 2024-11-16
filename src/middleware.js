import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  // Redirect to login if token is missing on the root route
  if (!token && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"], // Apply middleware to the root route
};
