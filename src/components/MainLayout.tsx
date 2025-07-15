


import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* ✅ Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ✅ Sidebar */}
      <div
        className={`fixed top-16 left-0 z-40 lg:static lg:translate-x-0 h-[calc(100vh-4rem)] w-64 transform bg-white border-r shadow-md transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* ✅ Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* ✅ Fixed Topbar */}
        <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* ✅ Content below Topbar */}
        <main className="flex-1 p-4  overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

