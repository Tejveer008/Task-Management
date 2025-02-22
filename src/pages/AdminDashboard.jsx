import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 p-6 text-white">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p>Welcome, Admin!</p>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Manage Tasks and Users</h2>
        
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h3 className="font-bold">To-Do Tasks</h3>
            <p>Manage tasks that are yet to be started.</p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h3 className="font-bold">In-Progress Tasks</h3>
            <p>Monitor tasks currently in progress.</p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h3 className="font-bold">Completed Tasks</h3>
            <p>View and verify completed tasks.</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Assign Tasks</h2>
          <p>Assign new tasks to users here...</p>
          {/* Add task assignment form or feature here */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
