import React from "react";
import telegramIcon from "../icons/icons8-telegram-100.png";
import "./SupportPage.css";

const SupportPage = () => {
  return (
    <div className="support">
      <h3 className="support-heading">Support</h3>
      <p className="support-text">For support, contact us on Telegram:</p>
      <a
        href="https://t.me/Rajjowinhelp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="support-link">
          <img
            src={telegramIcon}
            alt="telegram"
            style={{
              width: "30px",
              height: "30px",
              marginRight: "5px",
              marginBottom: "5px",
            }}
          />
          <p className="support-link-text">Telegram</p>
        </div>
      </a>
    </div>
  );
};

export default SupportPage;
