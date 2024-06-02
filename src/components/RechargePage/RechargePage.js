import React, { useState } from "react";
import "./RechargePage.css"; // Import CSS file for styling
import axios from "axios";

const RechargePage = () => {
  const [amount, setAmount] = useState(""); // State to hold the input amount
  const [suggestions] = useState(["100", "500", "1000"]); // Array of suggestion amounts

  // Function to handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setAmount(suggestion);
  };

  // Function to handle submission
  const handleSubmit = () => {
    const phoneNumber = localStorage.getItem("site"); // Retrieve the value from localStorage
    // You can replace the placeholder with your actual backend endpoint
    axios
      .post("https://rajjiowin-backend.vercel.app/recharge", {
        // Data to send to the backend
        amount,
        phoneNumber,
      })
      .then((response) => {
        // Handle success
        console.log("Response:", response);
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });

    // Construct the Telegram link with the amount
    const telegramLink = `https://tttttt.me/rajjowinrecharge${amount}`;

    // You can use fetch or any other method to send the amount to the backend
    // Here, I'm just logging it for demonstration
    console.log("Amount sent to backend:", amount);

    // Redirect the user to the Telegram link
    window.location.href = telegramLink;
  };

  return (
    <div className="recharge-container">
      <h2 className="recharge-heading">Recharge Page</h2>
      <div className="input-container">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="amount-input"
        />
        <div className="suggestions">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-box"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
        <button onClick={handleSubmit} className="submit-button">
          Submit
        </button>
      </div>
    </div>
  );
};

export default RechargePage;
