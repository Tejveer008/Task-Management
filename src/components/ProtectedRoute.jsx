// components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children, allowedRole }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/auth/me", {
          withCredentials: true,
        });

        const userRole = res.data.role;
        if (allowedRole && userRole !== allowedRole) {
          setAuthorized(false);
        } else {
          setAuthorized(true);
        }
      } catch {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [allowedRole]);

  if (loading) return <div className="p-6">Checking access...</div>;

  return authorized ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
