import React, { useState, useEffect } from 'react';
import { Avatar, Switch, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Settings = ({ closeSettings, role, userName, avatar, jobTitle }) => {
  const navigate = useNavigate();
  const isAdmin = role === 'admin';

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem('darkMode', true);
    } else {
      localStorage.removeItem('darkMode');
    }
  }, [darkMode]);

  const handleDarkModeToggle = (e) => {
    setDarkMode(e.target.checked);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      localStorage.removeItem("loggedInUser");
      navigate("/login");
    }
  };

  return (
    <div className="fixed top-0 right-0 w-64 h-screen bg-blue-100 shadow-xl z-50">
      <div className="p-4 border-b flex justify-between">
        <h2 className="text-xl">Settings</h2>
        <button onClick={closeSettings} className="text-gray-500 cursor-pointer hover:text-black">
          Close
        </button>
      </div>

      {/* User Info */}
      <div className="flex flex-col items-center p-6">
        <Avatar alt={userName} src={avatar} className="w-20 h-20 mb-4 bg-blue-600" />
        <h3 className="text-xl font-semibold">{userName}</h3>
        <p className="text-sm text-gray-500">{jobTitle}</p>
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex items-center justify-between p-4 border-t border-b">
        <span>Dark Mode</span>
        <Switch
          color="primary"
          checked={darkMode}
          onChange={handleDarkModeToggle}
        />
      </div>

      {/* Admin Actions */}
      {isAdmin && (
        <div className="p-4">
          <Button variant="outlined" color="error" fullWidth>
            Delete User Accounts
          </Button>
        </div>
      )}

      {/* Logout */}
      <div className="p-4">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="mt-4"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Settings;
