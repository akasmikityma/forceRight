
import React from "react";
import { Link } from "react-router-dom";
import { IoHomeOutline, IoAddCircleOutline, IoBarChartOutline, IoBookOutline } from "react-icons/io5";

const Sidebar: React.FC = () => {
  return (
    <aside className="h-screen w-64 fixed top-0 left-0 flex flex-col p-6 shadow-lg z-40
                      bg-gradient-to-br from-orange-500 to-blue-600 text-white">
      <div className="mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
          <IoHomeOutline className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-semibold">ForceRight</h1>
      </div>

      <nav className="flex flex-col gap-2">
        <Link
          to="/home"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition"
        >
          <IoHomeOutline className="w-5 h-5" />
          <span>Home</span>
        </Link>

        <Link
          to="/createTrack"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition"
        >
          <IoAddCircleOutline className="w-5 h-5" />
          <span>Add</span>
        </Link>

        <Link
          to="/analysis"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition"
        >
          <IoBarChartOutline className="w-5 h-5" />
          <span>Analytics</span>
        </Link>

        <Link
          to="/lib"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition"
        >
          <IoBookOutline className="w-5 h-5" />
          <span>Library</span>
        </Link>
      </nav>

      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="text-sm text-white/90">© 2025 ForceRight</div>
      </div>
    </aside>
  );
};

export default Sidebar