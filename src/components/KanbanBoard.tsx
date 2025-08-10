
// import type { Models } from "appwrite";
// import React, { useEffect, useState } from "react";
// import { account, databases, DATABASE_ID, COLLECTION_ID } from "../appwrite/appwrite";
// import { ID } from "appwrite";
// import Column from "./Column";
// import AddTaskModal from "./NewTaskModal";
// import { Task, TaskStatus } from "../types";
// import {
//   DndContext,
//   DragEndEvent,
//   MouseSensor,
//   TouchSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";

// export default function KanbanBoard() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [showModal, setShowModal] = useState(false);

//   // 🔄 Load tasks from Appwrite on refresh
//   useEffect(() => {
//     const loadTasks = async () => {
//       try {
//         const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
//         const loadedTasks: Task[] = res.documents.map((doc) => ({
//           id: doc.$id,
//           title: doc.title,
//           description: doc.description,
//           date: doc.date,
//           status: doc.status,
//           ownerName: doc.ownerName,
//         }));
//         setTasks(loadedTasks);
//       } catch (err) {
//         console.error("❌ Failed to load from Appwrite:", err);
//       }
//     };

//     loadTasks();
//   }, []);

//   // ➕ Add task - save to Appwrite first
//   const handleAddTask = async (data: { title: string; description?: string; date?: string }) => {
//     try {
//       const user = await account.get();

//       const createdDoc = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
//         title: data.title,
//         description: data.description,
//         date: data.date,
//         status: "to-do",
//         ownerName: user.name,
//       });

//       const newTask: Task = {
//         id: createdDoc.$id,
//         title: createdDoc.title,
//         description: createdDoc.description,
//         date: createdDoc.date,
//         status: createdDoc.status,
//         ownerName: createdDoc.ownerName,
//       };

//       setTasks((prev) => [...prev, newTask]);
//     } catch (err) {
//       console.error("❌ Error saving to Appwrite:", err);
//       alert("❌ Failed to save task. Please try again.");
//     }
//   };

//   // 🟰 Drag and drop update
//   const handleDragEnd = async (event: DragEndEvent) => {
//     const { active, over } = event;
//     if (!over || active.id === over.id) return;

//     const newStatus = over.id as TaskStatus;

//     setTasks((prev) =>
//       prev.map((task) =>
//         task.id === active.id ? { ...task, status: newStatus } : task
//       )
//     );

//     try {
//       await databases.updateDocument(DATABASE_ID, COLLECTION_ID, String(active.id), {
//         status: newStatus,
//       });
//     } catch (err) {
//       console.error("❌ Failed to update status:", err);
//     }
//   };

//   // 🗑️ Delete task
//   const handleDelete = async (id: string) => {
//     try {
//       await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
//       setTasks((prev) => prev.filter((task) => task.id !== id));
//     } catch (err) {
//       console.error("❌ Failed to delete from Appwrite:", err);
//     }
//   };

//   // ⬇️ Columns
//   const columns: { status: TaskStatus; title: string }[] = [
//     { status: "to-do", title: "To-do" },
//     { status: "progress", title: "In-progress" },
//     { status: "done", title: "Done" },
//   ];

//   const mouseSensor = useSensor(MouseSensor);
//   const touchSensor = useSensor(TouchSensor);
//   const sensors = useSensors(mouseSensor, touchSensor);

//   return (
//     <>
//       <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
//         <div className="flex flex-col lg:flex-row gap-4 px-2 py-4 sm:p-4 w-full max-w-full overflow-x-hidden">
//           {columns.map((col) => (
//             <Column
//               key={col.status}
//               status={col.status}
//               title={col.title}
//               tasks={tasks.filter((task) => task.status === col.status)}
//               onAdd={col.status === "to-do" ? () => setShowModal(true) : undefined}
//               onDelete={handleDelete}
//               setTasks={setTasks}
//             />
//           ))}
//         </div>
//       </DndContext>

//       {showModal && (
//         <AddTaskModal
//           onAdd={handleAddTask}
//           onClose={() => setShowModal(false)}
//         />
//       )}
//     </>
//   );
// }







import React, { useEffect, useState } from "react";
import { databases, DATABASE_ID, COLLECTION_ID, USERS_COLLECTION_ID } from "../appwrite/appwrite";
import AddTaskModal from "./NewTaskModal";
import Column from "./Column";
import { Task, User, TaskStatus } from "../types";  // ensure User and TaskStatus defined in your types


import { ID } from "appwrite";
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
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch tasks from Appwrite
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

  // Fetch users from Appwrite
  const fetchUsers = async () => {
    try {
      const res = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID);
      const fetchedUsers: User[] = res.documents.map((doc) => ({
        $id: doc.$id,
        userId: doc.userId,
        name: doc.name,
        email: doc.email,
      }));
      setUsers(fetchedUsers);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    loadTasks();
    fetchUsers();
  }, []);
  

  // Add new task
const handleAddTask = async (data: {
  title: string;
  description?: string;
  date?: string;
  ownerName: string;  // sirf ownerName rakho
}) => {
  try {
    const createdDoc = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        title: data.title,
        description: data.description,
        date: data.date,
        status: "to-do",
        ownerName: data.ownerName,  // sirf ye bhejo
      }
    );

    const newTask: Task = {
      id: createdDoc.$id,
      title: createdDoc.title,
      description: createdDoc.description,
      date: createdDoc.date,
      status: createdDoc.status,
      ownerName: createdDoc.ownerName,
    };

    setTasks((prev) => [...prev, newTask]);
  } catch (err) {
    console.error("Failed to save task:", err);
    alert("Failed to save task. Please try again.");
  }
};


  // Drag and drop handlers (same as before)...
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const newStatus = over.id as TaskStatus;

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
          users={users}               // Pass users list here
          refreshUsers={fetchUsers}   // Pass refresh function here
        />
      )}
    </>
  );
}

