import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-white shadow-md px-6 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/zidio_development_logo.png" alt="Zidio Development Logo" className="h-20 w-30" />
        </div>

        {/* Navigation */}
        <div className="flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">About</Link>
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Services</Link>
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Contact</Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex space-x-4">
          <Button component={Link} to="/login" variant="outlined" color="primary">
            Sign In
          </Button>
          <Button component={Link} to="/signup" variant="contained" color="primary">
            Sign Up
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center flex-grow bg-gradient-to-r from-blue-600 to-black text-white py-24">
        <h1 className="text-5xl font-bold mb-4">Welcome to Zidio Development</h1>
        <p className="text-lg max-w-2xl">
          We provide cutting-edge development solutions for businesses worldwide.
        </p>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="secondary"
          className="mt-6"
        >
          Explore Services
        </Button>
      </header>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6">
        <p>&copy; 2025 Zidio Development. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
