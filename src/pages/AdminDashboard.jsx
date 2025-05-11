import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [form, setForm] = useState({
    task: "",
    email: "",
    dueDate: "",
    priority: "low",
    file: null,
    image: null,
  });
  const [tasks, setTasks] = useState([]);

  // Fetch admin info and tasks
  useEffect(() => {
    const fetchAdminAndTasks = async () => {
      try {
        const userRes = await axios.get("http://localhost:8080/api/auth/me", {
          withCredentials: true,
        });
        setAdmin(userRes.data);

        const taskRes = await axios.get("http://localhost:8080/api/tasks", {
          withCredentials: true,
        });
        setTasks(taskRes.data.tasks || []);
      } catch (err) {
        toast.error("Unauthorized or failed to fetch data.");
      }
    };

    fetchAdminAndTasks();
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

    if (!form.task || !form.email || !form.dueDate || !form.priority) {
      toast.error("All fields are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("task", form.task);
      formData.append("email", form.email);
      formData.append("dueDate", form.dueDate);
      formData.append("priority", form.priority);
      formData.append("userName", admin?.adminName || "Admin");
      if (form.file) formData.append("file", form.file);
      if (form.image) formData.append("image", form.image);

      await axios.post("http://localhost:8080/api/tasks", formData, {
        withCredentials: true,
      });

      setForm({
        task: "",
        email: "",
        dueDate: "",
        priority: "low",
        file: null,
        image: null,
      });

      const taskRes = await axios.get("http://localhost:8080/api/tasks", {
        withCredentials: true,
      });
      setTasks(taskRes.data.tasks || []);
      toast.success("Task assigned successfully");
    } catch (err) {
      toast.error("Failed to assign task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Admin Dashboard</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-2xl"
      >
        <input
          type="text"
          name="task"
          value={form.task}
          onChange={handleChange}
          placeholder="Task"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Assign to (email)"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="file"
          name="file"
          accept=".pdf,.docx"
          onChange={handleChange}
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Assign Task
        </button>
      </form>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <AdminProjectCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
