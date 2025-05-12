import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminProjectCard from "../components/AdminProjectCard";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

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
        toast.error("Unauthorized or failed to fetch data.");
      }
    };

    fetchInitialData();
  }, []);

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

      if (file && fileType === "file") formData.append("file", file);
      if (file && fileType === "image") formData.append("image", file);

      if (taskId) {
        await axios.put(`http://localhost:8080/api/tasks/${taskId}`, formData, {
          withCredentials: true,
        });
        toast.success("Task updated successfully");
      } else {
        await axios.post("http://localhost:8080/api/tasks", formData, {
          withCredentials: true,
        });
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
      setTasks(taskRes.data.tasks || []);
    } catch (err) {
      toast.error(taskId ? "Failed to update task" : "Failed to assign task");
    }
  };

  const handleEdit = async (taskId) => {
    try {
      const taskToEdit = tasks.find((task) => task._id === taskId);
      if (!taskToEdit) return toast.error("Task not found");

      setForm({
        task: taskToEdit.task,
        email: taskToEdit.email,
        dueDate: taskToEdit.dueDate.split("T")[0],
        priority: taskToEdit.priority,
        fileType: taskToEdit.fileUrl ? "file" : taskToEdit.imageUrl ? "image" : "",
        file: null,
        taskId,
      });
    } catch (err) {
      toast.error("Failed to load task for editing");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${taskId}`, {
        withCredentials: true,
      });
      toast.success("Task deleted successfully");
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
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

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 flex flex-col">
      {/* Top Section: Metric Cards */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-blue-700">Admin Dashboard</h1>
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
              <input
                type="file"
                name="file"
                accept={form.fileType === "file" ? ".pdf,.docx" : "image/*"}
                onChange={handleChange}
                className="w-full text-sm sm:text-base"
              />
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
              <AdminProjectCard
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