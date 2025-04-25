import React from "react";
import { format } from "date-fns";
import { Clock, Flag, User } from "lucide-react";

const UserProjectCard = ({
  title,
  progress,
  dueDate,
  priority,
  assignedBy,
  status,
}) => {
  const formattedDueDate = dueDate
    ? format(new Date(dueDate), "dd MMM yyyy")
    : "No due date";

  const isOverdue = dueDate && new Date(dueDate) < new Date();

  const getPriorityColor = () => {
    switch (priority) {
      case "High":
        return "text-red-600";
      case "Medium":
        return "text-yellow-600";
      case "Low":
        return "text-green-600";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition duration-200">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="text-sm mb-1 flex items-center gap-2">
        <User size={16} /> <span className="text-gray-600">Assigned by:</span>{" "}
        <span className="font-medium">{assignedBy}</span>
      </div>
      <div className="text-sm mb-1 flex items-center gap-2">
        <Clock size={16} />{" "}
        <span className={isOverdue ? "text-red-500 font-semibold" : "text-gray-600"}>
          {isOverdue ? "Overdue: " : "Due:"} {formattedDueDate}
        </span>
      </div>
      <div className="text-sm flex items-center gap-2">
        <Flag size={16} />{" "}
        <span className={getPriorityColor()}>{priority || "No priority"}</span>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        Progress: {progress}% | Status: {status}
      </div>
    </div>
  );
};

export default UserProjectCard;
