import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [role, setRole] = useState("user");
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { email, password } = loginInfo;
    if (!email || !password) {
      toast.warning("Please fill out all fields", { position: "top-center" });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.warning("Invalid email format", { position: "top-center" });
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...loginInfo, role }),
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
        }, 1200);
      } else {
        toast.error(data.message || "Invalid email or password!", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please try again later.", {
        position: "top-center",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #2563eb, #000000)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          borderRadius: 3,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleLogin} noValidate>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            name="email"
            autoComplete="email"
            value={loginInfo.email}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={loginInfo.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Select Role</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              label="Select Role"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#2563eb" }}>
            Sign up
          </Link>
        </Typography>

        <ToastContainer />
      </Paper>
    </Box>
  );
};

export default Login;
