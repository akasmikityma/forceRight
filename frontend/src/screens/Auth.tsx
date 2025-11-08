import {  useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { authenticated } from '@/store/atoms'
import { useNavigate } from 'react-router-dom'
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
interface Credentials {
  name: string
  email: string
  password: string
}

const Auth = () => {
  const [details, setDetails] = useState<Credentials>({
    name: '',
    email: '',
    password: ''
  })
  
  const nav = useNavigate();
  // const [loading,setLoading]  = useState(false);
  // const [authenticated, setAuthenticated] = useState(false);

  // useEffect(()=>{
  //   const checkAuth = async () => {
  //     try {
  //       const res = await fetch("/auth/me", { credentials: "include" }); // Include cookies
  //       if (res.ok) {
  //         setAuthenticated(true);
  //         nav("/") // Redirect authenticated user
  //       }
  //     } catch (error) {
  //       setAuthenticated(false);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkAuth();
  // },[])

  // if (loading) return <p>Loading...</p>;
  // if (authenticated) return null;

  const backEnd_url = "https://forceright-backend-1.onrender.com";
  const dev_url = "http://localhost:8080";

  const [isLogin, setIsLogin] = useState(false) // Toggle state
  const [athed,setauthed] = useRecoilState(authenticated);
  const handleChange = (field: keyof Credentials, value: string) => {
    setDetails((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const getToHome=()=>{
    nav("/home");
  }

  const save = async() => {
    try {
      const url = isLogin ? `${dev_url}/user/signIN` : `${dev_url}/user/signUP`;
      const payLoad = isLogin ? 
        { email: details.email, password: details.password } : 
        details;
      
      const response = await axios.post(url, payLoad, { withCredentials: true });
      
      if (response.status === 200 || response.status === 201) {
        // Only show success message if it contains "Welcome back"
        if (response.data.msg.includes("Welcome back")) {
          toast.success(response.data.msg);
        }
        setauthed(true);
        getToHome();
      } else {
        setauthed(false);
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err: any) {
      setauthed(false);
      toast.error("Internal error occurred. Please try again later.");
    }
  }

  const toggle = () => {
    setIsLogin((prev) => !prev) // Toggle between Login and SignUp
  }
  useEffect(()=>{
    console.log(athed);
  },[])
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
      />
      <div className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-lg border border-gray-300 w-96">
        <h2 className="text-xl font-semibold text-center text-gray-800">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {/* Email Field */}
        <input
          type="text"
          placeholder="Email"
          value={details.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password Field */}
        <input
          type="password"
          placeholder="Password"
          value={details.password}
          onChange={(e) => handleChange('password', e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Name Field (Only in Sign Up) */}
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={details.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        {/* Submit Button */}
        <button
          onClick={save}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>

        {/* Toggle Button */}
        <p className="text-center text-gray-600">
          {isLogin ? "Don't have an account?" : 'Already a user?'}{' '}
          <button
            onClick={toggle}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default Auth
