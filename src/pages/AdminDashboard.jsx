import React, { useState, useEffect } from 'react';
import AdminProjectCard from '../components/AdminProjectCard'; // Import the AdminProjectCard component

const AdminDashboard = () => {
  // States for existing projects, form inputs, and error handling
  const [projects, setProjects] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [assignedUser, setAssignedUser] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]); // New state to store list of users

  // Fetch projects and users from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsResponse, usersResponse] = await Promise.all([
          fetch('http://localhost:8080/api/projects'), // Endpoint to fetch projects
          fetch('http://localhost:8080/api/users'),    // Endpoint to fetch users
        ]);
        
        const projectsData = await projectsResponse.json();
        const usersData = await usersResponse.json();

        setProjects(projectsData.projects); // Assuming the backend sends a list of projects under 'projects'
        setUsers(usersData.users); // Assuming the backend sends a list of users under 'users'
      } catch (err) {
        setError('Error fetching data');
      }
    };
    fetchData();
  }, []);

  // Function to handle task creation
  const handleCreateTask = async () => {
    if (newTask && assignedUser && dueDate) {
      const newProject = {
        userName: assignedUser,
        progress: progress,
        dueDate: dueDate,
        statusColor: 'blue', // Default color for new tasks
      };

      try {
        // Send POST request to backend to create a new project
        const response = await fetch('http://localhost:8080/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProject),
        });

        if (response.ok) {
          // If the task is created successfully, refresh the project list
          const updatedProjects = await response.json();
          setProjects(updatedProjects.projects); // Assuming response returns updated project list
        } else {
          throw new Error('Failed to create task');
        }
      } catch (err) {
        setError('Error creating task');
      }

      // Reset form fields after creating the task
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

            {/* Assign to User - Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-1">Assign to User</label>
              <select
                value={assignedUser}
                onChange={(e) => setAssignedUser(e.target.value)}
                className="w-full border p-2 rounded-lg"
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </select>
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

        {/* Error Handling */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        {/* Projects Section */}
        <h2 className="font-bold text-2xl mb-6">User Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <AdminProjectCard
              key={index}
              userName={project.userName}
              userProgress={project.progress}
              task="Assigned Task Name" // Customize as needed
              taskDueDate={project.dueDate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
