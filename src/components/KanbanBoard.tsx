import React, { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Column from "./Column";
import AddTaskModal from "./NewTaskModal";
import { databases, DATABASE_ID, COLLECTION_ID } from "../appwrite/appwrite";
import { ID } from "appwrite";
import { Task, TaskStatus } from "../types";

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);

  // ✅ Load tasks from Appwrite on first render
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        const loadedTasks: Task[] = res.documents.map((doc) => ({
          id: doc.$id,
          title: doc.title,
          description: doc.description,
          date: doc.date,
          status: doc.status as TaskStatus,
          avatar: "/images/s2.jpg",
          github: doc.github,
          linkedin: doc.linkedin,
          facebook: doc.facebook,
        }));
        setTasks(loadedTasks);
      } catch (err) {
        console.error("❌ Error loading tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  // ✅ Add new task
  const handleAddTask = async (data: {
    title: string;
    description: string;
    date: string;
  }) => {
    const newLocalTask: Task = {
      id: Date.now().toString(), // temp ID
      title: data.title,
      description: data.description,
      date: data.date,
      status: "to-do",
      avatar: "/images/s1.jpg",
    };

    setTasks((prev) => [...prev, newLocalTask]); // fast UI

    try {
      const res = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          title: data.title,
          description: data.description,
          date: data.date,
          status: "to-do",
        }
      );

      // Replace temp task with actual task
      setTasks((prev) =>
        prev.map((t) =>
          t.id === newLocalTask.id
            ? {
                ...t,
                id: res.$id,
              }
            : t
        )
      );
    } catch (err) {
      console.error("❌ Error saving task to Appwrite:", err);
    }
  };

  // ✅ Handle drag
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const taskId = String(active.id);
    const newStatus = over.id as TaskStatus;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    try {
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, taskId, {
        status: newStatus,
      });
    } catch (err) {
      console.error("❌ Failed to update task status:", err);
    }
  };

  // ✅ Delete task
  const handleDelete = async (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    } catch (err) {
      console.error("❌ Failed to delete task:", err);
    }
  };

  // ✅ Columns with mapped tasks
  const statuses: { status: TaskStatus; title: string }[] = [
    { status: "to-do", title: "To-do" },
    { status: "progress", title: "In-progress" },
    { status: "done", title: "Done" },
  ];

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto p-4">
          {statuses.map((col) => (
            <Column
              key={col.status}
              status={col.status}
              title={col.title}
              tasks={tasks.filter((task) => task.status === col.status)}
              onAdd={col.status === "to-do" ? () => setShowModal(true) : undefined}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </DndContext>

      {showModal && (
        <AddTaskModal onAdd={handleAddTask} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
