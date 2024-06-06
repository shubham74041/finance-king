// CustomAlert.js
import React from "react";
import "./CustomAlert.css";

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className="custom-alert-overlay">
      <div className="custom-alert-box">
        <p>{message}</p>
        <button onClick={onClose} className="custom-alert-button">
          OK
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
