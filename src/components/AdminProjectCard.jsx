import React from 'react';

const AdminProjectCard = ({ userName, task, userProgress, taskDueDate, status }) => {
  // Conditional color for progress based on status
  const getStatusColor = (status) => {
    if (status === 'Completed') return 'bg-green-500';
    if (status === 'In Progress') return 'bg-yellow-500';
    return 'bg-gray-500'; // Default color for other statuses
  };

  return (
    <div className="flex flex-col justify-between items-center bg-gray-800 text-white shadow-lg rounded-lg p-6 w-full sm:w-80">
      <div className="mb-4">
        <h3 className="text-lg font-bold">Assigned to: {userName}</h3>
        <p className="text-sm">Task: {task}</p>
        <p className="text-sm text-gray-400">Status: <span className={`${getStatusColor(status)} px-2 py-1 rounded-full text-xs`}>{status}</span></p>
      </div>

      <div className="flex items-center justify-between mb-4 w-full">
        <div>
          <p className="text-sm">Due: {taskDueDate}</p>
        </div>
      </div>

      <div className="h-2 w-full bg-gray-200 rounded-full mb-4">
        <div
          className={`h-2 rounded-full ${getStatusColor(status)}`}
          style={{ width: `${userProgress}%` }}
        ></div>
      </div>

      <div className="text-right">
        <p className="text-sm font-semibold">{userProgress}% User Progress</p>
      </div>
    </div>
  );
};

export default AdminProjectCard;
