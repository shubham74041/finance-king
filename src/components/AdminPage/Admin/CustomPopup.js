// src/PopupForm.js
import React, { useState } from "react";
import axios from "axios";
import "./CustomPopup.css"; // Import the CSS file

const CustomPopup = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to be sent to the backend
    const data = { title, message };

    try {
      // Make the API call using axios
      const response = await axios.post(
        "https://rajjiowin-backend.vercel.app/custom-popup",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Optionally handle the response data
      console.log("Success:", response.data);

      // Clear the form fields after submission
      setTitle("");
      setMessage("");
    } catch (error) {
      console.error("Error:", error);
      // Handle error appropriately in the UI
      alert("Failed to save data. Please try again.");
    }
  };

  return (
    <div className="popup-container">
      <form className="popup-form">
        <h3>Custom Popup</h3>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5} // Set the number of visible rows
          />
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default CustomPopup;
