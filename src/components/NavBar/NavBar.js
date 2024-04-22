import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import your CSS file for NavBar styling

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/user-details" className="navbar-link">
                        <img src="icons/user.svg" alt="User Details" className="navbar-icon" />
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="/withdrawal" className="navbar-link">
                        <img src="icons/withdrawal.svg" alt="Withdrawal" className="navbar-icon" />
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="/recharge" className="navbar-link">
                        <img src="icons/recharge.svg" alt="Recharge" className="navbar-icon" />
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="/referral" className="navbar-link">
                        <img src="icons/referral.svg" alt="Referral" className="navbar-icon" />
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
