// // components/Layout.tsx
// import React from "react";
// import { useLocation } from "react-router-dom"; // Replace with custom logic for Next.js
// import Sidebar from "./Sidebar";
// import { Link } from "react-router-dom";
// import { IoHomeOutline } from "react-icons/io5";
// const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const location = useLocation();

//   // Render a different sidebar for the "add" page
//   const isAddPage = location.pathname === "/createTrack";

//   return (
//     <div className="flex">
//         <Sidebar />
//       <main className="flex-1 ml-64 w-full overflow-y-auto">{children}</main>
//     </div>
//   );
// };

// export default Layout;

// const getToAuth=()=>{
//   alert("currently unauthenticated"); 
//     nav('/auth');
// }

// const handlelogout = async () => {
//   try {
//     await axios.post("/auth/logout", {}, { withCredentials: true }); // Include cookies
//     setAuthenticated(false); // Update the state to reflect that the user is logged out
//     nav("/login"); // Redirect to the login page using useNavigate
//   } catch (error) {
//     console.error("Logout failed:", error);
//   }
// };

// const [loading,setLoading]  = useState(false);
//   const nav = useNavigate();

{/* 🔹 Fixed Top Section */}
{/* <header className="fixed top-0 left-0 w-full h-14 bg-white shadow-md flex items-center justify-between px-6 border-b border-gray-300 z-40">
  {/* <h1 className="text-xl font-bold text-gray-800">My App</h1> */}
  {/* <button className="bg-blue-500 text-white px-4 py-2 justify-end rounded hover:bg-blue-600">
    Login
  </button> */}
{/* </header> */}

import axios from "axios";
import React, { useState, useRef ,useEffect} from "react";
import { BsLayoutTextSidebar } from "react-icons/bs";
 // Replace with custom logic for Next.js
import Sidebar from "./Sidebar";
import { authenticated } from "@/store/atoms";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  // const location = useLocation();
  const nav = useNavigate();
  // Toggle Sidebar visibility
  const showSidebar = () => {
    setIsSidebarVisible(true);
  };


  const hideSidebar = () => {
    setIsSidebarVisible(false);
  };

  // Detect clicks outside the sidebar
  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      hideSidebar();
    }
  };

    const [authenticatedst, setAuthenticatedst] = useRecoilState(authenticated);
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const res = await axios.get("https://forceright-bnd.onrender.com/user/auth/me", { withCredentials: true }); // Include cookies
          console.log(`checkAuth data`,JSON.stringify(res.data));
          if (res.status === 200) {
            setAuthenticatedst(true);
            nav("/"); // Redirect authenticated user
          } else {
            setAuthenticatedst(false); // Ensure state is updated if not authenticated
          }
        } catch (error) {
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
  React.useEffect(() => {
    if (isSidebarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarVisible]);

  return (
    <div className="flex relative min-h-screen">
      {/* Sidebar */}
      {isSidebarVisible && (
        <div
          ref={sidebarRef}
          className="z-50 fixed top-0 left-0 w-64 h-screen bg-white shadow-lg border-r border-gray-300"
        >
          <Sidebar />
        </div>
      )}

      {/* Sidebar Toggle Button */}
      {!isSidebarVisible && (
        <button
          onClick={showSidebar}
          className="fixed top-4 left-4 z-50 bg-orange-500 text-white px-4 py-2 rounded shadow-lg"
        >
          <BsLayoutTextSidebar />
        </button>
      )}

      <header className="fixed top-0 left-0 w-full h-14 bg-white shadow-md flex items-center px-6 border-b border-gray-300 z-40">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-auto"
        onClick={authenticatedst ? handlelogout : getToAuth}
      >
        {authenticatedst ? "logout" : "login"}
      </button>
    </header>
    

      {/* Main Content */}
      <main className={`flex-1 ${isSidebarVisible ? "ml-64" : "ml-0"} mt-14 p-6 transition-all`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;

