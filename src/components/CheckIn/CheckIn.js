import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CheckIn.css";
import CheckInIcon from "../icons/icons8-entrance-100.png";

const CheckIn = ({ setWalletBalance }) => {
  const [message, setMessage] = useState("");
  const [buttonEnabled, setButtonEnabled] = useState(false);

  const fetchCheckInStatus = async () => {
    const userId = localStorage.getItem("site");
    try {
      const response = await axios.get(
        `https://rajjiowin-backend.vercel.app/${userId}/check-in-status`
      );
      const { checkInStatus, lastCheckIn } = response.data;
      const today = new Date().toDateString();

      // Check if last check-in was on a different day
      if (today !== new Date(lastCheckIn).toDateString()) {
        setButtonEnabled(true);
      } else {
        setButtonEnabled(checkInStatus);
      }
    } catch (error) {
      console.error("Error fetching check-in status:", error);
    }
  };

  useEffect(() => {
    fetchCheckInStatus();

    // Polling mechanism to fetch check-in status every 10 seconds
    const intervalId = setInterval(fetchCheckInStatus, 2000); // Adjust the interval as needed

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

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
        setButtonEnabled(false); // Disable button after successful check-in
        // Notify other tabs or devices about the update
        localStorage.setItem("checkInUpdated", Date.now());
        localStorage.setItem("lastCheckIn", new Date().toISOString());
        window.location.reload();
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Error during check-in. Please try again.");
    }
  };

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "checkInUpdated") {
        fetchCheckInStatus();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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
