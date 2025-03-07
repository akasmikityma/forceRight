import {  useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { authenticated } from '@/store/atoms'
import { useNavigate } from 'react-router-dom'
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


  const [isLogin, setIsLogin] = useState(false) // Toggle state
  const [athed,setauthed] = useRecoilState(authenticated);
  const handleChange = (field: keyof Credentials, value: string) => {
    setDetails((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const getToHome=()=>{
    nav("/");
  }

  const save = async() => {
    // alert(JSON.stringify(details))
    // const req = axios.post("http://localhost:3000/user/signIN")
    try{
        const url = isLogin? "https://forceright-backend-1.onrender.com/user/signIN":"https://forceright-backend-1.onrender.com/user/signUP";
        const payLoad = isLogin? {email:details.email,password:details.password}:details;
        const response =await axios.post(url,payLoad,{withCredentials:true});
        alert(response.status);
        if(response.status===200 || response.status===201){
          alert(response.data.msg);
          setauthed(true);
          getToHome();
        }else{
          setauthed(false);
          alert("try again .. there are some internal issues")
        }
        // alert(response.data.msg);
    }catch(err){
        alert("there are some internal issue happend");
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
