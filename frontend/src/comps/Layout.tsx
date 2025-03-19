import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { BsLayoutTextSidebar } from "react-icons/bs";
import Sidebar from "./Sidebar";
import { authenticated } from "@/store/atoms";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const nav = useNavigate();
  const location = useLocation();

  const [authenticatedst, setAuthenticatedst] = useRecoilState(authenticated);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("https://forceright-backend-1.onrender.com/user/auth/me", { withCredentials: true }); // Include cookies
        console.log(`checkAuth data`, JSON.stringify(res.data));
        if (res.status === 200) {
          setAuthenticatedst(true);
          nav("/"); // Redirect authenticated user
        } else {
          setAuthenticatedst(false); // Ensure state is updated if not authenticated
        }
      } catch (error) {
        console.log(error);
        setAuthenticatedst(false);
      }
    };

    checkAuth();
  }, []);

  const handlelogout = async () => {
    alert("currently authenticated and u requested to get log out");
    await fetch("/auth/logout", { method: "POST", credentials: "include" });
    setAuthenticatedst(false); // Update the state to reflect that the user is logged out
    nav("/login"); // Redirect to the login page
  };

  // Handle navigation to login
  const getToAuth = () => {
    alert("currently unauthenticated");
    nav("/auth");
  };

  // Add/remove event listener for clicks outside the sidebar
  useEffect(() => {
    if (isSidebarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarVisible]);

  // Detect clicks outside the sidebar
  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      hideSidebar();
    }
  };

  // Toggle Sidebar visibility
  const showSidebar = () => {
    setIsSidebarVisible(true);
  };

  const hideSidebar = () => {
    setIsSidebarVisible(false);
  };

  // Check if the current path is the landing page
  const isLandingPage = location.pathname === "/";

  return (
    <div className="flex relative min-h-screen">
      {/* Sidebar */}
      {!isLandingPage && isSidebarVisible && (
        <div
          ref={sidebarRef}
          className="z-50 fixed top-0 left-0 w-64 h-screen bg-white shadow-lg border-r border-gray-300"
        >
          <Sidebar />
        </div>
      )}

      {/* Sidebar Toggle Button */}
      {!isLandingPage && !isSidebarVisible && (
        <button
          onClick={showSidebar}
          className="fixed top-4 left-4 z-50 bg-orange-500 text-white px-4 py-2 rounded shadow-lg"
        >
          <BsLayoutTextSidebar />
        </button>
      )}

      {/* Header */}
      {!isLandingPage && (
        <header className="fixed top-0 left-0 w-full h-14 bg-white shadow-md flex items-center px-6 border-b border-gray-300 z-40">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-auto"
            onClick={authenticatedst ? handlelogout : getToAuth}
          >
            {authenticatedst ? "logout" : "login"}
          </button>
        </header>
      )}

      {/* Main Content */}
      <main className={`flex-1 ${isSidebarVisible ? "ml-64" : "ml-0"} mt-14 p-6 transition-all`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;

