
import React, { useEffect } from "react";
import './App.css';
import Header from './components/Header';
import MainLayout from './components/MainLayout';
import KanbanBoard from './components/KanbanBoard';

import { databases, DATABASE_ID, COLLECTION_ID } from "./appwrite/appwrite";
import { ID } from "appwrite";

export default function App() {
useEffect(() => {
  const createDoc = async () => {
    try {
      const res = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          title: "React Task",                     // ✅ Required string
          description: "Created from React app",   // ✅ Optional
          date: new Date().toISOString().split("T")[0], // ✅ Optional if added in schema
          status: "To-do",                         // ✅ Required enum
        }
      );
      console.log("✅ Document created:", res);
    } catch (error: any) {
      console.error("❌ Error from Appwrite:", error.message, error);
    }
  };

  createDoc();
}, []);



  return (
    <>
      <Header />
      <MainLayout>
        <KanbanBoard />
      </MainLayout>
    </>
  );
}
