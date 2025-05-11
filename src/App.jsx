import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

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

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/auth/me", {
        withCredentials: true,
      });
      setAuthenticated(true);
      setRole(res.data.role);
    } catch (err) {
      setAuthenticated(false);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const toggleSettings = () => setShowSettings(!showSettings);

  if (loading) return <div className="p-6">Checking authentication...</div>;

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
                          <ClientMessages role={role} />
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
                          to={role === "admin" ? "/admin-dashboard" : "/user-dashboard"}
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
