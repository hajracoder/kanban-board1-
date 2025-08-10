import React from "react";
import { Plus } from "lucide-react";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { Task, TaskStatus } from "../types";
import { databases } from "../appwrite/appwrite";
import { DATABASE_ID, COLLECTION_ID } from "../appwrite/appwrite";

type ColumnProps = {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  onAdd?: () => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onDelete: (id: string) => Promise<void>; // ✅ important
};

export default function Column({
  status,
  title,
  tasks,
  onAdd,
  setTasks,
}: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: status });

  // ✅ handleDelete is now inside component, has access to setTasks
  const handleDelete = async (id: string) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      setTasks((prev: Task[]) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("❌ Failed to delete:", error);
    }
  };

  const bgColors: Record<string, string> = {
    "To-do": "bg-blue-50",
    "In-progress": "bg-yellow-50",
    Done: "bg-green-50",
  };

  return (
    <div
      ref={setNodeRef}
      className={`min-w-[280px] w-full sm:w-[300px] max-w-full flex-shrink-0 p-4 rounded-xl flex flex-col gap-4 border ${
        bgColors[title] ?? "bg-gray-50"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-md sm:text-lg font-bold text-gray-700">{title}</h2>
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
          <TaskCard key={task.id} task={task} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}