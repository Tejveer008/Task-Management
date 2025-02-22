import React from 'react';
import { FaTasks, FaUsers, FaCog, FaHome } from 'react-icons/fa';

const Sidebar = ({ setPage }) => {
  return (
    <div className="w-full md:w-64 h-screen bg-blue-800 text-white p-4 space-y-4">
      <h2 className="text-xl font-bold">Task Manager</h2>
      <button
        onClick={() => setPage('dashboard')}  // Set 'dashboard' as active page
        className="flex items-center space-x-2 w-full p-2 hover:bg-blue-700"
      >
        <FaHome /> <span>Dashboard</span>
      </button>
      <button
        onClick={() => setPage('tasks')}  // Set 'tasks' as active page
        className="flex items-center space-x-2 w-full p-2 hover:bg-blue-700"
      >
        <FaTasks /> <span>Tasks</span>
      </button>
      <button
        onClick={() => setPage('team')}  // Set 'team' as active page
        className="flex items-center space-x-2 w-full p-2 hover:bg-blue-700"
      >
        <FaUsers /> <span>Team</span>
      </button>
      <button
        onClick={() => setPage('settings')}  // Set 'settings' as active page
        className="flex items-center space-x-2 w-full p-2 hover:bg-blue-700"
      >
        <FaCog /> <span>Settings</span>
      </button>
    </div>
  );
};

export default Sidebar;
