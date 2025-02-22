import React from 'react';

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-green-600 p-6 text-white">
        <h1 className="text-3xl font-bold">User Dashboard</h1>
        <p>Welcome, User!</p>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
        
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h3 className="font-bold">To-Do</h3>
            <p>Your pending tasks will be listed here.</p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h3 className="font-bold">In-Progress</h3>
            <p>Tasks you are currently working on.</p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h3 className="font-bold">Completed</h3>
            <p>See your completed tasks.</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Task Progress</h2>
          <p>Track the progress of your tasks and due dates...</p>
          {/* Add task progress tracking feature here */}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
