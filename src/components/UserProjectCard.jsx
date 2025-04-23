import React from 'react';

const UserProjectCard = ({ title, progress, status, priority, dueDate, statusColor }) => {
  // Color styles for task priority
  const priorityColors = {
    High: 'bg-red-500',
    Medium: 'bg-yellow-500',
    Low: 'bg-green-500',
  };

  // Dynamic background color for the status
  const statusColors = {
    Completed: 'bg-green-500',
    'In Progress': 'bg-yellow-500',
    'To Do': 'bg-gray-500',
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-80">
      <div className="mb-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className={`text-sm ${statusColors[status]} text-white px-2 py-1 rounded-full`}>
          {status}
        </p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <span className={`px-3 py-1 text-white rounded ${priorityColors[priority]}`}>
            {priority} Priority
          </span>
        </div>
        <div>
          <p className="text-sm text-gray-500">Due: {dueDate}</p>
        </div>
      </div>

      <div className="h-2 w-full bg-gray-200 rounded-full mb-4">
        <div
          className="h-2 rounded-full"
          style={{
            width: `${progress}%`,
            backgroundColor: progress === 100 ? 'green' : progress > 50 ? 'yellow' : 'blue',
          }}
        ></div>
      </div>

      <div className="text-right">
        <p className="text-sm font-semibold">{progress}% Complete</p>
      </div>
    </div>
  );
};

export default UserProjectCard;
