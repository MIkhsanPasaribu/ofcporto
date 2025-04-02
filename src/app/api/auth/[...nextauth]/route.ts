/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authUtils } from "@/lib/auth-utils";

// Log environment information
console.log("[NextAuth] Environment:", {
  nodeEnv: process.env.NODE_ENV,
  vercelUrl: process.env.VERCEL_URL,
  nextAuthUrl: process.env.NEXTAUTH_URL,
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not Set',
});

// Create handler with simplified configuration
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("[NextAuth] Missing credentials");
          return null;
        }

        try {
          console.log(`[NextAuth] Attempting login for: ${credentials.email}`);
          
          // Ensure admin exists before attempting login
          await authUtils.ensureAdminExists();
          
          // Find user
          const user = await authUtils.findUserByEmail(credentials.email);
          if (!user) {
            console.log("[NextAuth] User not found");
            return null;
          }

          // Verify password
          const passwordMatch = await authUtils.verifyPassword(
            credentials.password,
            user.password
          );

          if (!passwordMatch) {
            console.log("[NextAuth] Password doesn't match");
            return null;
          }

          console.log("[NextAuth] Login successful");
          return {
            id: user.id,
            email: user.email,
            name: user.name
          };
        } catch (error) {
          console.error("[NextAuth] Auth error:", error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string;
      }
      return session;
    }
  },
  debug: process.env.NODE_ENV !== "production" || process.env.NEXTAUTH_DEBUG === "true",
});

export { handler as GET, handler as POST };