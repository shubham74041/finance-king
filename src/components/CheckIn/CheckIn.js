import React, { useState } from "react";
import axios from "axios";
import "./CheckIn.css";
import CheckInIcon from "../icons/icons8-entrance-100.png";

const CheckIn = () => {
  const [message, setMessage] = useState("");
  const [buttonColor, setButtonColor] = useState("default"); // default or checked-in

  const handleCheckIn = async () => {
    const id = localStorage.getItem("site");
    try {
      console.log("Request payload:", { userId: id }); // Log the request payload
      const response = await axios.post("http://localhost:8080/order", {
        userId: id,
      });

      const data = response.data;

      if (data.hasProducts) {
        setButtonColor("checked-in");
        setMessage("Today check-in complete");
      } else {
        setButtonColor("default");
        setMessage("You don't have any products");
      }
    } catch (error) {
      console.error("Error during check-in:", error);
      setMessage("An error occurred during check-in. Please try again later.");
    }
  };

  return (
    <div className="checkIn-container">
      <div className="check_title">
        <button
          onClick={handleCheckIn}
          className={`check_in_button ${buttonColor}`}
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
