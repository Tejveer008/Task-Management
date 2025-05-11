import React from "react";
import { format } from "date-fns";
import { Clock, Flag, User, Image as ImageIcon, FileText } from "lucide-react";

const UserProjectCard = ({
  title,
  progress,
  dueDate,
  priority,
  assignedBy,
  status,
  fileUrl,
  imageUrl,
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
    <div className="bg-white shadow-md rounded-lg p-5 w-full sm:w-80">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-500 mb-1">
        <User size={14} className="inline" /> Assigned by: <strong>{assignedBy}</strong>
      </p>
      <p className={`text-sm ${isOverdue ? "text-red-500 font-semibold" : "text-gray-600"}`}>
        <Clock size={14} className="inline mr-1" />
        {isOverdue ? "Overdue: " : "Due: "} {formattedDueDate}
      </p>

      <div className="flex items-center justify-between my-2">
        <span className={`text-sm font-medium ${getPriorityColor()}`}>
          <Flag size={14} className="inline mr-1" />
          {priority} Priority
        </span>
        <span className="text-sm text-gray-500">{status}</span>
      </div>

      <div className="h-2 w-full bg-gray-200 rounded-full mt-1 mb-2">
        <div
          className="h-2 rounded-full"
          style={{
            width: `${progress}%`,
            backgroundColor:
              progress === 100 ? "green" : progress > 50 ? "yellow" : "blue",
          }}
        ></div>
      </div>
      <p className="text-right text-sm font-semibold">{progress}% Complete</p>

      {(fileUrl || imageUrl) && (
        <div className="mt-4 space-y-2">
          {fileUrl && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm flex items-center gap-1 hover:underline"
              download
            >
              <FileText size={14} />
              Download File
            </a>
          )}
          {imageUrl && (
            <div>
              <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                <ImageIcon size={14} /> Image Preview:
              </p>
              <img
                src={imageUrl}
                alt="Task Attachment"
                className="w-full h-32 object-cover rounded border"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProjectCard;
