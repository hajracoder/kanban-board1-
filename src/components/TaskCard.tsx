

// import React, { useState } from "react";
// import { useDraggable } from "@dnd-kit/core";
// import { Trash2 } from "lucide-react";
// import { Task } from "../types";

// type Props = {
//   task: Task;
//   onDelete: (id: string) => Promise<void>;
// };

// const TaskCard: React.FC<Props> = ({ task, onDelete }) => {
//   const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task.id });
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const handleDelete = () => {
//     setShowConfirm(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       setIsDeleting(true);
//       setShowConfirm(false);

//       setTimeout(() => {
//         onDelete(task.id);
//       }, 200);
//     } catch (error) {
//       console.error("❌ Delete failed:", error);
//       setIsDeleting(false);
//     }
//   };

//   const style = {
//     transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
//     opacity: isDragging ? 0.6 : 1,
//     transition: isDragging ? "none" : "transform 0.25s ease",
//   };

//   return (
//     <>
//       <div
//         ref={setNodeRef}
//         {...listeners}
//         {...attributes}
//         style={style}
//         className={`bg-white p-4 rounded-xl border border-gray-200 shadow-md 
//           hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out 
//           cursor-grab active:cursor-grabbing flex flex-col justify-between 
//           ${isDeleting ? "opacity-0 scale-95 pointer-events-none" : ""}`}
//       >
//         {/* Title & Description */}
//         <div>
//           <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
//           {task.description && <p className="text-sm text-gray-600 mt-1">{task.description}</p>}
//           {task.date && <p className="text-xs text-gray-400 mt-2">📅 Due: {task.date}</p>}
//           {task.ownerName && (
//             <p className="text-xs text-gray-500 mt-2">
//               👤 Owner: <span className="font-medium">{task.ownerName}</span>
//             </p>
//           )}
//         </div>

//         {/* Delete Button */}
//         <div className="mt-3 flex justify-end">
//           <button
//             onClick={handleDelete}
//             onTouchEnd={handleDelete}
//             className="text-red-500 hover:text-red-700 transition touch-none"
//             title="Delete Task"
//           >
//             <Trash2 className="w-5 h-5 sm:w-4 sm:h-4 pointer-events-auto" />
//           </button>
//         </div>
//       </div>

//       {/* Confirmation Modal */}
//       {showConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full text-center">
//             <h2 className="text-lg font-semibold text-gray-800 mb-2">Are you sure?</h2>
//             <p className="text-sm text-gray-600 mb-6">Do you really want to delete this task?</p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={() => setShowConfirm(false)}
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default TaskCard;
















import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Trash2 } from "lucide-react";
import { Task } from "../types";

type Props = {
  task: Task;
  onDelete: (id: string) => Promise<void>;
};

const TaskCard: React.FC<Props> = ({ task, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task.id });
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      setShowConfirm(false);

      setTimeout(() => {
        onDelete(task.id);
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
    <>
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
          {task.ownerName && (
            <p className="text-xs text-gray-500 mt-2">
              👤 Assign to: <span className="font-medium">{task.ownerName}</span>
            </p>
          )}
        </div>

        {/* Delete Button */}
        <div className="mt-3 flex justify-end">
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

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Are you sure?</h2>
            <p className="text-sm text-gray-600 mb-6">Do you really want to delete this task?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCard;
