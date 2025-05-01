/* eslint-disable @typescript-eslint/no-explicit-any */
import { routes } from '@/config/routes';
import { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios';

// Function to determine if a route is restricted for logged-in users
const isAuthRoute = (pathname: string) => {
  const authRoutePatterns = [/\/auth\/signin/, /\/auth\/signup/];
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

          const { accessToken, user, expiresAt } = res.data;

          if (!accessToken || !user) {
            throw new Error('Invalid credentials.');
          }

          // Calculate expiration time if not provided by backend
          const tokenExpiresAt =
            expiresAt ||
            new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

          return { accessToken, expiresAt: tokenExpiresAt, ...user };
        } catch (err: any) {
          console.error('Error : ', err.response.data.message);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
    updateAge: 1 * 60 * 1000,
  },
  callbacks: {
    async authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      // Redirect logged-in users away from auth routes
      if (isAuthRoute(pathname) && isLoggedIn) {
        return Response.redirect(new URL(routes.eCommerce.home, nextUrl));
      }
      return true; // Allow all other routes; middleware handles dashboard protection
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token._id = user._id;
        token.name = user.name || '';
        token.image = user.image || '';
        token.userName = user.userName;
        token.email = user.email ?? '';
        token.contact = user.contact;
        token.isAdmin = user.isAdmin;
        token.userStatus = user.userStatus;
        token.isVerifiedUser = user.isVerifiedUser || false;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.expiresAt = user.expiresAt;
      }

      // Simple expiration check - no refresh logic
      if (token.expiresAt && typeof token.expiresAt === 'string') {
        try {
          const expiresAtDate = new Date(token.expiresAt);
          if (isNaN(expiresAtDate.getTime()) || expiresAtDate < new Date()) {
            return null;
          }
        } catch (err) {
          console.error('Invalid expiresAt format:', err);
          return null;
        }
      } else {
        return null;
      }

      if (trigger === 'update' && session?.user) {
        return {
          ...token,
          name: session.user.name || token.name,
          image: session.user.image || token.image,
          userName: session.user.userName || token.userName,
          email: session.user.email || token.email,
          contact: session.user.contact || token.contact,
          isAdmin: session.user.isAdmin ?? token.isAdmin,
          userStatus: session.user.userStatus ?? token.userStatus,
          isVerifiedUser: session.user.isVerifiedUser ?? token.isVerifiedUser,
          role: session.user.role || token.role,
          accessToken: token.accessToken,
          expiresAt: token.expiresAt,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (!token || !token.expiresAt || typeof token.expiresAt !== 'string') {
        // Invalidate session
        session.expires = new Date(0).toISOString() as any;
        return session;
      }
      try {
        const expiresAtDate = new Date(token.expiresAt);
        if (isNaN(expiresAtDate.getTime()) || expiresAtDate < new Date()) {
          // Invalidate session
          session.expires = new Date(0).toISOString() as any;
          return session;
        }

        // Add 5 minute buffer to expiration check
        const now = new Date();
        if (expiresAtDate < new Date(now.getTime() + 5 * 60 * 1000)) {
          session.expires = new Date(0).toISOString() as any;
          return session;
        }

        // Valid token
        session.expires = token.expiresAt as any;
      } catch (err) {
        console.error('Invalid token.expiresAt format:', err);
        session.expires = new Date(0).toISOString() as any;
        return session;
      }

      session.user = {
        ...session.user,
        _id: token._id as string,
        name: token.name,
        image: token.image,
        userName: token.userName,
        email: token.email,
        contact: token.contact,
        isAdmin: token.isAdmin ?? false,
        userStatus: token.userStatus ?? false,
        isVerifiedUser: token.isVerifiedUser ?? false,
        role: token.role,
        accessToken: token.accessToken as string,
      };
      
      return session;
    },
    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url, baseUrl);

      if (parsedUrl.searchParams.has('callbackUrl')) {
        const callbackUrl = parsedUrl.searchParams.get('callbackUrl')!;
        const fullCallbackUrl = new URL(callbackUrl, baseUrl).toString();
        return fullCallbackUrl.startsWith(baseUrl)
          ? fullCallbackUrl
          : `${baseUrl}${callbackUrl.startsWith('/') ? callbackUrl : '/' + callbackUrl}`;
      }
      return url;
    },
  },
  pages: {
    signIn: routes.auth.signIn,
    error: routes.auth.error,
  },
} satisfies NextAuthConfig;
