import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';
import { routes } from './config/routes';

// Cache session for the request
const getSession = async (req: NextRequest) => {
  if (!(req as any).__session) {

    (req as any).__session = await auth();
  }
  return (req as any).__session;
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Early return for non-matching routes
  const authRoutes = [routes.auth.signIn, routes.auth.signUp];
  const protectedRoutePrefix = routes.userDashboard.dashboard;

  const isAuthRoute = authRoutes.includes(pathname);
  const isProtectedRoute = pathname.startsWith(protectedRoutePrefix);

  // Skip if not an auth or dashboard route
  if (!isAuthRoute && !isProtectedRoute) {
   return NextResponse.next();
  }

  // Skip middleware for API routes and static assets
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Use cached session if available
  const session = await getSession(req);
  const token = session?.user?.accessToken;

  // Prevent redirect loops
  const isRedirected = req.headers.get('x-redirected') === 'true';
  if (isRedirected) {
    return NextResponse.next();
  }

  // Redirect logged-in users away from auth routes
  if (isAuthRoute && token) {
    const response = NextResponse.redirect(
      new URL(routes.eCommerce.home, req.url)
    );
    response.headers.set('x-redirected', 'true');
    return response;
  }

  // Protect all routes under /dashboard
  if (isProtectedRoute && !token) {

    const response = NextResponse.redirect(
      new URL(routes.auth.signIn, req.url)
    );
    response.headers.set('x-redirected', 'true');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/sign-in', '/auth/sign-up', '/dashboard/:path*'],
};
