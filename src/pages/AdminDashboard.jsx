import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer"; // Import useInView for lazy loading
import AdminProjectCard from "../components/AdminProjectCard";

// Skeleton Loader Component for placeholders
const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-md p-4 space-y-3 animate-pulse">
    <div className="flex justify-between items-center">
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-6 bg-gray-300 rounded-full w-16"></div>
    </div>
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    <div className="flex items-center justify-between">
      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div className="h-2 bg-gray-300 rounded-full w-1/2"></div>
    </div>
    <div className="flex justify-between mt-2">
      <div className="h-4 bg-gray-300 rounded w-12"></div>
      <div className="h-4 bg-gray-300 rounded w-12"></div>
    </div>
  </div>
);

// Lazy-loaded wrapper for AdminProjectCard
const LazyAdminProjectCard = ({ task, assignedTo, userProgress, taskDueDate, status, priority, attachmentUrl, onEdit, onDelete }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Load only once when the card enters the viewport
    threshold: 0.1, // Trigger when 10% of the card is visible
  });

  return (
    <div ref={ref}>
      {inView ? (
        <AdminProjectCard
          task={task}
          assignedTo={assignedTo}
          userProgress={userProgress}
          taskDueDate={taskDueDate}
          status={status}
          priority={priority}
          attachmentUrl={attachmentUrl}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ) : (
        <SkeletonCard />
      )}
    </div>
  );
};

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    task: "",
    email: "",
    dueDate: "",
    priority: "low",
    fileType: "",
    file: null,
    taskId: null,
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const userRes = await axios.get("http://localhost:8080/api/auth/me", {
          withCredentials: true,
        });
        setAdmin(userRes.data);

        const usersRes = await axios.get("http://localhost:8080/api/admin/users", {
          withCredentials: true,
        });
        setUsers(usersRes.data.users || []);

        const taskRes = await axios.get("http://localhost:8080/api/tasks", {
          withCredentials: true,
        });
        setTasks(taskRes.data.tasks || []);
      } catch (err) {
        console.error(`[${new Date().toISOString()}] Fetch initial data error:`, err);
        toast.error("Unauthorized or failed to fetch data.");
        if (err.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/logout", {}, {
        withCredentials: true,
      });
      toast.success("Logged out successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      toast.error("Failed to log out");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { task, email, dueDate, priority, file, fileType, taskId } = form;

    if (!task || !email || !dueDate || !priority) {
      toast.error("All fields are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("task", task);
      formData.append("email", email);
      formData.append("dueDate", dueDate);
      formData.append("priority", priority);
      formData.append("userName", admin?.adminName || "Admin");

      if (file && fileType) {
        console.log(`[${new Date().toISOString()}] Attaching file:`, { fileName: file.name, fileType });
        if (fileType === "file") {
          formData.append("file", file);
        } else if (fileType === "image") {
          formData.append("image", file);
        }
      } else {
        console.log(`[${new Date().toISOString()}] No file attached for this submission`);
      }

      console.log(`[${new Date().toISOString()}] Submitting task data:`, [...formData.entries()], "Task ID:", taskId);

      if (taskId) {
        const response = await axios.put(`http://localhost:8080/api/tasks/${taskId}`, formData, {
          withCredentials: true,
        });
        console.log(`[${new Date().toISOString()}] Task update response:`, response.data);
        toast.success("Task updated successfully");
      } else {
        const response = await axios.post("http://localhost:8080/api/tasks", formData, {
          withCredentials: true,
        });
        console.log(`[${new Date().toISOString()}] Task creation response:`, response.data);
        toast.success("Task assigned successfully");
      }

      setForm({
        task: "",
        email: "",
        dueDate: "",
        priority: "low",
        fileType: "",
        file: null,
        taskId: null,
      });

      const taskRes = await axios.get("http://localhost:8080/api/tasks", {
        withCredentials: true,
      });
      console.log(`[${new Date().toISOString()}] Fetched updated tasks:`, taskRes.data.tasks);
      setTasks(taskRes.data.tasks || []);
    } catch (err) {
      console.error(`[${new Date().toISOString()}] Task submission error:`, err.response?.data || err.message);
      const errorMessage = err.response?.data?.message || (taskId ? "Failed to update task" : "Failed to assign task");
      toast.error(errorMessage);
    }
  };

  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find((task) => task._id === taskId);
    if (!taskToEdit) {
      toast.error("Task not found");
      return;
    }

    setForm({
      task: taskToEdit.task,
      email: taskToEdit.email,
      dueDate: new Date(taskToEdit.dueDate).toISOString().split("T")[0],
      priority: taskToEdit.priority,
      fileType: "",
      file: null,
      taskId,
    });

    console.log(`[${new Date().toISOString()}] Loaded task for editing:`, taskToEdit);
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${taskId}`, {
        withCredentials: true,
      });
      toast.success("Task deleted successfully");
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error(`[${new Date().toISOString()}] Task deletion error:`, err.response?.data || err.message);
      toast.error("Failed to delete task");
    }
  };

  // Calculate task metrics
  const totalTasks = tasks.length;
  const toDoTasks = tasks.filter((task) => (task.progress || 0) === 0).length;
  const activeTasks = tasks.filter((task) => (task.progress || 0) > 0 && (task.progress || 0) < 100).length;
  const completedTasks = tasks.filter((task) => (task.progress || 0) === 100).length;
  const overdueTasks = tasks.filter((task) => {
    const dueDate = new Date(task.dueDate);
    return dueDate < new Date();
  }).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 flex flex-col">
      {/* Top Section: Metric Cards */}
      <div className="mb-4 sm:mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-blue-700">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 text-sm sm:text-base cursor-pointer"
          >
            Logout
          </button>
        </div>
        <p className="text-lg text-gray-700 mb-3">
          Welcome, <span className="font-bold">{admin?.adminName || "Admin"}</span>!
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-600">Total Tasks</h3>
            <p className="text-lg sm:text-2xl font-bold text-blue-700">{totalTasks}</p>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-600">To-Do Tasks</h3>
            <p className="text-lg sm:text-2xl font-bold text-gray-700">{toDoTasks}</p>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-600">Active Tasks</h3>
            <p className="text-lg sm:text-2xl font-bold text-yellow-700">{activeTasks}</p>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-600">Completed Tasks</h3>
            <p className="text-lg sm:text-2xl font-bold text-green-700">{completedTasks}</p>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-600">Overdue Tasks</h3>
            <p className="text-lg sm:text-2xl font-bold text-red-700">{overdueTasks}</p>
          </div>
        </div>
      </div>

      {/* Main Section: Form and Task Cards */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Form Section */}
        <div className="w-full lg:w-1/3">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-3 sm:space-y-4"
          >
            <input
              type="text"
              name="task"
              value={form.task}
              onChange={handleChange}
              placeholder="Task"
              required
              className="w-full p-2 border rounded text-sm sm:text-base"
            />

            <select
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded text-sm sm:text-base"
            >
              <option value="">Assign to (select user)</option>
              {users.map((user) => (
                <option key={user._id} value={user.email}>
                  {user.username} ({user.email})
                </option>
              ))}
            </select>

            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded text-sm sm:text-base"
            />

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full p-2 border rounded text-sm sm:text-base"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <select
              name="fileType"
              value={form.fileType}
              onChange={handleChange}
              className="w-full p-2 border rounded text-sm sm:text-base"
            >
              <option value="">Choose File Type (optional)</option>
              <option value="file">Document (.pdf, .docx)</option>
              <option value="image">Image</option>
            </select>

            {form.fileType && (
              <div className="flex flex-col">
                <input
                  type="file"
                  name="file"
                  accept={form.fileType === "file" ? ".pdf,.docx" : "image/*"}
                  onChange={handleChange}
                  className="w-full text-sm sm:text-base"
                />
                {form.file && (
                  <p className="text-sm text-gray-600 mt-1">
                    Selected file: {form.file.name}
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm sm:text-base cursor-pointer"
            >
              {form.taskId ? "Update Task" : "Assign Task"}
            </button>
          </form>
        </div>

        {/* Task Cards Section */}
        <div className="w-full lg:w-2/3 mt-4 lg:mt-0">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <LazyAdminProjectCard
                key={task._id}
                task={task.task}
                assignedTo={task.email}
                userProgress={task.progress || 0}
                taskDueDate={task.dueDate}
                status={task.progress === 100 ? "Completed" : task.progress > 0 ? "Active" : "To-Do"}
                priority={task.priority}
                attachmentUrl={task.fileUrl || task.imageUrl}
                onEdit={() => handleEdit(task._id)}
                onDelete={() => handleDelete(task._id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;