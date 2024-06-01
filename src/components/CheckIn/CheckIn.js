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

    if (lastCheckIn === today) {
      setButtonColor("checked-in");
      setEnabled(false);
    } else {
      setButtonColor(enabled ? "default" : "disabled");
    }
  }, [enabled, setEnabled]);

  useEffect(() => {
    const checkNewDay = () => {
      const now = new Date();
      const nextCheckInTime = new Date();
      nextCheckInTime.setHours(0, 1, 0, 0); // Set next check-in time to 12:01 am

      if (now >= nextCheckInTime) {
        setEnabled(true); // Enable check-in button
      }
    };

    const intervalId = setInterval(checkNewDay, 60000); // Check every minute

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [setEnabled]);

  const handleCheckIn = async () => {
    const lastCheckIn = localStorage.getItem("lastCheckIn");
    const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

    if (lastCheckIn === today) {
      setMessage("You have already checked in today.");
      setTimeout(() => {
        setMessage("");
        window.location.reload(); // Reload the window after the message disappears
      }, 10000);
      return;
    }

    const id = localStorage.getItem("site");
    try {
      console.log("Request payload:", { userId: id }); // Log the request payload
      const response = await axios.post(
        `https://rajjiowin-backend.vercel.app/check-in/${id}`,
        {}
      );

      const data = response.data;

      if (data.hasProducts) {
        setButtonColor("checked-in");
        setMessage("Today check-in complete");
        localStorage.setItem("lastCheckIn", today);
        setEnabled(false); // Disable check-in button
      } else {
        setButtonColor("default");
        setMessage("You don't have any products");
      }
      // Make the popup disappear after 10 seconds
      setTimeout(() => {
        setMessage("");
        window.location.reload(); // Reload the window after the message disappears
      }, 10000);
    } catch (error) {
      console.error("Error during check-in:", error);
      setMessage("An error occurred during check-in. Please try again later.");
      setTimeout(() => {
        setMessage("");
        window.location.reload(); // Reload the window after the message disappears
      }, 10000);
    }
  };

  return (
    <div className="checkIn-container">
      <div className="check_title">
        <button
          onClick={handleCheckIn}
          className={`check_in_button ${buttonColor}`}
          disabled={!enabled || buttonColor === "checked-in"}
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
