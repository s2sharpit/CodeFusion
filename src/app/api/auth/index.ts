import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";


export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  // callbacks: {
  //   async session({ session, user }) {
  //     // Fetch user info if available
  //     console.log(session, user);

  //     // session.user.username = token?.account?.login;
  //     return session;
  //   },
  // },
});
