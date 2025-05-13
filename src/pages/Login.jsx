import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordInput from "../components/PasswordInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Optional: Redirect if already logged in
  useEffect(() => {
  const checkLogin = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/me", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        navigate(data.role === "admin" ? "/admin-dashboard" : "/user-dashboard");
      }
    } catch (err) {}
  };
  checkLogin();
}, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful", { position: "top-center" });
        setTimeout(() => {
          navigate(data.user.role === "admin" ? "/admin-dashboard" : "/user-dashboard");
        }, 1500);
      } else {
        toast.error(data.message || "Login failed", { position: "top-center" });
      }
    } catch (error) {
      toast.error("Server error. Try again.", { position: "top-center" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-black">
      <div className="w-full max-w-md bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              autoComplete="email"
              name="email"
              placeholder="Email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <PasswordInput
            label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
