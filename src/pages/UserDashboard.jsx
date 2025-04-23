import React, { useState, useEffect } from 'react';
import UserProjectCard from '../components/UserProjectCard';

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/project'); // Endpoint to fetch tasks
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const data = await response.json();
        setTasks(data.tasks); // Assuming backend sends tasks under 'tasks'
      } catch (err) {
        setError('Error fetching tasks');
      }
    };

    fetchTasks();
  }, []);

  const getTasksByStatus = (status) => tasks.filter(task => task.status === status);

  return (
    <div className="flex flex-col">
      <div className="flex-1 bg-blue-100 p-6">
        {/* Error Handling */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          
          {/* To-Do Section */}
          <div className="mb-6">
            <h2 className="font-bold text-2xl mb-4">To-Do</h2>
            {getTasksByStatus('To Do').map((task, index) => (
              <UserProjectCard
                key={index}
                title={task.title}
                progress={task.progress}
                status={task.status}
                priority={task.priority}
                dueDate={task.dueDate}
                statusColor={task.statusColor}
              />
            ))}
          </div>

          {/* In Progress Section */}
          <div className="mb-6">
            <h2 className="font-bold text-2xl mb-4">In Progress</h2>
            {getTasksByStatus('In Progress').map((task, index) => (
              <UserProjectCard
                key={index}
                title={task.title}
                progress={task.progress}
                status={task.status}
                priority={task.priority}
                dueDate={task.dueDate}
                statusColor={task.statusColor}
              />
            ))}
          </div>

          {/* Completed Section */}
          <div className="mb-6">
            <h2 className="font-bold text-2xl mb-4">Completed</h2>
            {getTasksByStatus('Completed').map((task, index) => (
              <UserProjectCard
                key={index}
                title={task.title}
                progress={task.progress}
                status={task.status}
                priority={task.priority}
                dueDate={task.dueDate}
                statusColor={task.statusColor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
