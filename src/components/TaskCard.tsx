

import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Github, Linkedin, Facebook, Trash2 } from "lucide-react";
import { Task } from "../types";

type Props = {
  task: Task;
  onDelete: (id: string) => void;
};

const TaskCard: React.FC<Props> = ({ task, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

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
      className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 ease-in-out cursor-grab active:cursor-grabbing flex flex-col justify-between space-y-4"
    >
      {/* Title + Description */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">{task.title}</h3>
        {task.description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-3">{task.description}</p>
        )}
        {task.date && (
          <p className="text-xs text-gray-400 mt-2">📅 Due: {task.date}</p>
        )}
      </div>

      {/* Avatar */}
      {task.avatar && (
        <div className="flex items-center gap-2">
          <img
            src="/images/s2.jpg"
            alt="Avatar"
            className="w-9 h-9 rounded-full border object-cover shadow-sm"
          />
          <span className="text-xs text-gray-500 hidden sm:inline">Assigned</span>
        </div>
      )}

      {/* Footer: Icons + Delete */}
      <div className="flex items-center justify-between">
        {/* Social icons */}
        <div className="flex gap-3 text-gray-500">
          {task.github && (
            <a href={task.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 hover:text-black transition" />
            </a>
          )}
          {task.linkedin && (
            <a href={task.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-4 h-4 hover:text-blue-600 transition" />
            </a>
          )}
          {task.facebook && (
            <a href={task.facebook} target="_blank" rel="noopener noreferrer">
              <Facebook className="w-4 h-4 hover:text-blue-500 transition" />
            </a>
          )}
        </div>

        {/* Delete */}
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700 transition"
          title="Delete Task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

