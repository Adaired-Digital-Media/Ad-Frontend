import { type DefaultSession } from "next-auth";
import "next-auth/jwt";

// Type Declarations
declare module "next-auth" {
  interface User {
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
    expiresAt?: string; // ISO string for expiration
  }

  interface Session {
    user: User & DefaultSession["user"];
  }

  interface RolePermission {
    _id: string;
    module: string;
    permissions: number[];
  }

  interface Role {
    _id: string;
    name: string;
    description: string;
    status: boolean;
    permissions: RolePermission[];
    users: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
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
    expiresAt?: string; // ISO string for expiration
  }
}
