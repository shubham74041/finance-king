import { useState } from "react";
import CustomAlert from "../AdminPage/Admin/CustomAlert.js";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleRequestClick = (e) => {
    e.preventDefault();

    const telegramUsername = "Rajjowinhelp";
    const message = `I want to change my password, here is my userid: ${phoneNumber}`;
    const telegramUrl = `https://t.me/${telegramUsername}?text=${encodeURIComponent(
      message
    )}`;

    window.open(telegramUrl, "_blank");

    setShowAlert(true); // Show custom alert
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="forgot-password">
      <h3 className="forgot-password-heading">Forgot Password</h3>
      <p className="forgot-password-text">
        Make a request for changing the password
      </p>
      <form className="forgot-password-form">
        <div className="phone_number">
          <label className="form-label-text">UserId:</label>
          <input
            placeholder="phoneNumber"
            id="phoneNumber"
            className="form-control-input"
            type="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <button className="forgot-password-button" onClick={handleRequestClick}>
          Request
        </button>
      </form>
      {/* Render CustomAlert component conditionally */}
      {showAlert && (
        <CustomAlert
          message="Password will be changed within 24 hours"
          onClose={handleCloseAlert}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
