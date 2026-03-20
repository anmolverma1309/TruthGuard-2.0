import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // This is a demo implementation. In a real-world app, you would verify credentials against a database.
        if (credentials?.email === "admin@truthguard.ai" && credentials?.password === "password123") {
          return { id: "1", name: "Admin User", email: "admin@truthguard.ai" };
        }
        // For demo purposes, allow any new user
        if (credentials?.email && credentials?.password) {
          return { id: "2", name: "Demo User", email: credentials.email };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };
