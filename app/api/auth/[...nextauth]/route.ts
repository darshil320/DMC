import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Demo Account",
      credentials: {
        email: { label: "Email (use: demo@furniture.com)", type: "email" },
        password: { label: "Password (use: password)", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.email === "demo@furniture.com" && credentials?.password === "password") {
          return { id: "1", name: "Demo User", email: "demo@furniture.com" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/api/auth/signin',
  },
  session: {
    strategy: "jwt",
  }
});

export { handler as GET, handler as POST };
