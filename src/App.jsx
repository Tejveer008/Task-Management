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

// Function to check authentication
const isAuthenticated = () => {
  return !!localStorage.getItem("loggedInUser");
};

// Function to get user role
const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  return user ? user.role : null;
};

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const [role, setRole] = useState(getUserRole());

  useEffect(() => {
    const updateAuthState = () => {
      setAuthenticated(isAuthenticated());
      setRole(getUserRole());
    };

    window.addEventListener("storage", updateAuthState);
    return () => window.removeEventListener("storage", updateAuthState);
  }, []);

  const toggleSettings = () => setShowSettings(!showSettings);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Layout Route */}
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
                      element={<AdminDashboard />}
                    />
                    <Route
                      path="/user-dashboard"
                      element={<UserDashboard />}
                    />
                    <Route
                      path="/client-messages"
                      element={<ClientMessages />}
                    />
                    <Route
                      path="/teamCollaboration"
                      element={<TeamCollaboration role={role} />}
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
          // Redirect unknown routes to login if not authenticated
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
