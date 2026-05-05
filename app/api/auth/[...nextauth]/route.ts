import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      // Gmail ignores dots — strip them from local part for comparison
      const normalize = (e: string) => {
        const parts = e.toLowerCase().trim().split("@");
        return `${parts[0].replace(/\./g, "")}@${parts[1]}`;
      };
      const email = normalize(user.email);
      // Accept both dot variants of the same Gmail account
      const allowed = ["agrimminck94@gmail.com", "agrimminck.94@gmail.com"];
      return allowed.some((a) => normalize(a) === email);
    },
    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: "/admin",
    error: "/admin",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
