// import NextAuth from 'next-auth';

// import authConfig from '@/app/api/auth/[...nextauth]/auth-config';

// export const { auth: middleware } = NextAuth(authConfig);

// export const config = {
//   // matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
//   matcher: ['/dashboard'],
// };

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';
import { routes } from './config/routes';

export async function middleware(req: NextRequest) {
  const session = await auth();

  const token = session?.user?.accessToken;
  const { pathname } = req.nextUrl;

  // Define public and auth routes
  const authRoutes = [routes.auth.signIn, routes.auth.signUp];
  const protectedRoutes = [routes.userDashboard.dashboard];

  // Redirect logged-in users away from auth routes
  if (authRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL(routes.eCommerce.home, req.url));
  }

  // Redirect non-logged-in users from protected routes
  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL(routes.auth.signIn, req.url));
  }

  // Allow other routes to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/:path*', '/dashboard/:path*'],
};
