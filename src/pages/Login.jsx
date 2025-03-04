import React, { useState } from 'react';
import { Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl, IconButton, InputAdornment, Box } from '@mui/material';
import { GitHub, Google, LinkedIn, Visibility, VisibilityOff } from '@mui/icons-material'; 
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

const Login = () => {
  const [role, setRole] = useState('user'); // default role is user
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    
    if (!email || !password) {
      return handleError('Email and password are required');
    }
    
    try {
      const url = `https://deploy-mern-app-1-api.vercel.app/auth/login`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...loginInfo, role }), // Include role in the request
      });

      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() => {
          // Redirect based on role
          if (role === 'admin') {
            navigate('/admin-dashboard');
          } else {
            navigate('/user-dashboard');
          }
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message || 'An error occurred';
        handleError(details);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message || 'An error occurred');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev); // Toggle password visibility
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-black">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <Typography variant="h4" className="mb-4 text-center text-blue-600">Login</Typography>

        <form onSubmit={handleLogin} className="space-y-4">
          <TextField
            fullWidth
            label="Email"
            autoComplete="email"
            variant="outlined"
            name="email"
            value={loginInfo.email}
            onChange={handleChange}
          />
          
          {/* Password Field with Show/Hide Option */}
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'} 
            autoComplete="current-password"
            variant="outlined"
            name="password"
            value={loginInfo.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Role Selection Dropdown */}
          <FormControl fullWidth>
            <InputLabel id="role-select-label">Select Role</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              value={role}
              label="Select Role"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>

          <Button fullWidth variant="contained" color="primary" className="mt-6" type="submit">
            Login
          </Button>
        </form>

        <ToastContainer />

        <div className="mt-4 text-center">
          <Typography>Don't have an account? <Link to="/signup" className='text-blue-600'>Sign up</Link></Typography>
        </div>

        {/* OAuth Buttons */}
        <div className="mt-6 flex justify-between space-x-2">
        <Box className="flex flex-col items-center">
  <IconButton color="primary" onClick={() => window.location.href = 'http://localhost:8080/auth/google'}>
    <Google fontSize="large" />
  </IconButton>
  <Typography variant="body2">Login with Google</Typography>
</Box>

<Box className="flex flex-col items-center">
  <IconButton color="primary" onClick={() => window.location.href = 'http://localhost:8080/auth/github'}>
    <GitHub fontSize="large" />
  </IconButton>
  <Typography variant="body2">Login with GitHub</Typography>
</Box>

<Box className="flex flex-col items-center">
  <IconButton color="primary" onClick={() => window.location.href = 'http://localhost:8080/auth/linkedin'}>
    <LinkedIn fontSize="large" />
  </IconButton>
  <Typography variant="body2">Login with LinkedIn</Typography>
</Box>

        </div>
      </div>
    </div>
  );
};

export default Login;
