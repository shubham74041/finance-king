// src/Popup.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Popup.css";

const Popup = ({ onClose, show }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayDefault, setDisplayDefault] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // change get url from https://rajjowin.in/ => https://rajjowin.in/popup
        const response = await axios.get(`https://rajjowin.in/`);
        console.log("Response Data:", response.data);

        if (!Array.isArray(response.data) || response.data.length === 0) {
          setDisplayDefault(true);
          setLoading(false);
          return; // Exit early if response data is empty
        }

        const { title, message, timePeriod, createdAt } = response.data[0];

        if (!createdAt) {
          throw new Error("Missing Date field in the response");
        }

        const creationDate = new Date(createdAt);
        if (isNaN(creationDate.getTime())) {
          throw new Error(`Invalid creation date format: ${createdAt}`);
        }

        const currentDate = new Date();
        const expirationDate = new Date(creationDate);
        expirationDate.setDate(creationDate.getDate() + Number(timePeriod));

        if (currentDate > expirationDate) {
          setDisplayDefault(true);
        } else {
          setData({ title, message });
          setDisplayDefault(false);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(`Failed to fetch data. Please try again. ${error.message}`);
        setLoading(false);
      }
    };

    if (show) {
      fetchData();
    }
  }, [show]);

  if (!show) {
    return null;
  }

  if (loading) {
    return <div className="popup">Loading...</div>;
  }

  if (error) {
    return <div className="popup">{error}</div>;
  }

  return (
    <div className="custom-popup">
      <div className="popup-content">
        {displayDefault ? (
          <>
            <h3 className="popup-title">Notice!</h3>

            <p className="popup-message">
              Welcome to Rajjowin Join the official Telegram channel to get the
              latest news. Minimum recharge = 550 Rs Minimum withdrawal = 150 Rs
              Daily Income Daily Withdrawal Invitation commission 20%. Any Help
              please contact online customer service.
            </p>
          </>
        ) : (
          <>
            <h3 className="popup-title">{data.title}</h3>
            <p className="popup-message">{data.message}</p>
          </>
        )}
        <button className="popup-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
