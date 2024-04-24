import NextAuth, { Session } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";
import { revalidateTag } from "next/cache";
import authConfig from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,

  //   pages: {
  //     signIn: "/sign-in", // This is frontend route
  //   },

  callbacks: {
    async signIn({ user, profile }) {
      if (user && profile) {
        (user as Session["user"]).username = profile.login as string;
        (user as Session["user"]).bio = profile.bio as string;
      }
      return true;
    },
    //     async redirect({ url, baseUrl }) {
    //       return baseUrl;
    //     },
    async jwt({ token, user, account, profile }) {
      // Add accessToken & user-data to the token object to use in the session
      if (!token.user) {
        token.user = {} as Session["user"]; // Initialize token.user if it's undefined
      }

      if (account) {
        (token.user as Session["user"]).accessToken = account.access_token as string;
        (token.user as Session["user"]).id = user.id as string;
      }

      if (profile) {
        const { login: username } = profile;
        token.user = {
          ...(token.user as Session["user"]),
          username
        };
      }

      return token;
    },
    async session({ session, token }) {
      session.user = { ...session.user, ...(token.user as Session) };
      revalidateTag("users");
      return session;
    },
  },
});
