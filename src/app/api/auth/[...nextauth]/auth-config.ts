/* eslint-disable @typescript-eslint/no-explicit-any */
import { routes } from '@/config/routes';
import { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios';

// Function to determine if a route is restricted for logged-in users
const isAuthRoute = (pathname: string) => {
  const authRoutePatterns = [/\/auth\/signIn/, /\/auth\/signUp/];
  return authRoutePatterns.some((pattern) => pattern.test(pathname));
};

export default {
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URI}/auth/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          const { accessToken, userData } = res.data;

          if (!accessToken || !userData) {
            throw new Error('Invalid credentials.');
          }
          return { accessToken, ...userData };
        } catch (err: any) {
          if (err instanceof Error) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    async authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      // Redirect logged-in users away from auth routes
      if (isAuthRoute(pathname)) {
        if (isLoggedIn) {
          // Redirect to homepage
          return Response.redirect(new URL(routes.eCommerce.home, nextUrl));
        }
        return true; // Allow access to auth routes if not logged in
      }

      // Allow access to private routes for logged-in users
      return isLoggedIn;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token._id = user._id;
        token.name = user.name || '';
        token.userName = user.userName;
        token.email = user.email || '';
        token.contact = user.contact;
        token.isAdmin = user.isAdmin;
        token.userStatus = user.userStatus;
        token.role = user.role;
        token.cart = user.cart;
        token.accessToken = user.accessToken;
      }
      if (trigger === 'update' && session) {
        token = { ...token, ...session };
      }
      return token;
    },
    async session({ session, token }) {
      session.user._id = token._id as string;
      session.user.name = token.name;
      session.user.userName = token.userName;
      session.user.email = token.email;
      session.user.contact = token.contact;
      session.user.isAdmin = token.isAdmin;
      session.user.userStatus = token.userStatus;
      session.user.role = token.role;
      session.user.cart = token.cart;
      session.user.accessToken = token.accessToken as string;
      return session;
    },
    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url, baseUrl);

      if (parsedUrl.searchParams.has('callbackUrl')) {
        const callbackUrl = parsedUrl.searchParams.get('callbackUrl')!;
        return callbackUrl.startsWith(baseUrl)
          ? callbackUrl
          : `${baseUrl}${callbackUrl}`;
      }

      // if (parsedUrl.origin === baseUrl) {
      //   // if (parsedUrl.pathname === '/expert-content-solutions/cart') {
      //   //   return `${baseUrl}/expert-content-solutions/cart`;
      //   // }
      //   return `${baseUrl}/expert-content-solutions`;
      // }
      return `${baseUrl}/expert-content-solutions`;
    },
  },
  pages: {
    signIn: routes.auth.signIn,
    error: routes.auth.error,
  },
} satisfies NextAuthConfig;
