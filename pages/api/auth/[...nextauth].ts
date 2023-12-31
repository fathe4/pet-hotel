import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import axios, { AxiosError } from "axios";
import { getBaseUrl } from "@/app/helpers/config/envConfig";
import { JWT } from "next-auth/jwt";

export type CustomJWT = JWT & {
  token?: {
    user: {
      id: string;
      username: string;
      token: string;
    };
  };
};
export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: "username-login",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        const baseUrl = getBaseUrl();

        const response = await axios.post(baseUrl + "/auth/signin", {
          email: credentials.email,
          password: credentials.password,
        });

        return response?.data;
      },
    }),
  ],
  callbacks: {
    async jwt(data) {
      return data;
    },
    async session({ session, token }: { session: any; token: any }) {
      const currentUser = await axios.get(getBaseUrl() + "/users/profile", {
        headers: { Authorization: token?.token?.user?.token },
      });

      session = currentUser?.data?.data;
      return { ...session, token: token?.token?.user?.token };
    },
  },
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
