import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // Import your CSS file for NavBar styling
import userIcon from "../icons/user.svg";
import withdrawalIcon from "../icons/referral.svg";

import rechargeIcon from "../icons/money-withdrawal.svg";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/user-details" className="navbar-link">
            <img src={userIcon} alt="User Details" className="navbar-icon" />
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/withdrawal" className="navbar-link">
            <img
              src={withdrawalIcon}
              alt="Withdrawal"
              className="navbar-icon"
            />
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/recharge" className="navbar-link">
            <img src={rechargeIcon} alt="Recharge" className="navbar-icon" />
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/referral" className="navbar-link">
            <img src="" alt="Referral" className="navbar-icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
