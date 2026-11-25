import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import type { Session } from "@/server/better-auth/config";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    }
  );

  if (!session && pathname !== "/login") {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (session && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/vehicles/:path*",
    "/statistical/:path*",
    "/logs/:path*",
  ],
};