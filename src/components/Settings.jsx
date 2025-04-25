import React, { useState, useEffect } from 'react';
import { Avatar, Switch, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Settings = ({ closeSettings, role, userName, avatar, jobTitle }) => {
  const isAdmin = role === 'admin'; // Check if the user is an admin

  // Initialize darkMode state from localStorage if available
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : false; // Default to false if not in localStorage
  });

  // Update localStorage whenever darkMode state changes
  useEffect(() => {
    if (darkMode) {
      localStorage.setItem('darkMode', true); // Save dark mode preference
    } else {
      localStorage.removeItem('darkMode'); // Remove dark mode preference
    }
  }, [darkMode]);

  // Toggle dark mode on Switch change
  const handleDarkModeToggle = (event) => {
    setDarkMode(event.target.checked);
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

      {/* Admin-specific actions */}
      {isAdmin && (
        <div className="p-4">
          <Button variant="outlined" color="error" fullWidth>
            Delete User Accounts
          </Button>
        </div>
      )}

      {/* Logout and Account Deletion */}
      <div className="p-4">
      <Button
  variant="contained"
  color="primary"
  fullWidth
  className="mt-4"
  onClick={() => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/login"; // force navigation
  }}
>
  Logout
</Button>

      </div>
    </div>
  );
};

export default Settings;
