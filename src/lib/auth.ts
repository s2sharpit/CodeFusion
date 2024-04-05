import NextAuth, { Session, signIn } from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";
import { revalidateTag } from "next/cache";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      authorization: {
        params: {
          // I wish to request additional permission scopes.
          scope: "public_repo read:user user:email",
        },
      },
    }),
  ],
  //   pages: {
  //     signIn: "/sign-in", // This is frontend route
  //   },

  callbacks: {
    async signIn({ user, profile }) {
      if (user && profile) {
        (user as signIn["user"]).username = profile.login as string;
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
        (token.user as Session["user"]).accessToken =
          account.access_token as string;
        (token.user as Session["user"]).id = user.id as string;
      }

      if (profile) {
        const { login: username, bio, location, twitter_username } = profile;
        token.user = { ...(token.user as Session["user"]), username, bio, location, twitter_username, };
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
