// import { DefaultSession } from "next-auth"
// import { SafeUser } from "@/types"

// declare module "next-auth" {
//   interface Session {
//     currentUser?: SafeUser
//     user: DefaultSession["user"]
//   }
// }

import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      phone?: string;
      role?: string;
    } & DefaultSession["user"];

    currentUser?: {
      _id: string;
      phone: string;
      name: string;
      role: string;
      favorites: any[];
      isDeleted: boolean;
      createdAt: string;
      updatedAt: string;
    };
  }

  interface User extends DefaultUser {
    id: string;
    phone?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userId?: string;
    phone?: string;
    role?: string;
  }
}