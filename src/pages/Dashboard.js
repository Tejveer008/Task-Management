import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";
import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventIcon from "@mui/icons-material/Event";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PersonIcon from "@mui/icons-material/Person";
import { TaskContext } from "../context/TaskContext";

export default function Dashboard() {
  const { addTask } = useContext(TaskContext);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    date: "",
    priority: "Medium", // Default priority
    file: null,
  });

  const handleTaskSubmit = () => {
    if (!newTask.name.trim() || !newTask.description.trim()) {
      alert("Task name and description are required!");
      return;
    }

    addTask({ ...newTask, id: Date.now(), status: "todo" });
    setNewTask({ name: "", description: "", date: "", priority: "Medium", file: null });
  };

  return (
    <div className="dashboard">
      <nav className="sidebar">
        <ul>
          <li><Link to=""><PeopleIcon /> Collaboration</Link></li>
          <li><Link to=""><DescriptionIcon /> Online Documents</Link></li>
          <li><Link to=""><CalendarTodayIcon /> Calendar</Link></li>
          <li><Link to=""><EventIcon /> Booking</Link></li>
          <li><Link to="/task-status"><TaskAltIcon /> Task Status</Link></li>
          <li><Link to=""><PersonIcon /> Employee Details</Link></li>
        </ul>
      </nav>

      <div className="content">
        <div className="topbar">
          <h1>My Tasks</h1>
        </div>

        <div className="task-card">
          <h2>Create a Task</h2>
          <input
            type="text"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            placeholder="Task Name"
          />
          <textarea
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            placeholder="Task Description"
          />
          <select
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="date"
            value={newTask.date}
            onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
          />
          <input
            type="file"
            onChange={(e) => setNewTask({ ...newTask, file: e.target.files[0] })}
          />
          <button onClick={handleTaskSubmit}>Add Task</button>
        </div>
      </div>
    </div>
  );
}
