


import React from "react";
import {
  LayoutGrid,
  FolderKanban,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-full sm:w-64 min-h-screen bg-white border-r px-6 py-8 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <div className="w-6 h-6 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-md shadow-md"></div>
        <span className="font-bold text-xl tracking-tight text-gray-800">agency</span>
      </div>

      {/* Nav */}
      <nav className="space-y-4">
        <div className="flex items-center gap-3 text-blue-600 font-semibold">
          <LayoutGrid className="w-5 h-5" />
          <span>Boards</span>
        </div>

        <div className="flex items-center gap-3 text-gray-600 hover:text-black transition cursor-pointer">
          <FolderKanban className="w-5 h-5" />
          <span>Projects</span>
        </div>

        <div className="flex items-center gap-3 text-gray-600 hover:text-black transition cursor-pointer">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </div>
      </nav>
    </aside>
  );
}
