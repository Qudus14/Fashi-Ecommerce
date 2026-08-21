"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "./api";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to parse stored auth data", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };
    initializeAuth();
  }, []);

  // Login function using the API
  const login = async (email, password) => {
    setAuthError(null);
    setIsLoading(true);
    
    try {
      const response = await authAPI.login(email, password);
      
      // The response contains userId, email, fullName, firstName, lastName, token
      const { token, userId, email: userEmail, firstName, lastName, fullName } = response;
      
      // Create user object from response
      const userData = {
        id: userId,
        email: userEmail,
        firstName: firstName,
        lastName: lastName,
        fullName: fullName || `${firstName} ${lastName}`,
        // Add any other user data from response
      };
      
      // Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      
      // Update state
      setToken(token);
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (error) {
      console.error("Login failed:", error);
      setAuthError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };



  // Register/Signup function using the API
  const register = async (userData) => {
    setAuthError(null);
    setIsLoading(true);
    
    try {
      const response = await authAPI.register(userData);
      
      // After successful registration, optionally auto-login
      // or redirect to login page
      const { userId, email, firstName, lastName, fullName, token } = response;
      
      // If the API returns a token with registration, auto-login
      if (token) {
        const userData = {
          id: userId,
          email,
          firstName,
          lastName,
          password,
          phoneNumber,
          role,
          fullName: fullName || `${firstName} ${lastName}`,
        };
        
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(token);
        setUser(userData);
        
        return { success: true, user: userData, autoLogin: true };
      }
      
      // Otherwise, just return success and the user data
      return { 
        success: true, 
        user: {
          id: userId,
          email,
          firstName,
          lastName,
          password,
          phoneNumber,
          role,
          fullName: fullName || `${firstName} ${lastName}`,
        },
        autoLogin: false
      };
    } catch (error) {
      console.error("Registration failed:", error);
      setAuthError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Update user function
  const updateUser = (partial) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updatedUser = { ...prev, ...partial };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  // Refresh balance - placeholder
  const refreshBalance = async () => {
    // Implement if needed
    console.log("Refresh balance called");
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setAuthError(null);
    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  };

  // Idle logout effect
  useEffect(() => {
    let idleTimer;

    const handleIdleLogout = () => {
      const timeoutDuration = 10 * 60 * 1000; // 10 minutes
      clearTimeout(idleTimer);
      if (token) {
        idleTimer = setTimeout(() => {
          logout();
        }, timeoutDuration);
      }
    };

    const activityEvents = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];

    if (token) {
      activityEvents.forEach((event) =>
        window.addEventListener(event, handleIdleLogout),
      );
      handleIdleLogout();
    }

    return () => {
      activityEvents.forEach((event) =>
        window.removeEventListener(event, handleIdleLogout),
      );
      clearTimeout(idleTimer);
    };
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        updateUser,
        refreshBalance,
        isLoading,
        isAuthenticated: !!token,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}