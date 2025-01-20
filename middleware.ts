import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = new URL(request.url)
  const authToken = request.cookies.get('authToken');

  // Check if the user is trying to access a protected route
  if (pathname.startsWith('/dashboard')) {
    if (!authToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // If no branchId is present, redirect to the first branch (you might want to fetch this from an API)
    if (!searchParams.has('branchId')) {
      const url = new URL(request.url)
      url.searchParams.set('branchId', '1') // Default branch ID
      return NextResponse.redirect(url)
    }
  }

  // If the user is authenticated and trying to access login page, redirect to dashboard
  if (pathname === '/login' && authToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login'
  ]
};