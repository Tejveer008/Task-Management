import React, { useState } from 'react';
import { Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [role, setRole] = useState('user'); // default role is user

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-black">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <Typography variant="h4" className="mb-4 text-center text-blue-600">Sign Up</Typography>

        <form className="space-y-4">
          <TextField fullWidth label="Name" variant="outlined" />
          <TextField fullWidth label="Email" variant="outlined" />
          <TextField fullWidth label="Password" type="password" variant="outlined" />

          {/* Role Selection Dropdown */}
          <FormControl fullWidth>
            <InputLabel id="role-select-label">Select Role</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              value={role}
              label="Select Role"
              onChange={handleRoleChange}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>

          <Button fullWidth variant="contained" color="primary">Sign Up</Button>
        </form>

        <div className="mt-6 flex justify-between">
          <Button color="primary" variant="text">Sign up with Google</Button>
          <Button color="primary" variant="text">Sign up with GitHub</Button>
          <Button color="primary" variant="text">Sign up with LinkedIn</Button>
        </div>

        <div className="mt-4 text-center">
          <Typography>Already have an account?<Link to="/login" className='text-blue-600'> Login</Link></Typography>
        </div>
      </div>
    </div>
  );
};

export default Signup;
