import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";
import Profile from "./profile/Profile";

const Sidebar = ({ toggleSettings }) => {
  const navigate = useNavigate();

  return (
    <div className="w-16 h-screen bg-blue-100 border-r-2 flex flex-col items-center py-4 px-3.5">
      {/* Profile Section at the Top */}
      <div className="mb-8">
        <Profile />
      </div>

      {/* Navigation Icons */}
      <div className="flex flex-col items-center space-y-8">
        <HomeIcon
          color="primary"
          fontSize="large"
          className="cursor-pointer"
          onClick={() => {
            fetch("http://localhost:8080/api/auth/me", { credentials: "include" })
              .then((res) => res.json())
              .then((data) => {
                if (data.role === "admin") {
                  navigate("/admin-dashboard");
                } else {
                  navigate("/user-dashboard");
                }
              })
              .catch(() => navigate("/login"));
          }}
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
          className="cursor-pointer"
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