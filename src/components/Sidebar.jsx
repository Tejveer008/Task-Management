import React, { useState, useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ toggleSettings }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState("user"); // Default role

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.role) {
      setRole(loggedInUser.role);
    }
  }, []);

  return (
    <div className="w-16 h-screen bg-blue-100 border-r-2 flex flex-col justify-between items-center py-10 px-3.5">
      <div>
        <HomeIcon
          color="primary"
          fontSize="large"
          className="my-12 cursor-pointer"
          onClick={() =>
            navigate(role === "admin" ? "/admin-dashboard" : "/user-dashboard")
          }
        />
        <MailIcon
          color="primary"
          fontSize="large"
          className="cursor-pointer"
          onClick={() => navigate("/client-messages")}
        />
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
