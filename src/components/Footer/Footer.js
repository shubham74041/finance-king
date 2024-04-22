import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Import your CSS file for Footer styling

const Footer = () => {
    return (
        <footer className="footer">
            <ul className="footer-list">
                <li className="footer-item">
                    <Link to="/logout" className="footer-link">
                        <img src="icons/logout.svg" alt="Logout" className="footer-icon" />
                    </Link>
                </li>
                <li className="footer-item">
                    <Link to="/contact" className="footer-link">
                        <img src="icons/contact.svg" alt="Contact" className="footer-icon" />
                    </Link>
                </li>
                <li className="footer-item">
                    <Link to="/product-details" className="footer-link">
                        <img src="icons/product-details.svg" alt="Product Details" className="footer-icon" />
                    </Link>
                </li>
                <li className="footer-item">
                    <Link to="/total-amount" className="footer-link">
                        <img src="icons/total-amount.svg" alt="Total Amount" className="footer-icon" />
                    </Link>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;
