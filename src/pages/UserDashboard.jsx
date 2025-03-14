import React from 'react';
import UserProjectCard from '../components/UserProjectCard';

const UserDashboard = () => {
  const tasks = [
    { title: 'Web Designing', progress: 90, status: 'In Progress', priority: 'High', dueDate: '2 Days', statusColor: 'blue' },
    { title: 'Mobile App', progress: 30, status: 'To Do', priority: 'Medium', dueDate: '3 Weeks', statusColor: 'yellow' },
    { title: 'Dashboard Design', progress: 100, status: 'Completed', priority: 'High', dueDate: 'Completed', statusColor: 'green' },
    { title: 'API Development', progress: 50, status: 'In Progress', priority: 'Low', dueDate: '1 Week', statusColor: 'green' },
  ];

  const getTasksByStatus = (status) => tasks.filter(task => task.status === status);

  return (
    <div className="flex flex-col">
      <div className="flex-1 bg-blue-100 p-6">
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
