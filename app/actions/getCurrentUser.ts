import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { CurrentUser } from "../types";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const session: any = await getSession();

    if (!session) {
      return null;
    }

    return session;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}
