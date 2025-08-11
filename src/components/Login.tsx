


import React, { useState } from "react";
import { account, databases, ID } from "../appwrite/appwrite";
import { Query } from "appwrite";
import { useNavigate } from "react-router-dom";

const DATABASE_ID = "your_database_id"; // Replace with actual
const USERS_COLLECTION_ID = "your_users_collection_id"; // Replace with actual

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Login session
      await account.createEmailPasswordSession(email, password);

      // Get logged-in user info
      const currentUser = await account.get();

      // Check if user already exists in users collection
      const existing = await databases.listDocuments(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        [Query.equal("userId", currentUser.$id)]
      );

      if (existing.total === 0) {
        // Add user if not found
        await databases.createDocument(
          DATABASE_ID,
          USERS_COLLECTION_ID,
          ID.unique(),
          {
            userId: currentUser.$id,
            name: currentUser.name || currentUser.email.split("@")[0],
            email: currentUser.email,
          }
        );
        console.log("👤 New user added to Users collection");
      } else {
        console.log("👤 User already exists in Users collection");
      }

      // Redirect to homepage or dashboard
      navigate("/");
    } catch (error: any) {
      console.error("❌ Login failed:", error);
      alert("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-xl font-bold text-center text-gray-800">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
          autoComplete="email"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
          autoComplete="current-password"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
