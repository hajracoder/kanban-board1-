import React from "react";
import { Plus } from "lucide-react";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

type Task = {
  id: string;
  title: string;
  description?: string;
  date?: string;
  status: "To-do" | "In-progress" | "Done";
  avatars?: string[]; // 🧑‍💻 multiple DPs
  linkedin?: string;
  github?: string;
  facebook?: string;
};


type ColumnProps = {
  title: string;
  tasks: Task[];
  onDelete: (id: string) => void;
  onAdd?: () => void;
};

export default function Column({ title, tasks, onAdd, onDelete }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: title });

  const bgColors: Record<string, string> = {
    "To-do": "bg-blue-50",
    "In-progress": "bg-yellow-50",
    Done: "bg-green-50",
  };

  return (
    <div
      ref={setNodeRef}
      className={`p-4 rounded-xl w-full max-w-sm flex flex-col gap-4 border ${
        bgColors[title] ?? "bg-gray-50"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-md font-bold text-gray-700">{title}</h2>
        {title === "To-do" && onAdd && (
          <button
            className="p-1 text-gray-500 hover:text-gray-800"
            onClick={onAdd}
          >
            <Plus className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Task Cards */}
      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}
