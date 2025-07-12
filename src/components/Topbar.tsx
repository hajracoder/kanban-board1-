import React from "react";
import { Star, Menu } from "lucide-react";

type Props = {
  onToggleSidebar?: () => void;
};

export default function Topbar({ onToggleSidebar }: Props) {
  return (
    <header className="w-full sticky top-0  px-4 sm:px-6 py-4 border-b bg-white shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left side: Sidebar toggle (mobile only) + title */}
        <div className="flex items-center gap-3">
          {/* Hamburger icon only on small screens */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden text-gray-600 hover:text-black transition"
          >
            <Menu className="w-6 h-6" />
          </button>

          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Kanban board
          </h1>
          <Star className="w-5 h-5 text-yellow-400 cursor-pointer" />
        </div>
      </div>
    </header>
  );
}
