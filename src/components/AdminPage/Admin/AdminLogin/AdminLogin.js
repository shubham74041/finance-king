// AdminLoginPage.js

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./AdminLoginPage.css";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // console.log("REACT_APP_API_URL:", process.env.REACT_APP_API_URL);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://rajjowin.in/admin-login`, {
        username,
        password,
      });
      if (response.data.success) {
        localStorage.setItem("adminAuthenticated", "true");
        navigate("/rajiowin-admin");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div className="admin-input">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="admin-input">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="admin-login">
          Login
        </button>
      </form>
      <Link to="/change-password" className="change-password">
        Change Password
      </Link>
    </div>
  );
};

export default AdminLogin;
