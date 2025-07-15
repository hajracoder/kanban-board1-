import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkUserSession } from "../lib/auth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const check = async () => {
      const session = await checkUserSession();
      setIsLoggedIn(!!session);
      setLoading(false);
    };
    check();
  }, []);

  if (loading) return <p className="text-center mt-10">Checking authentication...</p>;

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
}
