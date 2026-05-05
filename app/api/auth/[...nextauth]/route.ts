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
      // Gmail ignores dots in local part — normalize both sides
      const normalize = (e: string) => {
        const [local, domain] = e.toLowerCase().split("@");
        return `${local.replace(/\./g, "")}@${domain}`;
      };
      const adminRaw = process.env.ADMIN_EMAIL ?? "";
      return normalize(user.email) === normalize(adminRaw);
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
