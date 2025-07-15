// src/lib/auth.ts
import { account } from "../appwrite/appwrite";

export const checkUserSession = async () => {
  try {
    const session = await account.get();
    return session; // 🔒 Logged-in user
  } catch (error) {
    return null; // ❌ No user session
  }
};
