import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // This is a simplified auth check for demo purposes
  // In a real app, you would check for a valid session/token

  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === "/auth";

  // Check if the user is authenticated (this is a simplified check)
  // In a real app, you would verify a token or session
  const isAuthenticated =
    request.cookies.has("auth") || request.headers.get("authorization");

  // If the path is not public and the user is not authenticated,
  // redirect to the auth page
  if (!isPublicPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // If the user is authenticated and trying to access the auth page,
  // redirect to the dashboard
  if (isPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Otherwise, continue with the request
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
