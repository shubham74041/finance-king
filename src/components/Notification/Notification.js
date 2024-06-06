import React, { useState } from "react";
import "./Notification.css";

const Notification = ({ message, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose(); // Call the onClose callback passed from the parent component
    window.location.reload(); // Reload the window after closing the notification
  };

  return (
    isOpen && (
      <div className="notification">
        <div className="notification-content">
          <p>{message}</p>
          <button className="close-btn" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default Notification;
