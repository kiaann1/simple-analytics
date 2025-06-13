import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const bypassAuth = process.env.BYPASS_AUTH === "true";

export const authOptions: NextAuthOptions = {
  providers: [
    // Only include Google provider when not bypassing auth
    ...(bypassAuth ? [] : [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        authorization: {
          params: {
            scope: "openid email profile https://www.googleapis.com/auth/analytics.readonly",
          },
        },
      })
    ]),
    // Add bypass credentials provider for development
    ...(bypassAuth ? [
      CredentialsProvider({
        name: "bypass",
        credentials: {},
        async authorize() {
          return {
            id: "1",
            email: process.env.DEFAULT_USER_EMAIL || "admin@kwmt.dev",
            name: "Admin User",
            image: null,
          };
        },
      })
    ] : []),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (bypassAuth && !token.accessToken) {
        // Mock access token for bypass mode
        token.accessToken = "mock-access-token";
        token.refreshToken = "mock-refresh-token";
      }
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      if (profile && 'picture' in profile && typeof profile.picture === 'string') {
        token.picture = profile.picture;
      }
      return token;
    },
    async session({ session, token }) {
      if (bypassAuth && !session.accessToken) {
        session.accessToken = "mock-access-token";
      } else {
        session.accessToken = token.accessToken as string;
      }
      if (token.picture && session.user) {
        session.user.image = token.picture as string;
      }
      return session;
    },
    async signIn() {
      // Always allow sign in when bypassing auth
      return bypassAuth ? true : true;
    },
  },
  pages: {
    signIn: bypassAuth ? undefined : "/auth/signin",
  },
};
