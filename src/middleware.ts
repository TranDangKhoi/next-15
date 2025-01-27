import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRequiredPaths = ["/me"];
const publicPaths = ["/login", "/register"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sessionToken")?.value;

  // Skip middleware for static files
  console.log(request.nextUrl.pathname);
  if (pathname.startsWith("/_next") || pathname.startsWith("/static")) {
    return NextResponse.next();
  }

  // Check if pathname starts with the variable `authRequiredPaths` then check if the sessionToken is present
  if (
    authRequiredPaths.some((path) => pathname.startsWith(path)) &&
    !sessionToken
  ) {
    return NextResponse.rewrite(new URL("/login", request.url));
  }

  if (publicPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.rewrite(new URL("/me", request.url));
  }

  if (
    !authRequiredPaths.some((path) => pathname.startsWith(path)) &&
    !publicPaths.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.rewrite(new URL("/", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [...authRequiredPaths],
};
