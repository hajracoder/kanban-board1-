import React, { useEffect, useState } from "react";
import Column from "./Column";
import AddTaskModal from "./NewTaskModal";
import { Task, TaskStatus } from "../types";
import { databases, DATABASE_ID, COLLECTION_ID } from "../appwrite/appwrite";
import { ID, Query } from "appwrite";

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);

  // ✅ Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        const fetchedTasks = res.documents.map((doc: any) => ({
          id: doc.$id,
          title: doc.title,
          description: doc.description,
          date: doc.date,
          status: doc.status,
          avatar: doc.avatar,
          github: doc.github,
          linkedin: doc.linkedin,
          facebook: doc.facebook,
        }));
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // ✅ Add task handler
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

    setTasks((prev) => [...prev, newTask]);

    try {
      const res = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        newTask
      );
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  // ✅ Delete handler
  const handleDelete = async (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));

    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  return (
    <div className="flex gap-4 p-4">
      <Column
        title="To-do"
        status="to-do"
        tasks={tasks.filter((task) => task.status === "to-do")}
        onAdd={() => setShowModal(true)}
        onDelete={handleDelete}
      />
      <Column
        title="In-progress"
        status="progress"
        tasks={tasks.filter((task) => task.status === "progress")}
        onDelete={handleDelete}
      />
      <Column
        title="Done"
        status="done"
        tasks={tasks.filter((task) => task.status === "done")}
        onDelete={handleDelete}
      />

      {showModal && (
        <AddTaskModal onAdd={handleAddTask} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
