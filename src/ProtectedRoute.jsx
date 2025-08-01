import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Not logged in, redirect to /auth
    return <Navigate to="/"/>;
  }

  
  // Logged in, render children
  return children;
}

