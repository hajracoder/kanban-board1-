// import React from "react";
// import {
//   GripVertical,
//   CalendarDays,
//   Tag,
//   Trash2,
// } from "lucide-react";
// import { useDraggable } from "@dnd-kit/core";

// type TaskCardProps = {
//   id: string;
//   title: string;
//   description?: string;
//   date?: string;
//   onDelete: (id: string) => void;
// };

// export default function TaskCard({
//   id,
//   title,
//   description,
//   date = "2025-07-06 09:00 AM",
//   onDelete,
// }: TaskCardProps) {
//   const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

//   const style = {
//     transform: transform
//       ? `translate(${transform.x}px, ${transform.y}px)`
//       : undefined,
//   };

//   const confirmDelete = () => {
//     if (window.confirm("Are you sure you want to delete this task?")) {
//       onDelete(id);
//     }
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       onClick={(e) => e.stopPropagation()} // ✅ block accidental delete
//       onDoubleClick={(e) => {
//         e.preventDefault(); // ✅ avoid accidental trigger
//         e.stopPropagation();
//       }}
//       className="bg-white border border-gray-300 rounded-xl p-5 shadow-md hover:shadow-lg transition cursor-grab relative"
//     >
//       {/* Trash Icon */}
//       <button
//         type="button"
//         onClick={(e) => {
//           e.stopPropagation();  // ✅ prevent event bubbling
//           e.preventDefault();   // ✅ don't interfere with drag
//           confirmDelete();
//         }}
//         className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
//       >
//         <Trash2 className="w-4 h-4" />
//       </button>

//       {/* Top Section */}
//       <div className="flex justify-between items-start">
//         <div>
//           <h3 className="font-semibold text-base">{title}</h3>
//           {description && (
//             <p className="text-sm text-gray-600 mt-1">{description}</p>
//           )}
//         </div>
//         <GripVertical className="w-4 h-4 text-gray-400" />
//       </div>

//       {/* Date + Tag */}
//       <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
//         <div className="flex items-center gap-2">
//           <CalendarDays className="w-4 h-4" />
//           <span>{date}</span>
//         </div>
//         <Tag className="w-4 h-4 text-blue-500" />
//       </div>
//     </div>
//   );
// 









import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Github, Linkedin, Facebook, Trash2 } from "lucide-react";

type Task = {
  id: string;
  title: string;
  description?: string;
  date?: string;
  status: "To-do" | "In-progress" | "Done";
  avatar?: string;
  linkedin?: string;
  github?: string;
  facebook?: string;
};

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
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-move flex flex-col justify-between"
    >
      {/* Task Content */}
      <div>
        <h3 className="text-lg font-semibold">{task.title}</h3>
        {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
        {task.date && <p className="text-xs text-gray-400 mt-1">Due: {task.date}</p>}
      </div>

      {/* Avatar Image */}
      {task.avatar && (
        <div className="mt-4 flex justify-start">
          <img
            src='/images/s2.jpg'
            alt="Avatar"
            className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-sm object-cover"
          />
        </div>
      )}

      {/* Bottom Row: Icons + Delete */}
      <div className="mt-3 flex items-center justify-between">
        {/* Social Icons Left */}
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

        {/* Delete Icon Right */}
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700"
          title="Delete Task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
