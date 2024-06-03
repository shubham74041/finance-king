import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CheckIn.css";
import CheckInIcon from "../icons/icons8-entrance-100.png";

const CheckIn = ({ enabled, setEnabled }) => {
  const [message, setMessage] = useState("");
  const [buttonColor, setButtonColor] = useState("default");

  useEffect(() => {
    const lastCheckIn = localStorage.getItem("lastCheckIn");
    const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

    // Set button color based on whether the user has already checked in today
    setButtonColor(lastCheckIn === today ? "checked-in" : "default");
  }, []);

  const handleCheckIn = async () => {
    if (buttonColor === "checked-in") {
      setMessage("You have already checked in today.");
      setTimeout(() => {
        setMessage("");
      }, 10000);
      return;
    }

    const userId = localStorage.getItem("site");
    const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

    try {
      console.log("Request payload:", { userId }); // Log the request payload
      const response = await axios.post(
        `https://rajjiowin-backend.vercel.app/check-in/${userId}`,
        {}
      );

      const data = response.data;

      if (data.hasProducts) {
        setButtonColor("checked-in");
        setMessage("Today's check-in is complete");
        localStorage.setItem("lastCheckIn", today);
        setEnabled(false); // Disable check-in button
      } else {
        setMessage("You don't have any products");
      }

      // Make the popup disappear after 10 seconds
      setTimeout(() => {
        setMessage("");
      }, 10000);
    } catch (error) {
      console.error("Error during check-in:", error);
      setMessage("An error occurred during check-in. Please try again later.");

      // Make the popup disappear after 10 seconds
      setTimeout(() => {
        setMessage("");
      }, 10000);
    }
  };

  return (
    <div className="checkIn-container">
      <div className="check_title">
        <button
          onClick={handleCheckIn}
          className={`check_in_button ${buttonColor}`}
          disabled={buttonColor === "checked-in"}
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
