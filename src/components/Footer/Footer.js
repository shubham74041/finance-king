// src/Footer.js
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Popup from "../PopUp/Popup";
import "./Footer.css"; // Import your CSS file for Footer styling

import contactIcon from "../icons/contact.png";
import referralIcon from "../icons/affiliate.png";
import userIcon from "../icons/user.png";
import homeIcon from "../icons/home-icon.png";

const Footer = () => {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  const hideFooterRoutes = ["/login", "/signup"];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  useEffect(() => {
    if (location.pathname === "/") {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [location.pathname]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return !shouldHideFooter ? (
    <>
      <footer className="footer">
        <ul className="footer-list">
          <li className="footer-item">
            <Link to="/" className="footer-link">
              <div className="footer-icon-container">
                <img src={homeIcon} alt="Home" className="footer-icon" />
                <span className="icon-name">Home</span>
              </div>
            </Link>
          </li>
          <li className="footer-item">
            <Link to="/referral" className="footer-link">
              <div className="footer-icon-container">
                <img
                  src={referralIcon}
                  alt="Referral"
                  className="footer-icon"
                />
                <span className="icon-name">Referral</span>
              </div>
            </Link>
          </li>
          <li className="footer-item">
            <Link to="/contact" className="footer-link">
              <div className="footer-icon-container">
                <img src={contactIcon} alt="Contact" className="footer-icon" />
                <span className="icon-name">Contact</span>
              </div>
            </Link>
          </li>
          <li className="footer-item">
            <Link to="/total-amount" className="footer-link">
              <div className="footer-icon-container">
                <img
                  src={userIcon}
                  alt="User Profile"
                  className="footer-icon"
                />
                <span className="icon-name">Profile</span>
              </div>
            </Link>
          </li>
        </ul>
      </footer>
      <Popup show={showPopup} onClose={handleClosePopup} />
    </>
  ) : null;
};

export default Footer;
