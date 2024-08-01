// HomeCard.js

import React, { useEffect, useState } from "react";
import "./HomeCard.css";
import { Link } from "react-router-dom";
import axios from "axios";

const HomeCard = ({ userId, balance }) => {
  const phoneNumber = localStorage.getItem("site");
  console.log("Phone Number: " + phoneNumber);

  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    const phoneNumber = localStorage.getItem("site");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://rajjowin.in/${phoneNumber}`
        );
        setWalletBalance(response.data.remainingBalance);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [walletBalance]);

  // Dummy user ID and balance
  userId = phoneNumber || 327967881324531;
  balance = walletBalance || 0;
  return (
    <div className="home-card">
      <div className="user-info">
        <p>User ID: {userId}</p>
        <p>
          Balance: <i className="fa fa-inr" /> {balance}
        </p>
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
};

export default HomeCard;
