
import React, { useState } from "react";
import { Search, Bell, Settings, Lock, MoreVertical, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="px-4 sm:px-6 py-4 border-b bg-white shadow-sm sticky top-0 z-50  ">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Top Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-3 sm:gap-0">
          {/* Logo & Mobile Actions */}
          <div className="flex justify-between items-center w-full sm:w-auto">
            {/* Logo */}
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-800">
              Kanban
            </h1>

            {/* Mobile Dots */}
            <div className="sm:hidden relative">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                <MoreVertical className="w-6 h-6 text-gray-700" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50 p-4">
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="absolute top-1 right-1 text-gray-400 hover:text-black"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button className="flex items-center gap-2 mb-2 text-gray-700 hover:text-blue-600">
                    <Lock className="w-4 h-4" />
                    Share
                  </button>
                  <button className="flex items-center gap-2 mb-2 text-gray-700 hover:text-blue-600">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                    <Bell className="w-4 h-4" />
                    Alerts
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full sm:w-1/2 mt-2 sm:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
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
      </div>
    </header>
  );
}
