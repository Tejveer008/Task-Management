import React from 'react';
import { LinearProgress } from '@mui/material';

const ProjectCard = ({ title, progress, status, dueDate }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4 w-full max-w-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">Status: {status}</p>
      
      {/* Progress Bar */}
      <div className="mb-4">
        <LinearProgress variant="determinate" value={progress} />
        <p className="text-sm text-gray-500 mt-2">Progress: {progress}%</p>
      </div>

      <div className="flex justify-between items-center text-gray-500">
        <span>Due: {dueDate}</span>
        <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
          View
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
