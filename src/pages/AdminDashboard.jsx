import React, { useState } from 'react';
import AdminProjectCard from '../components/AdminProjectCard'; // Import the AdminProjectCard component

const AdminDashboard = () => {
  // Initial state for existing projects
  const [projects, setProjects] = useState([
    { userName: 'sam', progress: 30, dueDate: '3 Weeks', statusColor: 'yellow' },
    { userName: 'john', progress: 50, dueDate: '1 Week', statusColor: 'green' },
    { userName: 'nick', progress: 90, dueDate: '2 Days', statusColor: 'blue' },
    { userName: 'nancy', progress: 50, dueDate: '1 Week', statusColor: 'green' },
    { userName: 'rick', progress: 50, dueDate: '1 Week', statusColor: 'green' },
    { userName: 'richrd', progress: 50, dueDate: '1 Week', statusColor: 'green' },
    { userName: 'om', progress: 50, dueDate: '1 Week', statusColor: 'green' },
    { userName: 'jee', progress: 50, dueDate: '1 Week', statusColor: 'green' },
  ]);

  // States for the form inputs
  const [newTask, setNewTask] = useState('');
  const [assignedUser, setAssignedUser] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [progress, setProgress] = useState(0);

  // Function to handle task creation
  const handleCreateTask = () => {
    if (newTask && assignedUser && dueDate) {
      const newProject = {
        userName: assignedUser,
        progress: progress,
        dueDate: dueDate,
        statusColor: 'blue', // Default color for new tasks
      };

      // Add the new project to the list
      setProjects([...projects, newProject]);

      // Reset the form fields
      setNewTask('');
      setAssignedUser('');
      setDueDate('');
      setProgress(0);
    }
  };

  return (
    <div className="flex">
      <div className="flex-1 bg-blue-100 p-6">
        {/* Task Creation Section */}
        <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
          <h2 className="font-bold text-xl mb-4">Create and Assign a Task</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Task</label>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="w-full border p-2 rounded-lg"
                placeholder="Enter task name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Assign to User</label>
              <input
                type="text"
                value={assignedUser}
                onChange={(e) => setAssignedUser(e.target.value)}
                className="w-full border p-2 rounded-lg"
                placeholder="Enter user name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full border p-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Initial Progress (%)</label>
              <input
                type="number"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                className="w-full border p-2 rounded-lg"
                placeholder="Enter initial progress"
              />
            </div>
          </div>
          <button
            onClick={handleCreateTask}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Assign Task
          </button>
        </div>

        {/* Projects Section */}
        <h2 className="font-bold text-2xl mb-6">User Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <AdminProjectCard
              key={index}
              userName={project.userName}
              userProgress={project.progress}
              task="Assigned Task Name" // You can customize this as needed
              taskDueDate={project.dueDate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
