import { type DefaultSession } from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    _id: string;
    image:string;
    name: string;
    userName: string;
    email: string;
    contact: string;
    isAdmin: boolean;
    userStatus: boolean;
    role?: Role;
    accessToken?: string;
  }

  interface Session {
    user: User & DefaultSession['user'];
  }

  interface RolePermission {
    _id: string;
    entityName: string;
    entityValues: number[];
  }

  interface Role {
    _id: string;
    roleName: string;
    roleDescription: string;
    roleStatus: boolean;
    rolePermissions: RolePermission[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    _id: string;
    image:string;
    name: string;
    userName: string;
    email: string;
    contact: string;
    isAdmin: boolean;
    userStatus: boolean;
    role?: Role;
    accessToken?: string;
  }
}
