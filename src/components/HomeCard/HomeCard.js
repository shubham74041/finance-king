// HomeCard.js

import React from "react";
import "./HomeCard.css";
import { Link } from "react-router-dom";

const HomeCard = ({ userId, balance }) => {
    // Dummy user ID and balance
    userId = userId || 327967881324531;
    balance = balance || 3000;
    return (
        <div className="home-card">
            <div className="user-info">
                <p>User ID: {userId}</p>
                <p>Balance: <i className="fa fa-inr" /> {balance}</p>
            </div>
            <div className="actions">
                <Link to="/withdrawal" className="navbar-link">
                    <button className="withdraw-btn">Withdraw</button>
                </Link>
                <Link to="/recharge" className="navbar-link">

                    <button className="recharge-btn">Recharge</button>
                </Link>
            </div>
        </div>
    );
}

export default HomeCard;
