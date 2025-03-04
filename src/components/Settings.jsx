import React from 'react';
import { Avatar, Switch, Button } from '@mui/material';
import { Link } from 'react-router-dom';



const Settings = ({ closeSettings, role, userName, avatar, jobTitle }) => {
  const isAdmin = role === 'admin'; // Check if the user is an admin

  return (
    <div className="fixed top-0 right-0 w-64 h-screen bg-blue-100 shadow-xl z-50">
      <div className="p-4 border-b flex justify-between">
        <h2 className="text-xl">Settings</h2>
        <button onClick={closeSettings} className="text-gray-500 cursor-pointer hover:text-black">Close</button>
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
        <Switch color="primary" />
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
        <Button variant="outlined" color="error" fullWidth>
          Delete Account
        </Button>
        <Button variant="contained" color="primary" fullWidth className="mt-4">
          <Link to="/login">
            Logout
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Settings;
