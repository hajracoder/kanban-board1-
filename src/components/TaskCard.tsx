
import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Github, Linkedin, Facebook, Trash2 } from "lucide-react";
import { Task } from "../types";

type Props = {
  task: Task;
  onDelete: (id: string) => Promise<void>; // important: async delete
};

const TaskCard: React.FC<Props> = ({ task, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task.id });
  const [isDeleting, setIsDeleting] = useState(false);

const handleDelete = async () => {
  try {
    // ✅ Explicit window.confirm to avoid ESLint/browser block
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      const confirmDelete = window.confirm("Are you sure you want to delete this task?");
      if (!confirmDelete) return;
    }

    setIsDeleting(true);

    // Allow animation to run
    setTimeout(() => {
      onDelete(task.id); // Don't await inside setTimeout
    }, 200);
  } catch (error) {
    console.error("❌ Delete failed:", error);
    setIsDeleting(false);
  }
};



  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    opacity: isDragging ? 0.6 : 1,
    transition: isDragging ? "none" : "transform 0.25s ease",
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`bg-white p-4 rounded-xl border border-gray-200 shadow-md 
        hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out 
        cursor-grab active:cursor-grabbing flex flex-col justify-between 
        ${isDeleting ? "opacity-0 scale-95 pointer-events-none" : ""}`}
    >
      {/* Title & Description */}
      <div>
        <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
        {task.description && <p className="text-sm text-gray-600 mt-1">{task.description}</p>}
        {task.date && <p className="text-xs text-gray-400 mt-2">📅 Due: {task.date}</p>}
      </div>

      {/* Avatar */}
      {task.avatar && (
        <div className="mt-4 flex justify-start">
          <img
            src="/images/s2.jpg"
            alt="Avatar"
            className="w-10 h-10 rounded-full border border-gray-300 object-cover shadow-sm"
          />
        </div>
      )}

      {/* Footer: Socials & Delete */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-3 text-gray-500">
          {task.github && (
            <a href={task.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 hover:text-black" />
            </a>
          )}
          {task.linkedin && (
            <a href={task.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-4 h-4 hover:text-blue-600" />
            </a>
          )}
          {task.facebook && (
            <a href={task.facebook} target="_blank" rel="noopener noreferrer">
              <Facebook className="w-4 h-4 hover:text-blue-500" />
            </a>
          )}
        </div>

        {/* Delete */}
        <button
  onClick={handleDelete}
  onTouchEnd={handleDelete}
  className="text-red-500 hover:text-red-700 transition touch-none"
  title="Delete Task"
>
  <Trash2 className="w-5 h-5 sm:w-4 sm:h-4 pointer-events-auto" />
</button>

      </div>
    </div>
  );
};

export default TaskCard;
