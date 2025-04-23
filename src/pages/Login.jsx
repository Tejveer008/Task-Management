import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import {
  GitHub,
  Google,
  LinkedIn,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [role, setRole] = useState("user"); // Default role is user
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ token: data.token, role: data.role })
        );
        window.dispatchEvent(new Event("storage"));
        toast.success("Login successful!", { position: "top-center" });
        setTimeout(() => {
          navigate(role === "admin" ? "/admin-dashboard" : "/user-dashboard");
        }, 1000);
      } else {
        toast.error(data.message || "Invalid email or password!", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Try again!", { position: "top-center" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-black">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <Typography variant="h4" className="mb-4 text-center text-blue-600">
          Login
        </Typography>

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

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            variant="outlined"
            name="password"
            value={loginInfo.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControl fullWidth>
            <InputLabel id="role-select-label">Select Role</InputLabel>
            <Select
              labelId="role-select-label"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>

          <Button fullWidth variant="contained" color="primary" type="submit">
            Login
          </Button>
        </form>

        <ToastContainer />

        <div className="mt-4 text-center">
          <Typography>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Sign up
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Login;
