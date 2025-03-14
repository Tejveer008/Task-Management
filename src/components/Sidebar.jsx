import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ toggleSettings }) => {
  const navigate = useNavigate();
  const [role] = useState(() => {
    const isAdmin = false; // Replace with actual logic
    return isAdmin ? "admin" : "user";
  });

  return (
    <div className="w-16 h-screen  bg-blue-100 border-r-2 flex flex-col justify-between items-center py-10 px-3.5">
      <div>
        <HomeIcon
          color="primary"
          fontSize="large"
          className="my-12 cursor-pointer"
          onClick={
            role === "admin"
              ? () => navigate("/admin-dashboard")
              : () => navigate("/user-dashboard")
          }
        />
        <MailIcon
          color="primary"
          fontSize="large"
          className="cursor-pointer"
          onClick={() => navigate("/client-messages")}
        />
        {/* Open settings panel */}
        <SettingsIcon
          color="primary"
          fontSize="large"
          className="my-12 cursor-pointer"
          onClick={toggleSettings}
        />
        <GroupsIcon
          color="primary"
          fontSize="large"
          className="cursor-pointer"
          onClick={() => navigate("/teamCollaboration")}
        />
      </div>
    </div>
  );
};

export default Sidebar;
