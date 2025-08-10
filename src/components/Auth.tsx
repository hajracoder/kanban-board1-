














import React, { useState } from "react";
import { account, databases } from "../appwrite/appwrite";
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";

const DATABASE_ID = "686e61c50031482b748c";
const USERS_COLLECTION_ID = "6890fa640015b8830dfa";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // 🔹 Login existing user
        await account.createEmailPasswordSession(email, password);
      } else {
        // 🔹 Create new user in Auth
        const userId = ID.unique();
        const newUser = await account.create(userId, email, password, name);

        // 🔹 Store in Users collection for dropdown
        await databases.createDocument(
          "686e61c50031482b748c",
          "6890fa640015b8830dfa",
          ID.unique(),
          {
            userId: newUser.$id, // Appwrite Auth user ID
            name: name,
            email: email,
          }
        );

        // 🔹 Auto-login
        await account.createEmailPasswordSession(email, password);
      }
      navigate("/"); // ✅ Redirect after login/signup
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 shadow-lg rounded-xl p-8 space-y-5 w-full max-w-sm border border-slate-700"
      >
        <h2 className="text-2xl font-bold text-center mb-2">
          {isLogin ? "Welcome Back!" : "Create Your Account"}
        </h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="text-center text-sm mt-2 text-slate-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
}
