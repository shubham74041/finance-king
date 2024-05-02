import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (phoneNumber, password) => {
    try {
      // Make a request to your backend to authenticate the user
      const response = await axios.post(
        "https://rajjiowin-backend.vercel.app/",
        {
          phoneNumber,
          password,
        }
      );
      console.log("Response data:", response.data);
      console.log("Response", response.data.success);
      // If login is successful, set isAuthenticated to true
      if (response.data && response.data.success) {
        setIsAuthenticated(true);
      } else {
        // If login fails, throw an error
        throw new Error(response.data.message);
      }
    } catch (error) {
      // Handle login errors
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    // Perform logout logic, set isAuthenticated to false
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
