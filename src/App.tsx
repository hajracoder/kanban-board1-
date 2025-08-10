// import { useEffect, useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate
// } from "react-router-dom";

// import Header from './components/Header';
// import MainLayout from './components/MainLayout';
// import KanbanBoard from './components/KanbanBoard';
// import ProtectedRoute from "./components/ProtectedRoute";
// import Auth from "./components/Auth";

// import './App.css';
// import { account } from "./appwrite/appwrite";

// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         await account.get();
//         setIsLoggedIn(true);
//       } catch {
//         setIsLoggedIn(false);
//       }
//     };
//     checkSession();
//   }, []);

//   if (isLoggedIn === null) return <div className="p-10">Loading...</div>;

//   return (
//     <Router>
//       <Routes>
//         {/* ✅ Auth page with both login/signup */}
//         <Route path="/auth" element={<Auth />} />

//         {/* ✅ Protected Home */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Header />
//               <MainLayout>
//                 <KanbanBoard />
//               </MainLayout>
//             </ProtectedRoute>
//           }
//         />

//         {/* ✅ Redirect anything else to /auth */}
//         <Route path="*" element={<Navigate to="/auth" />} />
//       </Routes>
//     </Router>
//   );
// }






import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Header from './components/Header';
import MainLayout from './components/MainLayout';
import KanbanBoard from './components/KanbanBoard';
import ProtectedRoute from "./components/ProtectedRoute";
import Auth from "./components/Auth";

import './App.css';
import { account, databases, DATABASE_ID, USERS_COLLECTION_ID } from "./appwrite/appwrite";
import { User } from "./types"; // <- yeh tumhare types file se aayega

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get();
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkSession();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID);
      const fetched = res.documents.map(doc => ({
        $id: doc.$id,
        userId: doc["userId"],
        name: doc["name"],
        email: doc["email"],
      }));
      setUsers(fetched);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUsers();
    }
  }, [isLoggedIn]);

  if (isLoggedIn === null) return <div className="p-10">Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Header />
              <MainLayout>
                <KanbanBoard
                  users={users}
                  refreshUsers={fetchUsers}
                />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
}
