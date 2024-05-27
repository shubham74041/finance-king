import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CheckIn.css";
import CheckInIcon from "../icons/icons8-entrance-100.png";

const CheckIn = () => {
  const [message, setMessage] = useState("");
  const [buttonColor, setButtonColor] = useState("default"); // default or checked-in
  const [lastCheckInTime, setLastCheckInTime] = useState(null);

  useEffect(() => {
    const lastCheckIn = localStorage.getItem("lastCheckIn");
    if (lastCheckIn) {
      const lastCheckInTimestamp = parseInt(lastCheckIn);
      const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      if (Date.now() - lastCheckInTimestamp < twentyFourHours) {
        setButtonColor("checked-in");
      }
    }
  }, []);

  const handleCheckIn = async () => {
    const lastCheckIn = localStorage.getItem("lastCheckIn");
    const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (lastCheckIn && Date.now() - parseInt(lastCheckIn) < twentyFourHours) {
      setMessage("You have already checked in within the last 24 hours.");
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
        localStorage.setItem("lastCheckIn", Date.now());
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
