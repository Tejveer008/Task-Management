import React from 'react';
import Sidebar from '../components/Sidebar';
import ProjectCard from '../components/ProjectCard';
import ClientMessages from '../components/ClientMessages';

const AdminDashboard = () => {
  const projects = [
    { title: 'Web Designing', progress: 90, dueDate: '2 Days', statusColor: 'blue' },
    { title: 'Mobile App', progress: 30, dueDate: '3 Weeks', statusColor: 'yellow' },
    { title: 'Dashboard Design', progress: 50, dueDate: '1 Week', statusColor: 'green' },
  ];

  return (
    <div className="flex h-screen">
      {/* <Sidebar /> */}
      <div className="flex-1 bg-gray-100 p-6">
        {/* Projects Section */}
        <div className="mb-8">
          <h2 className="font-bold text-xl">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          title={project.title}
          progress={project.progress}
          status={project.status}
          dueDate={project.dueDate}
        />
      ))}
    </div>
        </div>

        {/* Client Messages Section */}
        <ClientMessages />
      </div>
    </div>
  );
};

export default AdminDashboard;
