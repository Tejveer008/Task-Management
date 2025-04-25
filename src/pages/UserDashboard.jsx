import React, { useEffect, useState } from "react";
import axios from "axios";
import UserProjectCard from "../components/UserProjectCard";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const localUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // 1. Fetch full user data
  const fetchUser = async () => {
    try {
      if (!localUser || !localUser._id) {
        console.warn("No user ID found.");
        return;
      }

      const res = await axios.get(`/api/users/${localUser._id}`);
      setUser(res.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  // 2. Fetch tasks for the logged-in user
  const getUserProjects = async (email) => {
    try {
      const res = await axios.get("/api/projects");

      const userTasks = res.data.projects.filter(
        (project) => project.assignedTo === email
      );

      if (userTasks.length === 0) {
        userTasks.push({
          _id: "dummy1",
          task: "Complete onboarding document",
          progress: 0,
          dueDate: new Date().toISOString().split("T")[0],
          priority: "Medium",
          assignedBy: "Admin User",
          assignedTo: email,
        });
      }

      setProjects(userTasks);
    } catch (err) {
      console.error("Error fetching projects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchUser();
    };

    loadData();
  }, []);

  useEffect(() => {
    if (user?.email) {
      getUserProjects(user.email);
    }
  }, [user]);

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

  if (loading) {
    return <div className="p-6">Loading tasks...</div>;
  }

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
                    assignedBy={task.assignedBy || "Admin"}
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
