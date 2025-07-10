import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./DB";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import { User } from "next-auth";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "money@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email or Password is missing.");
        }

        try {
          const existingUser = await prisma.user.findFirst({
            where: { email: credentials.email },
          });

          if (!existingUser) {
            throw new Error("user does not exist.");
          }

          if (!existingUser.isVerified) {
            throw new Error("Please verify first.");
          }

          const isvalid = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );

          if (!isvalid) {
            throw new Error("Email or Password is wrong.");
          }

          return {
            id: existingUser.id.toString(), // ensure string
            email: existingUser.email,
            username: existingUser.username || null,
            name: existingUser.username || "", // required by DefaultUser
            success: true,
          } as User;
        } catch (error) {
          if (error instanceof Error) {
            console.log("Auth Error:", error.message);
            return null;
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error: "/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: user.email!,
          },
        });

        if (!dbUser) {
          // Add a custom flag to token
          token.registerRedirect = true;
          return token;
        }

        token.id = dbUser.id.toString();
        token.name = dbUser.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.name as string;
      }
      return session;
    },
  },

  secret: process.env.NEXT_AUTH_SECRET,
};
