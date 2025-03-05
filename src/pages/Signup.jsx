import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' // Default role
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};
    
    // Name validation
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters long';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; // Prevent form submission if validation fails

    try {
      // API call for signup
      const response = await fetch('https://task-management-jet-omega.vercel.app/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Handle successful signup, e.g., navigate to login or dashboard
        navigate('/login');
      } else {
        // Handle server validation errors or other responses
        const data = await response.json();
        setErrors({ serverError: data.message });
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ serverError: 'Something went wrong. Please try again.' });
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
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`shadow appearance-none border ${errors.name ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700`}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`shadow appearance-none border ${errors.email ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`shadow appearance-none border ${errors.password ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`shadow appearance-none border ${errors.confirmPassword ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
          </div>

          {/* Role Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
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

          {/* Server Error */}
          {errors.serverError && (
            <div className="mb-4 text-red-500 text-sm text-center">{errors.serverError}</div>
          )}

          {/* Submit Button */}
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 text-sm">
          Already have an account? <a href="/login" className="text-blue-500 hover:text-blue-700">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
