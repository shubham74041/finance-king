import { useState } from "react";
import CustomAlert from "../AdminPage/Admin/CustomAlert.js";

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
    <div>
      <h3 style={{ textAlign: "center", marginTop: "60px" }}>
        Forgot Password
      </h3>
      <p>Make a request for changing the password</p>
      <form>
        <div className="phone_number">
          <label className="form-label">UserId:</label>
          <input
            placeholder="phoneNumber"
            id="phoneNumber"
            className="form-control"
            type="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <button onClick={handleRequestClick}>Request</button>
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
