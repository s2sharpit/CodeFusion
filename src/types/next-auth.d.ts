import { JWT } from "next-auth/jwt";
import NextAuth, { DefaultSession, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      username?: string;
      id: number;
      bio?: string;
      location?: string;
      twitter_username?: string;
      accessToken: string;
    } & AdapterUser;
  }
  interface signIn {
    user: {
      /** The user's postal address. */
      username: string;
    } & AdapterUser;
  }
}