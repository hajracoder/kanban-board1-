import React from "react";
import { Star } from "lucide-react";

export default function Topbar() {
  return (
    <header className="w-full px-4 sm:px-6 py-4 border-b bg-white shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-semibold">Kanban board</h1>
          <Star className="w-5 h-5 text-yellow-400 cursor-pointer" />
        </div>
      </div>
    </header>
  );
}
