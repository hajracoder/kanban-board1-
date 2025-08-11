


import React, { useState } from "react";
import { account, databases, ID } from "../appwrite/appwrite";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. Create user account
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );
      console.log("✅ Account created:", userAccount);

      // 2. Create session (login)
      await account.createEmailPasswordSession(email, password);
      console.log("✅ Logged in");

      // 3. Add user to USERS collection with userId from account
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS, // USERS collection ID
        userAccount.$id, // user id as document id
        {
          userId: userAccount.$id,
          name: name,
          email: email,
        }
      );
      console.log("✅ User added to USERS collection");

      // 4. Redirect to home or dashboard
      navigate("/");
    } catch (error) {
      console.error("❌ Signup error:", error);
      alert("Signup failed. Check console.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
          autoComplete="name"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
          autoComplete="email"
        />

        <input
          type="password"
          autoComplete="new-password"
          placeholder="Password"
          className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition mt-4"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;
