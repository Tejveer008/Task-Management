import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ role, allowedRoles }) => {
  // Assuming you have a logic to check if the user is logged in
  const isAuthenticated = !!role; // Adjust this logic to reflect actual auth state

  if (!isAuthenticated) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    // If user does not have the allowed role, redirect to a 'No Access' or error page
    return <Navigate to="/no-access" />;
  }

  // If authenticated and has the correct role, render the protected component
  return <Outlet />;
};

export default ProtectedRoute;
