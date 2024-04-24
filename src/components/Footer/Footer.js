import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"; // Import your CSS file for Footer styling
import logoutIcon from "../icons/logout.svg";
import contactIcon from "../icons/contact.svg";
import productIcon from "../icons/product.svg";
import userIcon from "../icons/user.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="footer-list">
        <li className="footer-item">
          <Link to="/logout" className="footer-link">
            <img src={logoutIcon} alt="Logout" className="footer-icon" />
          </Link>
        </li>
        <li className="footer-item">
          <Link to="/contact" className="footer-link">
            <img src={contactIcon} alt="Contact" className="footer-icon" />
          </Link>
        </li>
        <li className="footer-item">
          <Link to="/product-details" className="footer-link">
            <img
              src={productIcon}
              alt="Product Details"
              className="footer-icon"
            />
          </Link>
        </li>
        <li className="footer-item">
          <Link to="/total-amount" className="footer-link">
            <img src={userIcon} alt="User Profile" className="footer-icon" />
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
