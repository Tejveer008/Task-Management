import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css"; // Ensure the styles are correct
import logo from "../assets/logo.png"; // Replace with your actual logo path

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Dummy authentication logic for admin and user
    if (email === "admin@example.com" && password === "admin123") {
      navigate("/admin-dashboard"); // Redirect to admin dashboard
    } else if (email === "user@example.com" && password === "user123") {
      navigate("/home"); // Redirect to user dashboard
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="login-container">
      <div className="split-container">
        {/* Left Section */}
        <div className="left-section">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
            alt="login form"
            className="project-image"
          />
        </div>

        {/* Right Section */}
        <div className="right-section">
          <div className="login-form">
            <div className="logo">
              <img src={logo} alt="logo" className="front-logo" />
            </div>

            <h5 className="login-title">Log into your account</h5>

            {/* Email Input */}
            <input
              className="input-field"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password Input */}
            <input
              className="input-field"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Login Button */}
            <button className="login-button" onClick={handleLogin}>
              Login
            </button>

            {/* Links */}
            <div className="links">
              <a href="#">Forgot password?</a>
              <p className="account">
                Don't have an account?{" "}
                <button className="sign-up-button" onClick={() => navigate("/signup")}>
                  Sign-up
                </button>
              </p>
              <p>
                <a href="#">Terms of use</a> | <a href="#">Privacy policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
