import React from "react";
import {
  LayoutGrid,
  FolderKanban,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-full sm:w-64 min-h-screen bg-white border-r px-4 py-6">
      {/* Logo/Agency */}
      <div className="flex items-center gap-2 mb-10">
        <div className="w-6 h-6 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-md"></div>
        <span className="font-semibold text-lg">agency</span>
      </div>

      {/* Nav links */}
      <nav className="space-y-4">
        <div className="flex items-center gap-3 text-blue-600 font-medium">
          <LayoutGrid className="w-5 h-5" />
          Boards
        </div>
        <div className="flex items-center gap-3 text-gray-600 hover:text-black cursor-pointer">
          <FolderKanban className="w-5 h-5" />
          Projects
        </div>
        <div className="flex items-center gap-3 text-gray-600 hover:text-black cursor-pointer">
          <Settings className="w-5 h-5" />
          Settings
        </div>
      </nav>
    </aside>
  );
}
