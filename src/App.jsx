import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Sidebar from './components/Sidebar';
import ClientMessages from './components/ClientMessages';
import Settings from './components/Settings';
import TeamCollaboration from './components/TeamCollaboration';

// Mock function to simulate authentication status (replace with real authentication)
const isAuthenticated = () => {
  const token = localStorage.getItem('token'); // Replace with actual token logic
  return !!token;
};

// Mock function to get user role (replace with actual logic from backend/user data)
const getUserRole = () => {
  const role = localStorage.getItem('role'); // Replace with actual logic
  return role || 'user'; // Default role to 'user'
};

function App() {
  const [showSettings, setShowSettings] = useState(false); // State to toggle settings visibility
  const [role, setRole] = useState('');

  useEffect(() => {
    // Get user role after authentication (from API or localStorage)
    setRole(getUserRole());
  }, []);

  const toggleSettings = () => {
    setShowSettings(!showSettings); // Toggle settings panel
  };

  // Component for route protection
  const ProtectedRoute = ({ children, role, requiredRole }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" replace />;
    }

    if (requiredRole && role !== requiredRole) {
      return <Navigate to="/user-dashboard" replace />;
    }

    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Non-authenticated routes */}
        <Route path="/" element={isAuthenticated() ? <Navigate to={`/${role}-dashboard`} /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Authenticated dashboard routes with Sidebar */}
        <Route
          path="/*"
          element={
            <ProtectedRoute role={role}>
              <div className="flex h-screen">
                <Sidebar toggleSettings={toggleSettings} />
                <div className="flex-grow p-6 overflow-y-auto">
                  <Routes>
                    {/* Role-based access to admin dashboard */}
                    <Route
                      path="/admin-dashboard"
                      element={
                        <ProtectedRoute role={role} requiredRole="admin">
                          <AdminDashboard />
                        </ProtectedRoute>
                      }
                    />
                    {/* Role-based access to user dashboard */}
                    <Route
                      path="/user-dashboard"
                      element={
                        <ProtectedRoute role={role} requiredRole="user">
                          <UserDashboard />
                        </ProtectedRoute>
                      }
                    />
                    {/* Client messages and team collaboration accessible based on role */}
                    <Route
                      path="/client-messages"
                      element={
                        <ProtectedRoute role={role}>
                          <ClientMessages />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/teamCollaboration"
                      element={
                        <ProtectedRoute role={role}>
                          <TeamCollaboration role={role} />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </div>

                {showSettings && <Settings closeSettings={toggleSettings} />}
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
