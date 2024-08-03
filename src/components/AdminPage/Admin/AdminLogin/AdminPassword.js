// ChangePasswordPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminPassword.css";

const AdminPassword = () => {
  const [username, setUsername] = useState("");
  const [passkey, setPasskey] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      // change url from /change-password => /admin-changePassword
      const response = await axios.post(
        `${process.env.REACT_APP_PATH_URL}/admin-changePassword`,
        {
          username,
          passkey,
          newPassword,
        }
      );
      if (response.data.success) {
        setSuccess("Password changed successfully");
        setTimeout(() => navigate("/admin-login"), 2000);
      } else {
        setError(response.data.message || "Passkey is incorrect");
      }
    } catch (error) {
      console.error("Change password error", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="change-password-container">
      <h2 className="change-password-heading">Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <div className="password-input">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="password-input">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="password-input">
          <label>Passkey</label>
          <input
            type="password"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit" className="change-password-button">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default AdminPassword;
