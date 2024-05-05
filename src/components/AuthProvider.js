import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "./PopUp/Popup";
// import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const login = async (data) => {
    // console.log(phoneNumber);
    // console.log(password);
    try {
      // if (phoneNumber !== "undefined" && password !== "undefined") {
      //   setIsAuthenticated(true);
      // Make a request to your backend to authenticate the user

      const response = await fetch("https://rajjiowin-backend.vercel.app/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      console.log(res.data);
      if (res.data) {
        setUser(res.data.user);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        setShowPopup(true); // Show popup after successful login
        navigate("/");
        return;
      }
      throw new Error(res.message);
      // const response = await axios.post(
      //   "https://rajjiowin-backend.vercel.app/",
      //   {
      //     phoneNumber,
      //     password,
      //   }
      // );
      // console.log(phoneNumber);
      // console.log("Response data:", response.data);
      // console.log("Response", response.data.success);
      // If login is successful, set isAuthenticated to true
      // if (response.data.success) {
      //   // If login is successful, set isAuthenticated to true
      //   setIsAuthenticated(true);
      // } else {
      //   // If login fails, throw an error
      //   // throw new Error(response.data.message);
      //   throw new Error("Incorrect Phone Number or Password");
      // }
    } catch (error) {
      // Handle login errors
      console.error("Login failed:", error);
    }
  };
  const closePopup = () => {
    setShowPopup(false);
  };

  const logout = () => {
    // Perform logout logic, set isAuthenticated to false
    // setIsAuthenticated(false);
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
      {/* Render Popup component conditionally */}
      {showPopup && <Popup message="Login successful!" onClose={closePopup} />}
    </AuthContext.Provider>
  );
};
// export default AuthProvider;
export const useAuth = () => {
  return useContext(AuthContext);
};