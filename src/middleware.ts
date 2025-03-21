// import NextAuth from 'next-auth';

// import authConfig from '@/app/api/auth/[...nextauth]/auth-config';

// export const { auth: middleware } = NextAuth(authConfig);

// export const config = {
//   // matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
//   matcher: ['/dashboard'],
// };

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { auth } from './auth';
// import { routes } from './config/routes';

// export async function middleware(req: NextRequest) {
//   const session = await auth();

//   const token = session?.user?.accessToken;
//   const { pathname } = req.nextUrl;

//   // Define public and auth routes
//   const authRoutes = [routes.auth.signIn, routes.auth.signUp];
//   const protectedRoutes = [routes.userDashboard.dashboard];

//   // Redirect logged-in users away from auth routes
//   if (authRoutes.includes(pathname) && token) {
//     return NextResponse.redirect(new URL(routes.eCommerce.home, req.url));
//   }

//   // Redirect non-logged-in users from protected routes
//   if (protectedRoutes.includes(pathname) && !token) {
//     return NextResponse.redirect(new URL(routes.auth.signIn, req.url));
//   }

//   // Allow other routes to proceed
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/auth/:path*', '/dashboard/:path*'],
// };


import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';
import { routes } from './config/routes';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log(`Middleware invoked for: ${pathname}`);

  // Skip middleware for API routes and static assets
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname === '/favicon.ico'
  ) {
    console.log(`Skipping middleware for: ${pathname}`);
    return NextResponse.next();
  }

  const session = await auth();
  const token = session?.user?.accessToken;

  const authRoutes = [routes.auth.signIn, routes.auth.signUp];
  const protectedRoutePrefix = routes.userDashboard.dashboard;

  // Prevent redirect loops
  const isRedirected = req.headers.get('x-redirected') === 'true';
  if (isRedirected) {
    console.log(`Already redirected, skipping: ${pathname}`);
    return NextResponse.next();
  }

  // Redirect logged-in users away from auth routes
  if (authRoutes.includes(pathname) && token) {
    console.log(`Redirecting from auth route ${pathname} to ${routes.eCommerce.home}`);
    const response = NextResponse.redirect(new URL(routes.eCommerce.home, req.url));
    response.headers.set('x-redirected', 'true');
    return response;
  }

  // Protect all routes under /dashboard
  if (pathname.startsWith(protectedRoutePrefix) && !token) {
    console.log(`Redirecting from protected route ${pathname} to ${routes.auth.signIn}`);
    const response = NextResponse.redirect(new URL(routes.auth.signIn, req.url));
    response.headers.set('x-redirected', 'true');
    return response;
  }

  console.log(`Proceeding with request: ${pathname}`);
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/auth/:path((?!api|_next/static|_next/image|favicon.ico).*)',
    '/dashboard/:path((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};