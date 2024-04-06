import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

export default {
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
} satisfies NextAuthConfig;
