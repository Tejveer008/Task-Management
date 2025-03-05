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

// Mock function to simulate API call to check authentication
const isAuthenticated = async () => {
  try {
    // Simulate API call to check authentication status
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally verify token validity via an API call
      return true;
    }
    return false;
  } catch (error) {
    console.error('Authentication check failed:', error);
    return false;
  }
};

// Mock function to get user role from backend or localStorage
const fetchUserRole = async () => {
  try {
    // Fetch user role from API (replace with actual API call if needed)
    const role = localStorage.getItem('role'); // Example: Fetch from localStorage
    return role || 'user'; // Default to 'user'
  } catch (error) {
    console.error('Error fetching user role:', error);
    return 'user'; // Default to 'user' if error occurs
  }
};

function App() {
  const [showSettings, setShowSettings] = useState(false); // State to toggle settings visibility
  const [role, setRole] = useState(''); // Store user role
  const [authenticated, setAuthenticated] = useState(false); // Store auth status
  const [loading, setLoading] = useState(true); // Loading state for auth check

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuth = await isAuthenticated();
      setAuthenticated(isAuth);

      if (isAuth) {
        const userRole = await fetchUserRole();
        setRole(userRole);
      }
      setLoading(false); // Authentication check complete
    };

    checkAuthentication();
  }, []);

  const toggleSettings = () => {
    setShowSettings(!showSettings); // Toggle settings panel
  };

  // Component for route protection
  const ProtectedRoute = ({ children, requiredRole }) => {
    if (loading) {
      return <div>Loading...</div>; // Show loading while checking authentication
    }

    if (!authenticated) {
      return <Navigate to="/login" replace />;
    }

    if (requiredRole && role !== requiredRole) {
      return <Navigate to={`/${role}-dashboard`} replace />;
    }

    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Non-authenticated routes */}
        <Route
          path="/"
          element={authenticated ? <Navigate to={`/${role}-dashboard`} /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Authenticated dashboard routes with Sidebar */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <Sidebar toggleSettings={toggleSettings} />
                <div className="flex-grow p-6 overflow-y-auto">
                  <Routes>
                    {/* Admin Dashboard */}
                    <Route
                      path="/admin-dashboard"
                      element={
                        <ProtectedRoute requiredRole="admin">
                          <AdminDashboard />
                        </ProtectedRoute>
                      }
                    />
                    {/* User Dashboard */}
                    <Route
                      path="/user-dashboard"
                      element={
                        <ProtectedRoute requiredRole="user">
                          <UserDashboard />
                        </ProtectedRoute>
                      }
                    />
                    {/* Client Messages */}
                    <Route
                      path="/client-messages"
                      element={
                        <ProtectedRoute>
                          <ClientMessages />
                        </ProtectedRoute>
                      }
                    />
                    {/* Team Collaboration */}
                    <Route
                      path="/team-collaboration"
                      element={
                        <ProtectedRoute>
                          <TeamCollaboration role={role} />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </div>

                {/* Settings Panel */}
                {showSettings && <Settings closeSettings={toggleSettings} />}
              </div>
            </ProtectedRoute>
          }
        />

        {/* 404 Route Fallback */}
        <Route path="*" element={<Navigate to={`/${role}-dashboard`} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
