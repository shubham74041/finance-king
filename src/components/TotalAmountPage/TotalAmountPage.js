// TotalAmountPage.js

import React from "react";
import { useNavigate } from "react-router-dom";
import "./TotalAmountPage.css";

const TotalAmountPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div className="total-amount-container">
      <h2 style={{ textAlign: "center", marginTop: "60px" }}>
        Total Amount Page
      </h2>
      <div className="user-info">
        <h4>UserId:</h4>
        <p>9996986494</p>
      </div>
      <div className="amount-details">
        {/* Amount details content */}
      </div>

      <div className="button-container">
        <button onClick={() => handleNavigate("/recharge")}>Recharge</button>
        <button onClick={() => handleNavigate("/withdrawal")}>Withdraw</button>
      </div>

      <div className="additional-links">
        <div>
          <button onClick={() => handleNavigate("/company")}>Company</button>
        </div>

        <div>
          <button onClick={() => handleNavigate("/record")}>Record</button>
        </div>

        <div>
          <button onClick={() => handleNavigate("/myorders")}>My Orders</button>
        </div>

        <div>
          <button onClick={() => handleNavigate("/rechargehistory")}>Recharge History</button>
        </div>

        <div>
          <button onClick={() => handleNavigate("/changepassword")}>Change Password</button>
        </div>

        <div>
          <button onClick={() => handleNavigate("/logout")}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default TotalAmountPage;
