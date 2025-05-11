import React from 'react';
import { format } from 'date-fns';

const getStatusColor = (status) => {
  switch (status) {
    case 'To-Do':
      return 'bg-gray-400';
    case 'Active':
      return 'bg-yellow-400';
    case 'Completed':
      return 'bg-green-500';
    default:
      return 'bg-gray-200';
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High':
      return 'text-red-600';
    case 'Medium':
      return 'text-yellow-600';
    case 'Low':
      return 'text-blue-600';
    default:
      return 'text-gray-600';
  }
};

// Optional helper if you have user list in props
// const getUsernameByEmail = (email, users) => {
//   const user = users.find(u => u.email === email);
//   return user ? user.name : email;
// };

const AdminProjectCard = ({
  assignedTo,
  task,
  userProgress,
  taskDueDate,
  status,
  priority,
  attachmentUrl,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{task}</h3>
        <span className={`${getStatusColor(status)} px-2 py-1 rounded-full text-xs text-white`}>
          {status}
        </span>
      </div>
      <p className="text-sm text-gray-500">
        Assigned to: <strong>{assignedTo || "Unassigned"}</strong>
      </p>
      <div className="flex items-center justify-between">
        <p className="text-sm">Due: {format(new Date(taskDueDate), 'MMM dd, yyyy')}</p>
        <p className={`text-sm font-semibold ${getPriorityColor(priority)}`}>
          {priority} Priority
        </p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="h-2 rounded-full bg-blue-500" style={{ width: `${userProgress}%` }}></div>
      </div>
      {attachmentUrl && (
        <div>
          <a href={attachmentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
            View Attachment
          </a>
        </div>
      )}
      <div className="flex justify-between mt-2">
        <button onClick={onEdit} className="text-blue-500 hover:underline text-sm" aria-label="Edit Task">
          Edit
        </button>
        <button onClick={onDelete} className="text-red-500 hover:underline text-sm" aria-label="Delete Task">
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminProjectCard;
