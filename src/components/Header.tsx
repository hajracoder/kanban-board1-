

import React from "react";
import { Search, Bell, Settings, Lock } from "lucide-react";

export default function Header() {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 border-b bg-white shadow-sm sticky top-0 z-50">
      {/* Logo */}
      <h1 className="text-2xl font-extrabold tracking-tight text-gray-800">Kanban</h1>

      {/* Search */}
      <div className="w-full sm:w-1/2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Icons + Share */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition text-sm">
          <Lock className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </button>
        <Settings className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer transition" />
        <Bell className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer transition" />
      </div>
    </header>
  );
}
