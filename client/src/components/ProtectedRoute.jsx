import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  // If no user is logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user role doesn't match
  if (user.role !== role) {
    switch (user.role) {
      case "victim":
        return <Navigate to="/victim" replace />;

      case "volunteer":
        return <Navigate to="/volunteer" replace />;

      case "ngo":
        return <Navigate to="/ngo" replace />;

      default:
        return <Navigate to="/login" replace />;
    }
  }

  
  return children;
};

export default ProtectedRoute;