import React, { useState } from "react";
import "./RechargePage.css"; // Import CSS file for styling
import axios from "axios";

const RechargePage = () => {
  const [amount, setAmount] = useState(""); // State to hold the input amount
  const [suggestions] = useState(["550", "2000", "5000"]); // Array of suggestion amounts

  const [suggestionsTwo] = useState(["15000", "40000", "50000"]); // Array of suggestion amounts

  // Function to handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setAmount(suggestion);
  };

  // Function to handle submission
  const handleSubmit = () => {
    const phoneNumber = localStorage.getItem("site"); // Retrieve the value from localStorage

    // You can replace the placeholder with your actual backend endpoint
    axios
      .post(`https://rajjowin.in/user-recharge`, {
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

    // Construct the Telegram link with the message
    const telegramMessage = `I want to recharge with amount ${amount}`;
    const telegramLink = `https://tttttt.me/rajjowinrecharge?text=${encodeURIComponent(
      telegramMessage
    )}`;
    // Log the amount sent to the backend
    console.log("Amount sent to backend:", amount);

    // Redirect the user to the Telegram link
    window.location.href = telegramLink;
  };

  return (
    <div className="recharge-container">
      <h2 className="recharge-heading">Add Amount</h2>
      <div className="input-container">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="amount-input"
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
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
          <div className="suggestions">
            {suggestionsTwo.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-box"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleSubmit} className="submit-button">
          Recharge
        </button>
      </div>
      <div className="info-box">
        <h4 style={{ display: "flex", margin: 0 }}>Note:</h4>
        <ul>
          <li>
            Confirm the recharge amount and fill in the UTR number correctly.
          </li>
          <li>
            Every time you recharge, you need to re-acquire the receiving
            account at the cashier.
          </li>
          <li>
            For recharge questions, please contact online customer service.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RechargePage;
