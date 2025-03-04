import React from 'react';

const AdminProjectCard = ({ userName, task, userProgress, taskDueDate }) => {
  return (
    <div className="flex flex-col justify-between items-center bg-gray-800 text-white shadow-lg rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold">Assigned to: {userName}</h3>
        <p className="text-sm">Task: {task}</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm">Due: {taskDueDate}</p>
        </div>
      </div>

      <div className="h-2 w-full bg-gray-200 rounded-full mb-4">
        <div
          className="bg-blue-500 h-2 rounded-full"
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
