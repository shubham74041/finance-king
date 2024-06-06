// src/Popup.js
import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./Popup.css";

const Popup = ({ onClose }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayDefault, setDisplayDefault] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://rajjiowin-backend.vercel.app/"
        );
        console.log("Response Data:", response.data);

        if (!Array.isArray(response.data) || response.data.length === 0) {
          setDisplayDefault(true);
          setLoading(false);
          return; // Exit early if response data is empty
        }

        const { title, message, timePeriod, createdAt } = response.data[0];

        // Log each part of the response to debug the issue
        // console.log("Title:", title);
        // console.log("Message:", message);
        // console.log("Time Period:", timePeriod);
        // console.log("Created At:", createdAt);

        if (!createdAt) {
          throw new Error("Missing Date field in the response");
        }

        // Convert createdAt to a Date object
        const creationDate = new Date(createdAt);
        if (isNaN(creationDate.getTime())) {
          throw new Error(`Invalid creation date format: ${createdAt}`);
        }

        const currentDate = new Date();
        const expirationDate = new Date(creationDate);
        expirationDate.setDate(creationDate.getDate() + Number(timePeriod));

        console.log("Creation Date:", creationDate);
        console.log("Current Date:", currentDate);
        console.log("Expiration Date:", expirationDate);

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

    fetchData();
  }, []);

  if (loading) {
    return <div className="popup">Loading...</div>;
  }

  if (error) {
    return <div className="popup">{error}</div>;
  }

  return (
    <div className="popup">
      <div className="popup-content">
        {displayDefault ? (
          <>
            <ul className="reward-list">
              <li>Invite 10 Valid members to get daily 100 Rs</li>
              <li>Invite 50 Valid members to get daily 1000 Rs</li>
              <li>Invite 100 Valid members to get daily 2200 Rs</li>
              <li>Invite 300 Valid members to get daily 7000 Rs</li>
            </ul>
            <p className="check-in-bonus">Daily Check-in Bonus: 10 Rs</p>
          </>
        ) : (
          <>
            <h3 className="popup-title">{data.title}</h3>
            <p className="popup-message">{data.message}</p>
          </>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
