import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  const loginUrl = new URL("/login", req.url);
  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
};
