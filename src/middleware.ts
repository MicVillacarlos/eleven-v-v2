import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  const loginUrl = new URL("/login", req.url);
  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const response = await fetch(`${backendUrl}/admin/auth/validate-token/${token}`);
    const data = await response.json();

    if (data.success !== true) {
      return NextResponse.redirect(loginUrl);
    }
  } catch (error) {
    console.log("Token validation error:", error);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
};
