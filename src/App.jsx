import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Sidebar from "./components/Sidebar";
import ClientMessages from "./components/ClientMessages";
import Settings from "./components/Settings";
import TeamCollaboration from "./components/TeamCollaboration";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";

// Utility functions
const isAuthenticated = () => {
  return !!localStorage.getItem("loggedInUser");
};

const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  return user ? user.role : null;
};

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const [role, setRole] = useState(getUserRole());

  // Update auth state if changed in another tab or by navigation
  useEffect(() => {
    const updateAuthState = () => {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      if (user) {
        setAuthenticated(true);
        setRole(user.role);
      } else {
        setAuthenticated(false);
        setRole(null);
      }
    };

    window.addEventListener("storage", updateAuthState);
    window.addEventListener("popstate", updateAuthState);

    return () => {
      window.removeEventListener("storage", updateAuthState);
      window.removeEventListener("popstate", updateAuthState);
    };
  }, []);

  const toggleSettings = () => setShowSettings(!showSettings);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes with Layout */}
        {authenticated ? (
          <Route
            path="/*"
            element={
              <div className="flex h-screen">
                <Sidebar toggleSettings={toggleSettings} />
                <div className="flex-grow p-6 overflow-y-auto">
                  <Routes>
                    <Route
                      path="/admin-dashboard"
                      element={
                        <ProtectedRoute allowedRole="admin">
                          <AdminDashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/user-dashboard"
                      element={
                        <ProtectedRoute allowedRole="user">
                          <UserDashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/client-messages"
                      element={
                        <ProtectedRoute>
                          <ClientMessages />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/teamCollaboration"
                      element={
                        <ProtectedRoute>
                          <TeamCollaboration role={role} />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="*"
                      element={
                        <Navigate
                          to={
                            role === "admin"
                              ? "/admin-dashboard"
                              : "/user-dashboard"
                          }
                          replace
                        />
                      }
                    />
                  </Routes>
                </div>
                {showSettings && <Settings closeSettings={toggleSettings} />}
              </div>
            }
          />
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
