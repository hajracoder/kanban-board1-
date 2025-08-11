import React, { useEffect, useState } from "react";
import { databases, DATABASE_ID, COLLECTION_ID } from "../appwrite/appwrite";
import AddTaskModal from "./AddTaskModal";
import Column from "./Column";
import { Task, TaskStatus } from "../types";
import { ID } from "appwrite";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

// Users interface according to your Appwrite collection schema
interface User {
  $id: string;   // We map userId to $id here
  name: string;
  email: string;
}

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch users function defined inside this file
  const fetchUsers = async (): Promise<User[]> => {
    const USERS_COLLECTION_ID = "6890fa640015b8830dfa"; // Your Users collection ID
    try {
      const res = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID);
      return res.documents.map((doc) => ({
        $id: doc.userId,
        name: doc.name,
        email: doc.email,
      }));
    } catch (err) {
      console.error("Failed to fetch users:", err);
      return [];
    }
  };

  const loadTasks = async () => {
    try {
      const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      const loadedTasks: Task[] = res.documents.map((doc) => ({
        id: doc.$id,
        title: doc.title,
        description: doc.description,
        date: doc.date,
        status: doc.status,
        ownerId: doc.ownerId,
        ownerName: doc.ownerName,
      }));
      setTasks(loadedTasks);
    } catch (err) {
      console.error("Failed to load tasks:", err);
    }
  };

  const loadUsers = async () => {
    const fetchedUsers = await fetchUsers();
    setUsers(fetchedUsers);
  };

  useEffect(() => {
    loadUsers();
    loadTasks();
  }, []);

  const handleAddTask = async (data: {
    title: string;
    description?: string;
    date?: string;
    ownerId: string;
    ownerName: string;
  }) => {
    console.log("Adding task with data:", data);
    try {
      const createdDoc = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          title: data.title,
          description: data.description ?? "",
          date: data.date ?? "",
          status: "to-do",
          ownerId: data.ownerId,
          ownerName: data.ownerName,
        }
      );

      const newTask: Task = {
        id: createdDoc.$id,
        title: createdDoc.title,
        description: createdDoc.description,
        date: createdDoc.date,
        status: createdDoc.status,
        ownerId: createdDoc.ownerId,
        ownerName: createdDoc.ownerName,
      };

      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error("Failed to save task:", err);
      alert("Failed to save task. Please try again.");
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const newStatus = over.id as TaskStatus;
    const taskToUpdate = tasks.find((task) => task.id === active.id);
    if (!taskToUpdate) return;

    setTasks((prev) =>
      prev.map((task) => (task.id === active.id ? { ...task, status: newStatus } : task))
    );

    try {
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, String(active.id), {
        status: newStatus,
      });
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const columns: { status: TaskStatus; title: string }[] = [
    { status: "to-do", title: "To-do" },
    { status: "progress", title: "In-progress" },
    { status: "done", title: "Done" },
  ];

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  return (
    <>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex flex-col lg:flex-row gap-4 px-2 py-4 sm:p-4 w-full max-w-full overflow-x-hidden">
          {columns.map((col) => (
            <Column
              key={col.status}
              status={col.status}
              title={col.title}
              tasks={tasks.filter((task) => task.status === col.status)}
              onAdd={col.status === "to-do" ? () => setShowModal(true) : undefined}
              onDelete={handleDelete}
              setTasks={setTasks}
            />
          ))}
        </div>
      </DndContext>

      {showModal && (
        <AddTaskModal
          onAdd={handleAddTask}
          onClose={() => setShowModal(false)}
          users={users}
        />
      )}
    </>
  );
}
