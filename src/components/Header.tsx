
import React, { useState } from "react";
import { Search, Bell, Settings, Lock, MoreVertical, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="px-6 py-4 border-b bg-white shadow-sm sticky top-0 z-50">
      {/* Top Row */}
      <div className="flex justify-between items-center sm:mb-0 mb-3">
        {/* Left: Logo */}
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-800">
          Kanban
        </h1>

        {/* Mobile Only: Dots Button */}
        <div className="sm:hidden relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-600"
          >
            <MoreVertical className="w-6 h-6" />
          </button>

          {/* Popup Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">
              {/* Close Button */}
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-1 right-1 text-gray-400 hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>

              <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 mb-2">
                <Lock className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 mb-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                <Bell className="w-4 h-4" />
                <span>Alerts</span>
              </button>
            </div>
          )}
        </div>

        {/* Desktop Icons */}
        <div className="hidden sm:flex items-center gap-4">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition text-sm">
            <Lock className="w-4 h-4" />
            <span>Share</span>
          </button>
          <Settings className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer transition" />
          <Bell className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer transition" />
        </div>
      </div>

      {/* Search Bar (Full width) */}
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
    </header>
  );
}
