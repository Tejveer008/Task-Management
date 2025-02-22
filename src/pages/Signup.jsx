import React from 'react';
import '../styles/Signup.css'; // Don't forget to link the CSS file
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"
function App() {
    const navigate = useNavigate(); // Hook for navigation
    // Function to handle login button click
    const handleLogin = () => {
      // Here you can add authentication logic
      navigate("/login"); // Navigate to Dashboard after login
    };
    return (
        <div className="Signup-container">
            <div className="split-container">
                {/* Left Section with Image */}
                <div className="left-section">
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                        alt="login form"
                        className="project-image"
                    />
                </div>

                {/* Right Section with Form */}
                <div className="right-section">
                    <div className="Signup-form">
                        <div className="logo">
                            <i className="fas fa-cubes logo-icon"></i>
                            <img src={logo} alt='logo' className='front-logo' />
                        </div>

                        <h5 className="Signup-title">Sign into your account</h5>

                        <input
                            className="input-field"
                            type="name"
                            placeholder="First name"
                        />
                        <input
                            className="input-field"
                            type="name"
                            placeholder="Last name"
                        />
                        <input
                            className="input-field"
                            type="email"
                            placeholder="Email Address"
                        />
                        <input
                            className="input-field"
                            type="password"
                            placeholder="Password"
                        />

<button className="Signup-button"  onClick={() => navigate("/login")}>Signup</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;