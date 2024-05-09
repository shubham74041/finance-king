import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"; // Import your CSS file for Footer styling

import contactIcon from "../icons/contact.png";
// import productIcon from "../icons/product.png";
import referralIcon from "../icons/affiliate.png";
import userIcon from "../icons/user.png";
import homeIcon from "../icons/home-icon.png";

const Footer = () => {
  return (
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

        {/* <li className="footer-item">
          <Link to="/product-details" className="footer-link">
            <div className="footer-icon-container">
              <img
                src={productIcon}
                alt="Product Details"
                className="footer-icon"
              />
              <span className="icon-name">Product</span>
            </div>
          </Link>
        </li> */}

        <li className="footer-item">
          <Link to="/referral" className="footer-link">
            <div className="footer-icon-container">
              <img src={referralIcon} alt="Referral" className="footer-icon" />
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
              <img src={userIcon} alt="User Profile" className="footer-icon" />
              <span className="icon-name">Profile</span>
            </div>
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
