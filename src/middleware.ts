// import NextAuth from 'next-auth';

// import authConfig from '@/app/api/auth/[...nextauth]/auth-config';

// export const { auth: middleware } = NextAuth(authConfig);

// export const config = {
//   // matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
//   matcher: ['/dash'],
// };


// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import NextAuth from 'next-auth';
// import authConfig from '@/app/api/auth/[...nextauth]/auth-config';

// // Middleware to normalize URL (static segments to lowercase and preserve dynamic segments)
// export function normalizationMiddleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Regular expression to match dynamic segments (likely IDs or slugs)
//   const dynamicSegmentPattern = /^[a-zA-Z0-9-]+$/;

//   // Split the pathname into parts based on "/"
//   const pathnameParts = pathname.split('/');

//   // Normalize static segments (excluding dynamic ones)
//   const normalizedParts = pathnameParts.map(part => {
//     // If the part matches the dynamic segment pattern (like an ID), leave it as is
//     if (dynamicSegmentPattern.test('/' + part)) {
//       return part;  // No change for dynamic segments
//     }
//     // Otherwise, normalize to lowercase for static parts
//     return part.toLowerCase();
//   });

//   // Rebuild the pathname from the normalized parts
//   const normalizedPathname = normalizedParts.join('/');

//   // If the pathname has changed, redirect to the normalized version
//   if (pathname !== normalizedPathname) {
//     return NextResponse.redirect(new URL(normalizedPathname + request.nextUrl.search, request.url));
//   }

//   return NextResponse.next();
// }

// // NextAuth authentication check middleware
// export const { auth: middleware } = NextAuth(authConfig);

// export const config = {
//   matcher: ['/dash'],
// };


import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import NextAuth from 'next-auth';
import authConfig from '@/app/api/auth/[...nextauth]/auth-config';

// Middleware to normalize URL (static segments to lowercase and preserve dynamic segments)
export function normalizationMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Regular expression to match dynamic segments (likely IDs or slugs)
  const dynamicSegmentPattern = /^[a-zA-Z0-9-]+$/; // Match alphanumeric and hyphenated slugs

  // Split the pathname into parts based on "/"
  const pathnameParts = pathname.split('/');

  // Normalize static segments (excluding dynamic ones)
  const normalizedParts = pathnameParts.map(part => {
    // If the part matches the dynamic segment pattern (like an ID), leave it as is
    if (dynamicSegmentPattern.test(part)) {
      return part;  // No change for dynamic segments
    }
    // Otherwise, normalize to lowercase for static parts
    return part.toLowerCase();
  });

  // Rebuild the pathname from the normalized parts
  const normalizedPathname = normalizedParts.join('/');

  // If the pathname has changed, redirect to the normalized version
  if (pathname !== normalizedPathname) {
    return NextResponse.redirect(new URL(normalizedPathname + request.nextUrl.search, request.url));
  }

  return NextResponse.next();
}

// NextAuth authentication check middleware
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ['/dash'],
};







