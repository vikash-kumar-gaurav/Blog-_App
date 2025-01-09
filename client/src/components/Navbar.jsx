import React from "react";
import { Link } from "react-router-dom";
import logo from '/Group 2.png'

const Navbar = () => {
  return (
    <div className="w-full max-h-18 ">
        <nav className="flex items-center justify-between px-8 py-6 bg-black backdrop-blur-md shadow-xl border-b border-gray-700 ">
      {/* Logo with Bounce Effect */}
      <Link to={'/'}>
      <div 
        className=" animate-bounce"
      >
        <img src={logo} style={{height:"60px"}}  />
      </div>
      </Link>

      {/* Right-side Section */}
      <div className="flex items-center space-x-10">
        {/* "Me" Section */}
        <div className="flex items-center space-x-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            alt="React Logo"
            className="w-8 h-8 animate-spin-slow"
          />
          <span className="text-lg font-semibold text-gray-300">Me</span>
        </div>

        {/* "All Blog" Section */}
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-medium text-sm transition transform hover:scale-105 hover:shadow-lg">
          All Blog
        </button>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
