import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import prisma from "@/lib/db";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  // adapter: PrismaAdapter(prisma),
  // session: { strategy: "jwt" },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  //   pages: {
  //     signIn: "/sign-in", // This is frontend route
  //   },

//   callbacks: {
//     async signIn({ user, account, profile, email, credentials }) {
//       return true;
//     },
//     async redirect({ url, baseUrl }) {
//       return baseUrl;
//     },
//     async session({ session, user, token }) {
//       return session;
//     },
//     async jwt({ token, user, account, profile, isNewUser }) {
//       return token;
//     },
//   },
});
