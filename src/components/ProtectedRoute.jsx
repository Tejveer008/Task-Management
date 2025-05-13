// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "/context/AuthContext";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { authenticated, role, loading } = useAuth();

  if (loading) return <div className="p-6">Checking access...</div>;

  if (!authenticated || (allowedRole && role !== allowedRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
