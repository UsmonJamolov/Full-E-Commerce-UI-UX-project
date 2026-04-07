import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { axiosClient } from "@/http/axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        userId: {
          label: "User ID",
          type: "text",
        },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.userId) return null;

          const { data } = await axiosClient.get(
            `/api/user/profile/${credentials.userId}`
          );

          if (!data?.user) return null;

          const user = data.user;

          return {
            id: user._id,
            name: user.name || user.phone || "User",
            image: user.avatar || "", // <-- MUHIM
            phone: user.phone,
            role: user.role,
          };
        } catch (error) {
          console.log("AUTHORIZE ERROR:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          token.userId = user.id;
          token.phone = (user as any).phone;
          token.role = (user as any).role;
          token.name = user.name;
          token.image = user.image; // <-- MUHIM
        }

        console.log("JWT CALLBACK TOKEN:", token);

        return token;
      } catch (error) {
        console.log("JWT CALLBACK ERROR:", error);
        return token;
      }
    },

    async session({ session, token }) {
      try {
        console.log("SESSION CALLBACK TOKEN:", token);

        const userId = token.userId as string;

        if (!userId) return session;

        const { data } = await axiosClient.get(`/api/user/profile/${userId}`);

        if (!data?.user) return session;

        const user = data.user;

        session.user = {
          ...session.user,
          name: user.name || user.phone || "User",
          email: null,
          image: user.avatar || "", // <-- MUHIM
          id: user._id,
          phone: user.phone,
          role: user.role,
        };

        session.currentUser = {
          _id: user._id,
          phone: user.phone,
          name: user.name || user.phone || "User",
          role: user.role,
          avatar: user.avatar || "", // <-- MUHIM
          favorites: user.favorites || [],
          isDeleted: user.isDeleted,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };

        console.log("SESSION CALLBACK RESULT:", session);

        return session;
      } catch (error) {
        console.log("SESSION CALLBACK ERROR:", error);
        return session;
      }
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/sign-in",
  },

  secret: process.env.NEXTAUTH_SECRET,
};