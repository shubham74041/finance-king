import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "./PopUp/Popup";

import CustomAlert from "../components/AdminPage/Admin/CustomAlert";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [showPopup, setShowPopup] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const login = async (data) => {
    try {
      const response = await fetch(`https://rajjiowin-backend.vercel.app/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      if (res.data) {
        setUser(res.data.user);
        setToken(res.data.phoneNumber);
        localStorage.setItem("site", res.data.phoneNumber);
        setShowPopup(true); // Show popup after successful login
        setAlertMessage("Login successful!"); // Set alert message
        setShowAlert(true); // Show custom alert
        navigate("/");
        return;
      }
      throw new Error(res.message);
    } catch (error) {
      console.error("Login failed:", error);
      setAlertMessage("Incorrect Phone Number or Password"); // Set alert message
      setShowAlert(true); // Show custom alert
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    // localStorage.removeItem("lastCheckInDate");
    localStorage.removeItem(`lastCheckInDate_${localStorage.getItem("site")}`);
    localStorage.removeItem(`allowSecondCheckIn`);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
      {/* Render Popup component conditionally */}
      {showPopup && <Popup message="Login successful!" onClose={closePopup} />}
      {/* Render CustomAlert component conditionally */}
      {showAlert && <CustomAlert message={alertMessage} onClose={closeAlert} />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
