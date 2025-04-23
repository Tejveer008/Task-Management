import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", // Default role
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      email: formData.email,
      password: formData.password,
      role: formData.role,
      ...(formData.role === "admin"
        ? { adminName: formData.name }
        : { username: formData.name }),
    };

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Signup successful! Redirecting to login...", {
          position: "top-center",
        });

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error(data.message || "Signup failed", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`shadow appearance-none border ${
                errors.name ? "border-red-500" : ""
              } rounded w-full py-2 px-3 text-gray-700`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`shadow appearance-none border ${
                errors.email ? "border-red-500" : ""
              } rounded w-full py-2 px-3 text-gray-700`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`shadow appearance-none border ${
                errors.password ? "border-red-500" : ""
              } rounded w-full py-2 px-3 text-gray-700`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`shadow appearance-none border ${
                errors.confirmPassword ? "border-red-500" : ""
              } rounded w-full py-2 px-3 text-gray-700`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs italic">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
        </form>

        <ToastContainer />

        <p className="text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
