
import { useState } from "react"
import { useRecoilState, useSetRecoilState } from 'recoil'
import { authenticated, userIdState } from '@/store/atoms'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { Code2, Mail, Lock, User, Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const nav = useNavigate()
  const backEnd_url = "https://forceright-backend-1.onrender.com";
  // const dev_url = "http://localhost:8080";
  const [isLogin, setIsLogin] = useState(false)
  const [athed, setauthed] = useRecoilState(authenticated)
  const setUserIdState = useSetRecoilState(userIdState);
  const handleChange = (field: keyof Credentials, value: string) => {
    setDetails(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const url = isLogin ? `${backEnd_url}/user/signIN` : `${backEnd_url}/user/signUP`
      const payLoad = isLogin ? 
        { email: details.email, password: details.password } : 
        details
      
      const response = await axios.post(url, payLoad, { withCredentials: true })
      console.log(athed)
      if (response.status === 200 || response.status === 201) {
        if (response.data.msg.includes("Welcome back")) {
          toast.success(response.data.msg)
        }
        const id = response.data.id;
        if(id){
          localStorage.setItem("userId",String(id));
          setUserIdState(id);
        }
        setauthed(true)
        nav("/home")
      } else {
        setauthed(false)
        toast.error("Something went wrong. Please try again.")
      }
    } catch (err: any) {
      setauthed(false)
      toast.error("Internal error occurred. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-blue-600 to-blue-700 flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">ForceRight</h1>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">Start Your Problem-Solving Journal</h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Create tracks for every problem you solve. Document your thought process, implementation details, and
              learn from your problem-solving journey with personalized analytics.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold text-sm">Structured Tracks</p>
                <p className="text-blue-100 text-xs">Add custom fields to organize your thoughts</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold text-sm">Time Tracking</p>
                <p className="text-blue-100 text-xs">Measure how long you spend on problems</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold text-sm">Personal Analytics</p>
                <p className="text-blue-100 text-xs">Analyze your growth and patterns</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-blue-100 text-sm">© 2025 ForceRight. All rights reserved.</p>
      </div>

      {/* Right Section - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white dark:bg-slate-950">
        <div className="w-full max-w-md">
          <ToastContainer />
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-muted-foreground">
              {isLogin ? 'Sign in to continue your journey' : 'Start documenting your problem-solving journey'}
            </p>
          </div>

          <form onSubmit={save} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    value={details.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="pl-10 h-11"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  value={details.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="pl-10 h-11"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={details.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="pl-10 pr-10 h-11"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-purple-600 hover:bg-purple-700 text-white font-semibold mt-6"
            >
              {isLoading ? (isLogin ? "Signing in..." : "Creating account...") : 
                (isLogin ? "Sign In" : "Create Account")}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-semibold"
            >
              {isLogin ? "Create one" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Auth