import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-sky-500 p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="tex-xl font-bold text-white">University App</Link>
        <div className="space-x-4">
          <Link to="/students" className="text-white">
            Students
          </Link>
          <Link to="/courses" className="text-white">
            Courses
          </Link>
          <Link to="/enroll" className="text-white">
            Enroll
          </Link>
        </div>
      </div>
    </nav>
  );
};
