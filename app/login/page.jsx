// app/login/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/service/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail, AlertCircle, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  
  const { login } = useAuth();
  const router = useRouter();

  // Validation
  const isEmailValid = email.trim() !== "" && email.includes("@");
  const isPasswordValid = password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    
    if (!isFormValid) return;
    
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        router.push("/");
      } else {
        setError(result.error || "Invalid email or password. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-dismiss error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-[500px] bg-gary-50 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >

        {/* <div className="hidden md:block w-1/2 relative overflow-hidden">
          <Image
            src="https://live.templately.com/wp-content/uploads/2021/02/56468664-image_.png"
            alt="Welcome back illustration - Woman standing with flowers"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div> */}
        
        {/* ── Left Side: Login Form ── */}
        <div className="w-full p-8 md:p-12 lg:p-16">
          <div className="max-w-sm mx-auto">
            {/* Welcome Header */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <h1 className="text-3xl text-center font-bold text-gray-900 tracking-tight">
                Welcome Back.
              </h1>
              <p className="text-gray-500 text-center text-sm mt-2">
                Please Log In To Your Account.
              </p>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 overflow-hidden"
                >
                  <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Username or Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                    placeholder="Enter your email"
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl outline-none transition-all bg-gray-50/50 ${
                      touched.email && !isEmailValid
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-200 focus:border-[#FF8000] focus:ring-2 focus:ring-[#FF8000]/20"
                    }`}
                    required
                  />
                </div>
                {touched.email && !isEmailValid && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-500 mt-1.5"
                  >
                    Please enter a valid email address
                  </motion.p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl outline-none transition-all bg-gray-50/50 ${
                      touched.password && !isPasswordValid
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-200 focus:border-[#FF8000] focus:ring-2 focus:ring-[#FF8000]/20"
                    }`}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {touched.password && !isPasswordValid && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-500 mt-1.5"
                  >
                    Password must be at least 6 characters
                  </motion.p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                      rememberMe
                        ? "bg-[#FF8000] border-[#FF8000]"
                        : "border-gray-300 group-hover:border-[#FF8000]"
                    }`}>
                      {rememberMe && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                  <span>Remember Password</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#FF8000] hover:text-[#e67300] font-medium transition-colors hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading || !isFormValid}
                className={`w-full text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-base mt-3 flex items-center justify-center gap-2 ${
                  isFormValid
                    ? "bg-[#FF8000] hover:bg-[#e67300]"
                    : "bg-gray-400"
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-[#FF8000] font-medium hover:text-[#e67300] transition-colors hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* ── Right Side: Your Image ── */}
        
      </motion.div>
    </div>
  );
}