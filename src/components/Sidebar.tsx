import React, { useState } from "react";
import { LayoutGrid, FolderKanban, Settings, X } from "lucide-react";

type SidebarProps = {
  onClose?: () => void; // for mobile toggle close
};

export default function Sidebar({ onClose }: SidebarProps) {
  const [activeTab, setActiveTab] = useState("Boards");

  const navItems = [
    { label: "Boards", icon: LayoutGrid },
    { label: "Projects", icon: FolderKanban },
    { label: "Settings", icon: Settings },
  ];

  return (
    <aside className="h-full  w-64 bg-white border-r shadow-md flex flex-col px-4 py-6">
      {/* ✅ Close button on mobile */}
      <div className="flex justify-end lg:hidden mb-4">
        <button onClick={onClose}>
          <X className="w-5 h-5 text-gray-500 hover:text-black" />
        </button>
      </div>

      {/* ✅ Logo */}
      <div className="flex items-center gap-2 mb-10">
        <div className="w-6 h-6 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-md"></div>
        <span className="font-semibold text-lg text-gray-800">agency</span>
      </div>

      {/* ✅ Navigation Links */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.label === activeTab;

          return (
            <div
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
