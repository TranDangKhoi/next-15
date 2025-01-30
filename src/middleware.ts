import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRequiredPaths = ["/me"];
const publicPaths = ["/login", "/register"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sessionToken")?.value;

  // Skip middleware for static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/api") ||
    pathname === "/"
  ) {
    return NextResponse.next();
  }

  // Check if pathname starts with the variable `authRequiredPaths` then check if the sessionToken is present
  if (
    authRequiredPaths.some((path) => pathname.startsWith(path)) &&
    !sessionToken
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (publicPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
    console.log("Ran here");
    return NextResponse.redirect(new URL("/me", request.url));
  }

  if (
    !authRequiredPaths.some((path) => pathname.startsWith(path)) &&
    !publicPaths.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// If any paths are included in the matcher, it will invoke the middleware. Other than that, it will not.
export const config = {
  // This will match all routes except for the ones listed in the regex
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
