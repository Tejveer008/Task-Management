import axios from "axios";
import UserProjectCard from "../components/UserProjectCard";
import { useEffect, useState } from "react";

const UserDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const getUserProjects = async () => {
  try {
    const userRes = await axios.get('http://localhost:8080/api/auth/me', {
      withCredentials: true,
    });

    const userEmail = userRes.data.email;
    const res = await axios.get(`http://localhost:8080/api/tasks/user/${userEmail}`, {
      withCredentials: true,
    });

    setProjects(res.data.projects || []);
  } catch (err) {
    console.warn("User not logged in or failed to fetch tasks");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    getUserProjects();
  }, []);

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

  if (loading) return <div className="p-6">Loading tasks...</div>;

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
                    fileUrl={task.fileUrl}
                    imageUrl={task.imageUrl}
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
