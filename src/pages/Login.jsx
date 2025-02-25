import React, { useState } from 'react';
import { Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('user'); // default role is user
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Dummy credentials for testing
  const dummyCredentials = {
    user: {
      email: 'user@example.com',
      password: 'user123',
    },
    admin: {
      email: 'admin@example.com',
      password: 'admin123',
    },
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleLogin = () => {
    // Check if the entered credentials match the dummy ones
    const credentials = dummyCredentials[role];
    if (email === credentials.email && password === credentials.password) {
      setErrorMessage('');
      alert(`${role.charAt(0).toUpperCase() + role.slice(1)} logged in successfully!`);

      // Redirect to the respective dashboard based on the role
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } else {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-black">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <Typography variant="h4" className="mb-4 text-center text-blue-600">Login</Typography>

        <form className="space-y-96"> {/* Adjusted the gap between input fields to "space-y-4" */}
          <TextField
            fullWidth
            label="Email"
            autoComplete="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

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

          <Button fullWidth variant="contained" color="primary" className="mt-6" onClick={handleLogin}>
            Login
          </Button>
        </form>

        {errorMessage && (
          <Typography color="error" className="mt-4 text-center">
            {errorMessage}
          </Typography>
        )}

        <div className="mt-6 flex justify-between space-x-2"> {/* Adjusted gap between OAuth buttons */}
          <Button color="primary" variant="text">Login with Google</Button>
          <Button color="primary" variant="text">Login with GitHub</Button>
          <Button color="primary" variant="text">Login with LinkedIn</Button>
        </div>

        <div className="mt-4 text-center">
          <Typography>Don't have an account? <Link to="/signup" className='text-blue-600'>Sign up</Link></Typography>
        </div>
      </div>
    </div>
  );
};

export default Login;
