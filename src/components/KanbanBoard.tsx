import React, { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Column from "./Column";
import AddTaskModal from "./NewTaskModal";

const STORAGE_KEY = "kanban-tasks";

type Task = {
  id: string;
  title: string;
  description?: string;
  date?: string;
  status: "To-do" | "In-progress" | "Done";
  avatar?: string;
  github?: string;
  linkedin?: string;
  facebook?: string;
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);

  // ✅ Load tasks once
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved !== "[]") {
      try {
        const parsed: Task[] = JSON.parse(saved);
        setTasks(parsed);
      } catch (err) {
        console.error("Error parsing tasks:", err);
      }
    } else {
      const defaultTask: Task = {
        id: Date.now().toString(),
        title: "Welcome Task",
        description: "This is your first task card!",
        date: new Date().toISOString().split("T")[0],
        status: "To-do",
        avatar: "/images/s1.jpg",
        github: "https://github.com/example",
        linkedin: "https://linkedin.com/in/example",
        facebook: "https://facebook.com/example",
      };
      setTasks([defaultTask]);
    }
  }, []);

  // ✅ Save tasks to localStorage when they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  // ✅ Add Task
  const handleAddTask = (data: { title: string; description: string; date: string }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      date: data.date,
      status: "To-do",
      avatar: "/images/s1.jpg",
      github: "https://github.com/example",
      linkedin: "https://linkedin.com/in/example",
      facebook: "https://facebook.com/example",
    };
    setTasks((prev) => [...prev, newTask]);
  };

  // ✅ Move Task Between Columns
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === active.id ? { ...task, status: over.id as Task["status"] } : task
      )
    );
  };

  // ✅ Delete Task
  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto p-4">
          {["To-do", "In-progress", "Done"].map((column) => (
            <Column
              key={column}
              title={column as Task["status"]}
              tasks={tasks.filter((task) => task.status === column)}
              onAdd={column === "To-do" ? () => setShowModal(true) : undefined}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </DndContext>

      {showModal && (
        <AddTaskModal
          onAdd={handleAddTask}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
