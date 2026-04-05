// import { axiosClient } from "@/http/axios";
// import { ReturnActionType } from "@/types";
// import { NextAuthOptions } from "next-auth";
// import Credentials from "next-auth/providers/credentials";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     Credentials({
//       name: "Credentials",

//       credentials: {
//         userId: { label: "User ID", type: "text" },
//       },

//       async authorize(credentials) {
//         try {
//           if (!credentials?.userId) return null;

//           // USER PROFILE OLISH
//           const { data } = await axiosClient.get<ReturnActionType>(
//             `/api/user/profile/${credentials.userId}`
//           );

//           console.log("AUTHORIZE user data:", data);

//           if (!data?.user) return null;

//           return {
//             id: data.user._id,
//             name: data.user._id, // name maydoni bo'lmasa phone ko'rsatiladi
//             phone: data.user.phone,
//           };
//         } catch (error) {
//           return null;
//         }
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       // login paytida userni token ichiga saqlaymiz
//       if (user) {
//         token.userId = user.id;
//       }

//       console.log("JWT AFTER:", token);

//       return token;
//     },
//     async session({ session, token }) {
//       try {
//         console.log("SESSION CALLBACK TOKEN:", token);
//         // TOKENDAN USER ID OLAMIZ
//         const userId = token.userId as string;

//         if (!userId) return session;

//         // HAR SAFAR PROFILE OLAMIZ
//         const { data } = await axiosClient.get<ReturnActionType>(
//           `/api/user/profile/${userId}`
//         );

//         session.currentUser = data.user;

//         console.log("Current user: ", session);
        

//         console.log("SESSION CALLBACK RESULT:", session);
//         return session;
//       } catch (error) {
//         return session;
//       }
//     },
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };


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

          // USER PROFILE OLAMIZ
          const { data } = await axiosClient.get(
            `/api/user/profile/${credentials.userId}`
          );

          if (!data?.user) return null;

          const user = data.user;

          return {
            id: user._id,
            name: user.name || user.phone || "User",
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
        // LOGIN PAYTIDA authorize() dan qaytgan user shu yerga tushadi
        if (user) {
          token.userId = user.id;
          token.phone = (user as any).phone;
          token.role = (user as any).role;
          token.name = user.name;
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

        // HAR SAFAR TO‘LIQ USER PROFILE OLAMIZ
        const { data } = await axiosClient.get(`/api/user/profile/${userId}`);

        if (!data?.user) return session;

        const user = data.user;

        // DEFAULT NEXTAUTH USER OBJECT
        session.user = {
          ...session.user,
          name: user.name || user.phone || "User",
          email: null, // email ishlatmayapsan
          image: null, // image ishlatmayapsan
          id: user._id,
          phone: user.phone,
          role: user.role,
        };

        // CUSTOM FULL USER OBJECT
        session.currentUser = {
          _id: user._id,
          phone: user.phone,
          name: user.name,
          role: user.role,
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
    signIn: "/sign-in", // agar login page shu bo‘lsa qoldir
  },

  secret: process.env.NEXTAUTH_SECRET,
};
