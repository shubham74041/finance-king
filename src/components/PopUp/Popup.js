// Popup.js
import React from "react";

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <ul className="reward-list">
          <li>Invite 10 Valid members to get daily 100 Rs</li>
          <li>Invite 50 Valid members to get daily 1000 Rs</li>
          <li>Invite 100 Valid members to get daily 2200 Rs</li>
          <li>Invite 300 Valid members to get daily 7000 Rs</li>
        </ul>
        <p className="check-in-bonus">Daily Check-in Bonus: 10 Rs</p>
        {/* <p>{message}</p> */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
