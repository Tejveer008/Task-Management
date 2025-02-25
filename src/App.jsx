import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Sidebar from './components/Sidebar';
import ClientMessages from './components/ClientMessages';
import Settings from './components/Settings';

function App() {
  const [showSettings, setShowSettings] = useState(false); // State to toggle settings visibility

  const toggleSettings = () => {
    setShowSettings(!showSettings); // Toggle settings panel
  };

  return (
    <Router>
      <Routes>
        {/* Non-authenticated routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Authenticated dashboard routes with Sidebar */}
        <Route 
          path="/*" 
          element={
            <div className="flex">
              <Sidebar toggleSettings={toggleSettings} />
              <div className="flex-grow p-6">
                <Routes>
                  <Route path="/user-dashboard" element={<UserDashboard />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/client-messages" element={<ClientMessages />} />
                </Routes>
              </div>
              {showSettings && <Settings closeSettings={toggleSettings} />}
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
