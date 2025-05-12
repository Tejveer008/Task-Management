// components/AdminProjectCard.jsx
import PropTypes from "prop-types";
import { format } from "date-fns";
import { useState } from "react";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";

const getStatusColor = (status) => {
  switch (status) {
    case "To-Do":
      return "bg-gray-400";
    case "Active":
      return "bg-yellow-400";
    case "Completed":
      return "bg-green-500";
    default:
      return "bg-gray-200";
  }
};

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

const AdminProjectCard = ({
  assignedTo,
  task,
  userProgress,
  taskDueDate,
  status,
  priority,
  attachmentUrl,
  onEdit,
  onDelete,
}) => {
  const isValidDate = taskDueDate && !isNaN(new Date(taskDueDate));
  const [showPreview, setShowPreview] = useState(false);
  const isImage = attachmentUrl && /\.(jpg|jpeg|png|gif)$/i.test(attachmentUrl);

  // Ensure the attachment URL is absolute
  const fullAttachmentUrl = attachmentUrl?.startsWith("http")
    ? attachmentUrl
    : `http://localhost:8080${attachmentUrl}`;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{task}</h3>
        <span
          className={`${getStatusColor(
            status
          )} px-2 py-1 rounded-full text-xs text-white`}
        >
          {status}
        </span>
      </div>
      <p className="text-sm text-gray-500">
        Assigned to: <strong>{assignedTo || "Unassigned"}</strong>
      </p>
      <div className="flex items-center justify-between">
        <p className="text-sm">
          Due:{" "}
          {isValidDate
            ? format(new Date(taskDueDate), "MMM dd, yyyy")
            : "No due date"}
        </p>
        <p className={`text-sm font-semibold ${getPriorityColor(priority)}`}>
          {priority} Priority
        </p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="h-2 rounded-full bg-blue-500"
          style={{ width: `${userProgress}%` }}
        ></div>
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
                  onError={() =>
                    console.error("Failed to load image:", fullAttachmentUrl)
                  }
                />
              ) : (
                <p className="text-sm text-gray-500">
                  File:{" "}
                  <a
                    href={fullAttachmentUrl}
                    download
                    className="text-blue-600 underline"
                  >
                    Download
                  </a>
                </p>
              )}
            </div>
          )}
        </div>
      )}
      <div className="flex justify-between mt-2">
        <button
          onClick={onEdit}
          className="text-blue-500 cursor-pointer hover:underline text-sm flex items-center gap-1"
          aria-label="Edit Task"
        >
          <EditTwoToneIcon fontSize="small" />
          Edit
        </button>

        <button
          onClick={onDelete}
          className="text-red-500 cursor-pointer hover:underline text-sm"
          aria-label="Delete Task"
        >
          <DeleteForeverTwoToneIcon fontSize="small" />
          Delete
        </button>
      </div>
    </div>
  );
};

AdminProjectCard.propTypes = {
  assignedTo: PropTypes.string,
  task: PropTypes.string.isRequired,
  userProgress: PropTypes.number,
  taskDueDate: PropTypes.string,
  status: PropTypes.oneOf(["To-Do", "Active", "Completed"]),
  priority: PropTypes.oneOf(["Low", "Medium", "High"]),
  attachmentUrl: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default AdminProjectCard;
