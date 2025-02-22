import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BuildIcon from "@mui/icons-material/Build";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


export default function TaskStatus() {
  const { tasks, updateTaskStatus, setTasks } = useContext(TaskContext);

  useEffect(() => {
    socket.on("taskUpdated", (updatedTasks) => {
      setTasks(updatedTasks);
    });

    return () => {
      socket.off("taskUpdated");
    };
  }, [setTasks]);

  return (
    <div className="task-status-page p-6 bg-blue-100 min-h-screen">
      <div className="flex items-center bg-blue-500 p-3 rounded-lg shadow-lg mb-6">
        <Link to="/dashboard" className="text-white flex items-center">
          <ArrowBackIcon className="mr-2" />
          <span>Back to Dashboard</span>
        </Link>
        <h2 className="text-3xl font-bold text-white ml-6">Task Status</h2>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <TaskColumn title={<><ListAltIcon /> To-Do</>} tasks={tasks} status="todo" color="gray-100 text-blue-500" updateTaskStatus={updateTaskStatus} />
        <TaskColumn title={<><BuildIcon /> In Progress</>} tasks={tasks} status="in-progress" color="blue-100 text-orange-500" updateTaskStatus={updateTaskStatus} />
        <TaskColumn title={<><CheckCircleIcon /> Completed</>} tasks={tasks} status="completed" color="green-100 text-green-500" updateTaskStatus={updateTaskStatus} />
        <TaskColumn title={<><HourglassBottomIcon /> Due</>} tasks={tasks.filter(task => task.status === "due")} status="due" color="red-100 text-red-500" updateTaskStatus={updateTaskStatus} />
      </div>
    </div>
  );
}

// Drag & Drop Task Columns
function TaskColumn({ title, tasks, status, color, updateTaskStatus }) {
  const filteredTasks = tasks.filter(task => task.status === status);

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    updateTaskStatus(taskId, status);
    socket.emit("updateTask", taskId, status); // Emit update to server
  };
  
  return (
    <div className={`bg-${color} p-4 rounded-lg shadow-md`} onDragOver={handleDragOver} onDrop={handleDrop}>
      <h3 className="font-semibold mb-3">{title}</h3>
      {filteredTasks.map(task => (
        <div key={task.id} className="p-4 bg-white rounded-lg shadow mb-3 cursor-grab" draggable onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}>
          <h4 className="font-bold text-lg">{task.name}</h4>
          <p className="text-sm text-gray-600">{task.description}</p>
          <p className="text-sm text-gray-600">Due Date: {task.date || "No deadline"}</p>
          <p className="text-sm">Priority: <PriorityBadge priority={task.priority} /></p>
        </div>
      ))}
    </div>
  );
}

// Priority Badge Component
function PriorityBadge({ priority }) {
  const colors = { low: "text-green-500", medium: "text-yellow-500", high: "text-red-500" };
  return <span className={`${colors[priority]} font-bold`}>{priority.toUpperCase()}</span>;
}
