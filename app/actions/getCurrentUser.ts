import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import axios from "axios";
import { getBaseUrl } from "../helpers/config/envConfig";
import { CurrentUser } from "../types";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const session = await getSession();

    if (!session?.token) {
      return null;
    }

    const currentUser = await axios.get(getBaseUrl() + "/users/profile", {
      headers: { Authorization: session?.token },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser.data.data,
      token: session?.token,
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}
