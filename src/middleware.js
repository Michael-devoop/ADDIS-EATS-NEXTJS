import { NextResponse } from "next/server";
import { decodeSessionPayload } from "@/lib/session";

export function middleware(request) {
  const sessionToken = request.cookies.get("session")?.value;
  const session = sessionToken ? decodeSessionPayload(sessionToken) : null;
  const { pathname, search } = request.nextUrl;

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  if ((pathname.startsWith("/staff") || pathname.startsWith("/kitchen")) && session.role !== "staff") {
    return new NextResponse("Access Denied: Staff credentials required.", {
      status: 403,
      headers: { "Content-Type": "text/plain" }
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/orders/:path*", "/checkout/:path*", "/staff/:path*", "/kitchen/:path*"],
};
