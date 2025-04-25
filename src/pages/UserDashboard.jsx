import React, { useEffect, useState } from "react";
import axios from "axios";
import UserProjectCard from "./UserProjectCard";

const UserDashboard = () => {
  const [projects, setProjects] = useState([]);

  const getUserProjects = async () => {
    try {
      const res = await axios.get("/api/projects");
      setProjects(res.data.projects || []);
    } catch (err) {
      console.error("Error fetching projects", err);
    }
  };

  useEffect(() => {
    getUserProjects();
  }, []);

  // Categorize tasks by status
  const groupedTasks = {
    "To Do": [],
    "In Progress": [],
    "Completed": [],
  };

  projects.forEach((project) => {
    const status =
      project.progress === 100
        ? "Completed"
        : project.progress > 0
        ? "In Progress"
        : "To Do";
    groupedTasks[status].push({ ...project, status });
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Tasks (Kanban View)</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">{status}</h2>
            <div className="space-y-4">
              {tasks.length === 0 ? (
                <p className="text-gray-400">No tasks</p>
              ) : (
                tasks.map((task) => (
                  <UserProjectCard
                    key={task._id}
                    title={task.task}
                    progress={task.progress}
                    dueDate={task.dueDate}
                    priority={task.priority}
                    assignedBy={task.userName}
                    status={task.status}
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
