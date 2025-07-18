/* eslint-disable @typescript-eslint/no-explicit-any */
import { routes } from '@/config/routes';
import {
  NextAuthConfig,
  Role,
  Session,
  User,
} from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { decodeJwt } from 'jose';

// Function to determine if a route is restricted for logged-in users
const isAuthRoute = (pathname: string) => {
  const authRoutePatterns = [/\/auth\/signin/, /\/auth\/signup/];
  return authRoutePatterns.some((pattern) => pattern.test(pathname));
};


interface AuthToken extends JWT {
  _id: string;
  image?: string;
  name?: string;
  userName?: string;
  email: string;
  contact?: string;
  isAdmin: boolean;
  userStatus: boolean;
  isVerifiedUser?: boolean;
  role?: Role;
  accessToken?: string;
  expiresAt?: string;
}

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      credentials: {
        identifier: { label: 'Email or Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const apiUri = process.env.NEXT_PUBLIC_BACKEND_API_URI;
          if (!apiUri) {
            throw new Error('Backend API URI is not defined.');
          }

          const response = await fetch(`${apiUri}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              identifier: credentials?.identifier,
              password: credentials?.password,
            }),
          });

          if (!response.ok) {
            throw new Error(`Login failed: ${response.statusText}`);
          }

          const { accessToken, user, expiresAt } = await response.json();

          if (!accessToken || !user) {
            throw new Error('Invalid credentials.');
          }

          // Calculate expiration time if not provided by backend
          const tokenExpiresAt =
            expiresAt ||
            new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

          return { accessToken, expiresAt: tokenExpiresAt, ...user };
        } catch (err) {
          console.error('Authorize error:', err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          const apiUri = process.env.NEXT_PUBLIC_BACKEND_API_URI;
          if (!apiUri) {
            throw new Error('Backend API URI is not defined.');
          }

          const decoded = decodeJwt(account.id_token as string);
          const googleId = decoded.sub;

          // Attempt to login with Google ID
          const loginResponse = await fetch(`${apiUri}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              googleId,
            }),
          });

          if (loginResponse.ok) {
            // User exists, login successful
            const {
              accessToken,
              user: existingUser,
              expiresAt,
            } = await loginResponse.json();
            user._id = existingUser._id;
            user.accessToken = accessToken;
            user.expiresAt =
              expiresAt ||
              new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
            user.userName = existingUser.userName;
            user.contact = existingUser.contact;
            user.isAdmin = existingUser.isAdmin;
            user.userStatus = existingUser.userStatus;
            user.isVerifiedUser = existingUser.isVerifiedUser;
            user.role = existingUser.role;
            user.image = existingUser.image || user.image;
            user.name = existingUser.name || user.name;
            return true;
          }

          // User doesn't exist, proceed with registration
          const registerResponse = await fetch(`${apiUri}/auth/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              googleId,
              image: user.image,
              name: user.name,
              email: user.email,
            }),
          });

          if (!registerResponse.ok) {
            throw new Error(
              `Registration failed: ${registerResponse.statusText}`
            );
          }

          const {
            accessToken,
            user: newUser,
            expiresAt,
          } = await registerResponse.json();
          user._id = newUser._id;
          user.accessToken = accessToken;
          user.expiresAt =
            expiresAt ||
            new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
          user.userName = newUser.userName;
          user.contact = newUser.contact;
          user.isAdmin = newUser.isAdmin;
          user.userStatus = newUser.userStatus;
          user.isVerifiedUser = newUser.isVerifiedUser;
          user.role = newUser.role;
          user.image = newUser.image || user.image;
          user.name = newUser.name || user.name;
          return true;
        } catch (error) {
          console.error('Failed to process Google user:', error);
          return false;
        }
      }
      return true;
    },
    async authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      if (isAuthRoute(pathname)) {
        if (isLoggedIn) {
          return Response.redirect(new URL(routes.eCommerce.home, nextUrl));
        }
        return true;
      }
      return isLoggedIn;
    },
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: AuthToken;
      user?: User;
      trigger?: 'signIn' | 'signUp' | 'update';
      session?: Session;
    }) {
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
    async session({
      session,
      token,
    }: {
      session: Session;
      token: AuthToken;
    }) {
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
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
    updateAge: 1 * 60 * 1000,
  },
} satisfies NextAuthConfig;
