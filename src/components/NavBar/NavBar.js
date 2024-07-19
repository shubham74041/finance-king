import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // Import your CSS file for NavBar styling
import walletIcon from "../icons/wallet.png";
import withdrawalIcon from "../icons/withdrawalIcon.png";
import rechargeIcon from "../icons/money-withdrawal.png";
import referralIcon from "../icons/affiliate.png";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
      <li className="navbar-item">
          <Link to="/Wallet" className="navbar-link">
            <div className="navbar-icon-container">
              <img src={walletIcon} alt="Wallet" className="navbar-icon" />
              <span className="icon-name">Wallet</span>
            </div>
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/withdrawal" className="navbar-link">
            <div className="navbar-icon-container">
              <img src={withdrawalIcon} alt="Withdrawal" className="navbar-icon" />
              <span className="icon-name">Withdrawal</span>
            </div>
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/recharge" className="navbar-link">
            <div className="navbar-icon-container">
              <img src={rechargeIcon} alt="Recharge" className="navbar-icon" />
              <span className="icon-name">Recharge</span>
            </div>
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/referral" className="navbar-link">
            <div className="navbar-icon-container">
              <img src={referralIcon} alt="Referral" className="navbar-icon" />
              <span className="icon-name">Referral</span>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
