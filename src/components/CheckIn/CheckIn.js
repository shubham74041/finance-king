import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CheckIn.css";
import CheckInIcon from "../icons/icons8-entrance-100.png";

const CheckIn = ({ enabled, setEnabled, setWalletBalance }) => {
  const [message, setMessage] = useState("");
  const [buttonColor, setButtonColor] = useState("default");

  useEffect(() => {
    const lastCheckInDate = localStorage.getItem("lastCheckInDate");
    const allowSecondCheckIn = localStorage.getItem("allowSecondCheckIn");
    const today = new Date().toISOString().split("T")[0];

    if (lastCheckInDate === today && !allowSecondCheckIn) {
      setEnabled(false);
      setButtonColor("checked-in");
    } else {
      setEnabled(true);
      setButtonColor("default");
    }
  }, [setEnabled]);

  const handleCheckIn = async () => {
    const id = localStorage.getItem("site");
    try {
      const response = await axios.post(
        `https://rajjiowin-backend.vercel.app/check-in/${id}`,
        {}
      );
      const data = response.data;

      console.log("Check-in response data:", data); // Log response data

      if (data.message === "Check-in complete") {
        setMessage("Checked in successfully!");
        setButtonColor("checked-in");
        setEnabled(false);
        setWalletBalance(data.walletBalance);

        const today = new Date().toISOString().split("T")[0];
        localStorage.setItem("lastCheckInDate", today);
        localStorage.removeItem("allowSecondCheckIn");

        // Reload the page after successful check-in
        window.location.reload();
      } else if (
        data.message === "Already checked in today" &&
        !data.hasProducts
      ) {
        setMessage(data.message);
        setWalletBalance(data.walletBalance);
      } else if (
        data.message === "Already checked in today" &&
        data.hasProducts
      ) {
        setMessage("");
        setButtonColor("checked-in");
        setEnabled(false);
        setWalletBalance(data.walletBalance);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error during check-in:", error); // Log the error
      setMessage("Error during check-in. Please try again.");
    }
  };

  return (
    <div className="checkIn-container">
      <div className="check_title">
        <button
          onClick={handleCheckIn}
          className={`check_in_button ${buttonColor}`}
          disabled={!enabled}
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
