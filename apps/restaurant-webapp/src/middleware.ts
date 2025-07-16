// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect only /dashboard/* routes
  if (!pathname.startsWith('/dashboard')) {
    return NextResponse.next();
  }

  // Check for refresh token cookie
  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (!refreshToken) {
    // No refresh token: redirect to login page
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Token exists: allow
  return NextResponse.next();
}

// Apply to dashboard paths only
export const config = {
  matcher: ['/dashboard/:path*'],
};
