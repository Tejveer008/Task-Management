// UserDashboard.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserProjectCard from "../components/UserProjectCard";

const UserDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserProjects = async () => {
    try {
      const userRes = await axios.get("http://localhost:8080/api/auth/me", {
        withCredentials: true,
      });

      const userEmail = userRes.data.email;
      const res = await axios.get(`http://localhost:8080/api/tasks/user/${userEmail}`, {
        withCredentials: true,
      });

      const tasks = res.data.projects || [];
      const currentDate = new Date();

      // Auto-delete overdue tasks
      const overdueTasks = tasks.filter((task) => {
        const dueDate = new Date(task.dueDate);
        return dueDate < currentDate;
      });

      for (const task of overdueTasks) {
        try {
          await axios.delete(`http://localhost:8080/api/tasks/${task._id}`, {
            withCredentials: true,
          });
          toast.info(`Task "${task.task}" was deleted as it was past due.`);
        } catch (err) {
          console.error("Failed to delete overdue task:", task._id, err);
        }
      }

      // Filter out overdue tasks from the state
      const remainingTasks = tasks.filter((task) => {
        const dueDate = new Date(task.dueDate);
        return dueDate >= currentDate;
      });

      setProjects(remainingTasks);
    } catch (err) {
      toast.error("Failed to fetch tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateTaskProgress = async (taskId, progress) => {
    try {
      await axios.put(
        `http://localhost:8080/api/tasks/progress/${taskId}`, // Updated endpoint
        { progress },
        { withCredentials: true }
      );
      toast.success("Task progress updated successfully");
      await getUserProjects(); // Refresh tasks
    } catch (err) {
      toast.error("Failed to update task progress");
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

  if (loading) {
    return <div className="p-6 text-center">Loading tasks...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Tasks (Kanban View)</h1>
      {projects.length === 0 ? (
        <div className="text-center text-gray-500">
          No tasks assigned to you.
        </div>
      ) : (
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
                      taskId={task._id}
                      title={task.task}
                      progress={task.progress || 0}
                      dueDate={task.dueDate}
                      priority={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      assignedBy={task.userName}
                      status={task.status}
                      fileUrl={task.fileUrl}
                      imageUrl={task.imageUrl}
                      onProgressUpdate={updateTaskProgress}
                    />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;