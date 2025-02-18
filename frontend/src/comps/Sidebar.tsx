    // components/Sidebar.tsx
import React from "react";
import { Link } from "react-router-dom"; // Replace with `next/link` if using Next.js
import { IoHomeOutline } from "react-icons/io5";
const Sidebar: React.FC = () => {
  return (
    <div className="h-screen w-64 text-orange-500 fixed top-0 left-0 flex border-r border-orange-600 border-4 flex-col items-center py-8 shadow-lg">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      <nav className="flex flex-col items-center gap-4">
      <Link className="hover:bg-gray-700 px-4 py-2 rounded" to="/">
          <IoHomeOutline/>
        </Link>
        <Link className="hover:bg-gray-700 px-4 py-2 rounded" to="/createTrack">
          Add
        </Link>
        <Link className="hover:bg-gray-700 px-4 py-2 rounded" to="/analysis">
          Analytics
        </Link>
        <Link className="hover:bg-gray-700 px-4 py-2 rounded" to="/lib">
          Library
        </Link>
        {/* Add more navigation links */}
      </nav>
    </div>
  );
};

export default Sidebar;
