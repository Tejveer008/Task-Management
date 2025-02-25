import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ toggleSettings }) => {
  const navigate = useNavigate();

  return (
    <div className="w-16 h-screen  bg-gray-100 border-r-2 flex flex-col justify-between items-center py-30">
      <div>
        <HomeIcon fontSize="large" className='cursor-pointer' onClick={() => navigate('/admin-dashboard')} />
        <MailIcon fontSize="large" className="my-30 cursor-pointer" onClick={() => navigate('/client-messages')} />
        {/* Open settings panel */}
        <SettingsIcon fontSize="large" className='cursor-pointer' onClick={toggleSettings} />
      </div>
    </div>
  );
};

export default Sidebar;
