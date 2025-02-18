import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; // Import the Login component
import SignUp from "./pages/Signup";
import Dashboard from "./pages/Dashboard"; // Placeholder for Dashboard
import TaskStatus from "./pages/TaskStatus";
import { TaskProvider } from "./context/TaskContext";

const App = () => {
  return (
    <TaskProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/task-status" element={<TaskStatus />} />
      </Routes>
    </Router>
    </TaskProvider>
  );
};

export default App;
