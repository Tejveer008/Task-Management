import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRole, children }) => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  
  if (!user || (allowedRole && user.role !== allowedRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
