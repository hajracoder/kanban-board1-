// ✅ FINAL KanbanBoard.tsx (Appwrite + Frontend only, No Image Upload)

import React, { useEffect, useState } from "react";
import Column from "./Column";
import AddTaskModal from "./NewTaskModal";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { databases, DATABASE_ID, COLLECTION_ID } from "../appwrite/appwrite";
import { ID } from "appwrite";
import { Task, TaskStatus } from "../types";

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);

  // 🔃 Load tasks from backend
  const loadTasks = async () => {
    try {
      const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      const loaded: Task[] = res.documents.map((doc: any) => ({
        id: doc.$id,
        title: doc.title,
        description: doc.description,
        date: doc.date,
        status: doc.status,
        github: doc.github,
        linkedin: doc.linkedin,
        facebook: doc.facebook,
        avatar: "/images/s1.jpg", // ✅ Local frontend image only
      }));
      setTasks(loaded);
    } catch (err) {
      console.error("❌ Failed to load tasks", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // ➕ Create new task
  const handleAddTask = async (data: {
    title: string;
    description: string;
    date: string;
  }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      date: data.date,
      status: "to-do",
      avatar: "/images/s1.jpg",
    };

    setTasks((prev) => [...prev, newTask]); // fast UI

    try {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        ...data,
        status: "to-do",
        github: "",
        linkedin: "",
        facebook: "",
      });
    } catch (err) {
      console.error("❌ Failed to create document", err);
    }
  };

  // 🗑️ Delete task
  const handleDelete = async (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    } catch (err) {
      console.error("❌ Delete failed", err);
    }
  };

  // 🔀 Drag/Drop logic
  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    const oldTask = tasks.find((t) => t.id === active.id);
    const newStatus = over.id as TaskStatus;
    if (!oldTask || oldTask.status === newStatus) return;

    const updatedTask = { ...oldTask, status: newStatus };
    const newList = tasks.map((t) => (t.id === active.id ? updatedTask : t));
    setTasks(newList);

    try {
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, active.id, {
        status: newStatus,
      });
    } catch (err) {
      console.error("❌ Drag update failed", err);
    }
  };

  const columnLabels: Record<TaskStatus, string> = {
    "to-do": "To-do",
    progress: "In-progress",
    done: "Done",
  };

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        {Object.keys(columnLabels).map((status) => (
          <Column
            key={status}
            status={status as TaskStatus}
            title={columnLabels[status as TaskStatus]}
            tasks={tasks.filter((task) => task.status === status)}
            onAdd={status === "to-do" ? () => setShowModal(true) : undefined}
            onDelete={handleDelete}
          />
        ))}
      </DndContext>
      {showModal && <AddTaskModal onAdd={handleAddTask} onClose={() => setShowModal(false)} />}
    </div>
  );
}
