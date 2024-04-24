import React from "react";
import { useNavigate } from "react-router-dom";
import "./TotalAmountPage.css";

const TotalAmountPage = () => {
  const navigate = useNavigate();
  const handleAddMoney = () => {
    navigate("/recharge");
  };
  const handleWithdraw = () => {
    navigate("/withdrawal");
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
        <div>
          <p>&#8377; 0</p>
          <p>Total balance</p>
        </div>
        <div>
          <p>&#8377; 0</p>
          <p>Income</p>
        </div>
        <div>
          <p>&#8377; 0</p>
          <p>Recharge</p>
        </div>
      </div>

      <div className="button-container">
        <button onClick={handleAddMoney}>Recharge</button>
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
      <div className="additional-links">
        <div>
          <p>Company</p>
        </div>

        <div>
          <p>Record</p>
        </div>

        <div>
          <p>My Orders</p>
        </div>

        <div>
          <p>Recharge History</p>
        </div>

        <div>
          <p>Change Password</p>
        </div>

        <div>
          <p>Logout</p>
        </div>
      </div>
      {/* Add content specific to total amount page */}
    </div>
  );
};

export default TotalAmountPage;
