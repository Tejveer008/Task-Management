import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';  // Your Login Page component
import AdminDashboard from './pages/AdminDashboard';  // Admin Dashboard
import UserDashboard from './pages/UserDashboard';  // User Dashboard
import TasksPage from './pages/TasksPage';  // Tasks page (you need to create it)
import TeamPage from './pages/TeamPage';  // Team page (you need to create it)
import SettingsPage from './pages/SettingsPage';  // Settings page (you need to create it)
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
