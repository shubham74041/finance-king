// CheckIn.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CheckIn.css";
import CheckInIcon from "../icons/icons8-entrance-100.png";

const CheckIn = ({ setWalletBalance }) => {
  const [message, setMessage] = useState("");
  const [buttonEnabled, setButtonEnabled] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("site");
    axios
      .get(`https://rajjiowin-backend.vercel.app/${userId}/check-in-status`)
      .then((response) => {
        if (response.data.checkInStatus) {
          setButtonEnabled(true);
        } else {
          setButtonEnabled(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching check-in status:", error);
      });
  }, [setButtonEnabled]); // Add setButtonEnabled as a dependency

  const handleCheckIn = async () => {
    const userId = localStorage.getItem("site");
    try {
      const response = await axios.post(
        `https://rajjiowin-backend.vercel.app/check-in/${userId}`,
        {}
      );
      const data = response.data;

      if (data.message.includes("check-in complete")) {
        setMessage("Checked in successfully!");
        setWalletBalance(data.walletBalance);
        setButtonEnabled(true); // Re-enable button after successful check-in
        window.location.reload();
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Error during check-in. Please try again.");
    }
  };

  return (
    <div className="checkIn-container">
      <div className="check_title">
        <button
          onClick={handleCheckIn}
          className={`check_in_button ${
            buttonEnabled ? "default" : "disabled"
          }`}
          disabled={!buttonEnabled}
        >
          <span className="title_check">Check-in</span>
        </button>
        <span className="title_check2">Get rewards</span>
      </div>
      <div className="img_check">
        <img src={CheckInIcon} alt="checkIn-img" />
      </div>
      {message && <div className="popup">{message}</div>}
    </div>
  );
};

export default CheckIn;
