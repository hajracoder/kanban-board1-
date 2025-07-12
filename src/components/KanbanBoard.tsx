import React, { useEffect, useState } from "react";
// import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Column from "./Column";
import AddTaskModal from "./NewTaskModal";
import { databases, DATABASE_ID, COLLECTION_ID } from "../appwrite/appwrite";
import { ID } from "appwrite";
import { Task, TaskStatus } from "../types";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";


export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        const loadedTasks: Task[] = res.documents.map((doc) => ({
          id: doc.$id,
          title: doc.title,
          description: doc.description,
          date: doc.date,
          status: doc.status,
          avatar: "/images/s1.jpg",
          github: "https://github.com/example",
          linkedin: "https://linkedin.com/in/example",
          facebook: "https://facebook.com/example",
        }));
        setTasks(loadedTasks);
      } catch (err) {
        console.error("❌ Failed to load from Appwrite:", err);
      }
    };

    loadTasks();
  }, []);

  const handleAddTask = async (data: { title: string; description?: string; date?: string }) => {
    const newLocalTask: Task = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      date: data.date,
      status: "to-do",
      avatar: "/images/s1.jpg",
      github: "https://github.com/example",
      linkedin: "https://linkedin.com/in/example",
      facebook: "https://facebook.com/example",
    };

    setTasks((prev) => [...prev, newLocalTask]);

    try {
      await databases.createDocument(
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
    } catch (err) {
      console.error("❌ Error saving to Appwrite:", err);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const newStatus = over.id as TaskStatus;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === active.id ? { ...task, status: newStatus } : task
      )
    );

    try {
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, String(active.id), {
        status: newStatus,
      });
    } catch (err) {
      console.error("❌ Failed to update status:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error("❌ Failed to delete from Appwrite:", err);
    }
  };

  const columns: { status: TaskStatus; title: string }[] = [
    { status: "to-do", title: "To-do" },
    { status: "progress", title: "In-progress" },
    { status: "done", title: "Done" },
  ];
  const mouseSensor = useSensor(MouseSensor);
const touchSensor = useSensor(TouchSensor);
const sensors = useSensors(mouseSensor, touchSensor);


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
  setTasks={setTasks} // ✅ pass this prop
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
