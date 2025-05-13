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

      // Remaining tasks
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
        `http://localhost:8080/api/tasks/progress/${taskId}`,
        { progress },
        { withCredentials: true }
      );
      toast.success("Task progress updated successfully");
      await getUserProjects();
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
    return <div className="p-6 text-center text-lg">Loading tasks...</div>;
  }

  return (
    <div className="px-4 py-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        My Tasks <span className="text-base text-gray-500">(Kanban View)</span>
      </h1>

      {projects.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">No tasks assigned to you.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className="bg-white rounded-lg shadow p-4 flex flex-col">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">
                {status}
              </h2>
              <div className="space-y-4 overflow-y-auto max-h-[70vh]">
                {tasks.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center sm:text-left">No tasks</p>
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
