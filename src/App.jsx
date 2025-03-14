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
    // Function to update authentication and role
    const updateAuthState = () => {
      setAuthenticated(isAuthenticated());
      setRole(getUserRole());
    };

    // Listen for login/logout updates
    window.addEventListener("storage", updateAuthState);
    return () => window.removeEventListener("storage", updateAuthState);
  }, []);

  const toggleSettings = () => setShowSettings(!showSettings);

  return (
    <Router>
      <Routes>
        {/* Login and Signup Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Section (Sidebar + Main Content) */}
        {authenticated ? (
          <Route
            path="/*"
            element={
              <div className="flex h-screen">
                {/* Sidebar remains fixed */}
                <Sidebar toggleSettings={toggleSettings} />

                {/* Dynamic Content Area */}
                <div className="flex-grow p-6 overflow-y-auto">
                  <Routes>
                    {/* Role-Based Dashboards */}
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/user-dashboard" element={<UserDashboard />} />

                    {/* Other Pages */}
                    <Route path="/client-messages" element={<ClientMessages />} />
                    <Route path="/teamCollaboration" element={<TeamCollaboration role={role} />} />

                    {/* Redirect to correct dashboard based on role */}
                    <Route path="*" element={<Navigate to={role === "admin" ? "/admin-dashboard" : "/user-dashboard"} replace />} />
                  </Routes>
                </div>

                {/* Settings Panel */}
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
