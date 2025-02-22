import React, { useState } from 'react';
import Sidebar from './Sidebar';

// Components for each section
const DashboardContent = () => <div className="p-6">📊 Dashboard Content</div>;
const TasksPage = () => <div className="p-6">✅ Tasks Management</div>;
const TeamPage = () => <div className="p-6">👥 Team Collaboration</div>;
const SettingsPage = () => <div className="p-6">⚙️ Settings</div>;

const Home = () => {
  const [page, setPage] = useState('home');  // Default page is 'dashboard'

  return (
    <div className="flex h-screen w-screen">
      <Sidebar setPage={setPage} />  {/* Pass setPage to Sidebar */}
      <div className="flex-1 bg-blue-100 p-6">
        {/* Conditionally render content based on selected page */}
        {page === 'dashboard' && <Dashboard />}
        {page === 'tasks' && <TasksPage />}
        {page === 'team' && <TeamPage />}
        {page === 'settings' && <SettingsPage />}
      </div>
    </div>
  );
};

export default Home;
