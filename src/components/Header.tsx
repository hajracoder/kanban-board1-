import React from "react";
import { Search, Bell, Settings, Lock } from "lucide-react";

export default function Header() {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b shadow-sm bg-white">
      {/* Left: Logo */}
      <h1 className="text-2xl font-bold">Kanban</h1>

      {/* Center: Search */}
      <div className="w-full sm:w-1/2">
        <div className="relative">
          <input
            type="text"
            placeholder="Try searching tasks"
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
        </div>
      </div>

      {/* Right: Icons and Share */}
      <div className="flex items-center justify-end gap-4">
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          <Lock className="w-4 h-4" />
          Share
        </button>
        <Settings className="w-6 h-6 text-gray-700 hover:text-black cursor-pointer" />
        <Bell className="w-6 h-6 text-gray-700 hover:text-black cursor-pointer" />
      </div>
    </header>
  );
}
