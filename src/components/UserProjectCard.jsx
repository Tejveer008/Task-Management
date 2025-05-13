// components/UserProjectCard.jsx
import PropTypes from "prop-types";
import { format } from "date-fns";
import { useState } from "react";

const getPriorityColor = (priority) => {
  switch (priority) {
    case "High":
      return "text-red-600";
    case "Medium":
      return "text-yellow-600";
    case "Low":
      return "text-blue-600";
    default:
      return "text-gray-600";
  }
};

const UserProjectCard = ({
  taskId,
  title,
  progress,
  dueDate,
  priority,
  assignedBy,
  fileUrl,
  imageUrl,
  onProgressUpdate,
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const attachmentUrl = imageUrl || fileUrl;
  const isImage = attachmentUrl && /\.(jpg|jpeg|png|gif)$/i.test(attachmentUrl);
  const isValidDate = dueDate && !isNaN(new Date(dueDate));

  const fullAttachmentUrl = attachmentUrl?.startsWith('http')
    ? attachmentUrl
    : `http://localhost:8080${attachmentUrl}`;

  const handleProgressChange = (e) => {
    const newProgress = Number(e.target.value);
    onProgressUpdate(taskId, newProgress);
  };

  const setTaskState = (newState) => {
    let newProgress;
    switch (newState) {
      case "To Do":
        newProgress = 0;
        break;
      case "In Progress":
        newProgress = 50;
        break;
      case "Completed":
        newProgress = 100;
        break;
      default:
        newProgress = progress;
    }
    onProgressUpdate(taskId, newProgress);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 space-y-3">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-500">
        Assigned by: <strong>{assignedBy || "Unknown"}</strong>
      </p>
      <div className="flex items-center justify-between">
        <p className="text-sm">
          Due: {isValidDate ? format(new Date(dueDate), "MMM dd, yyyy") : "No due date"}
        </p>
        <p className={`text-sm font-semibold ${getPriorityColor(priority)}`}>
          {priority} Priority
        </p>
      </div>
      <div>
        <label className="text-sm">Update Progress:</label>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className="w-full h-2 bg-gray-200 rounded-full appearance-none"
          style={{
            background: `linear-gradient(to right, #3b82f6 ${(progress / 100) * 100}%, #e5e7eb ${(progress / 100) * 100}%)`,
          }}
        />
        <p className="text-sm text-gray-500">{progress}%</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => setTaskState("To Do")}
          className={`px-3 py-1 rounded text-sm ${
            progress === 0
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          disabled={progress === 0}
        >
          To Do
        </button>
        <button
          onClick={() => setTaskState("In Progress")}
          className={`px-3 py-1 rounded text-sm ${
            progress === 50
              ? "bg-yellow-400 text-white cursor-not-allowed"
              : "bg-yellow-200 text-yellow-700 hover:bg-yellow-300"
          }`}
          disabled={progress === 50}
        >
          In Progress
        </button>
        <button
          onClick={() => setTaskState("Completed")}
          className={`px-3 py-1 rounded text-sm ${
            progress === 100
              ? "bg-green-400 text-white cursor-not-allowed"
              : "bg-green-200 text-green-700 hover:bg-green-300"
          }`}
          disabled={progress === 100}
        >
          Completed
        </button>
      </div>
      {attachmentUrl && (
        <div>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="text-blue-600 underline text-sm"
          >
            {showPreview ? "Hide Attachment" : "View Attachment"}
          </button>
          {showPreview && (
            <div className="mt-2">
              {isImage ? (
                <img
                  src={fullAttachmentUrl}
                  alt="Task Attachment"
                  className="max-w-full h-auto rounded-md"
                  onError={() => console.error("Failed to load image:", fullAttachmentUrl)}
                />
              ) : (
                <p className="text-sm text-gray-500">
                  File: <a href={fullAttachmentUrl} download className="text-blue-600 underline">Download</a>
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

UserProjectCard.propTypes = {
  taskId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  progress: PropTypes.number,
  dueDate: PropTypes.string,
  priority: PropTypes.oneOf(["Low", "Medium", "High"]),
  assignedBy: PropTypes.string,
  status: PropTypes.string,
  fileUrl: PropTypes.string,
  imageUrl: PropTypes.string,
  onProgressUpdate: PropTypes.func.isRequired,
};

export default UserProjectCard;