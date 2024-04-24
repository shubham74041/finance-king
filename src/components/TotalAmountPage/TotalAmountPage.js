import React from "react";
import { useNavigate } from "react-router-dom";

const TotalAmountPage = () => {
  const navigate = useNavigate();
  const handleAddMoney = () => {
    navigate("/recharge");
  };
  const handleWithdraw = () => {
    navigate("/withdrawal");
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "60px" }}>
        Total Amount Page
      </h2>
      <div>
        <div>
          <h4>UserId:</h4>
          <p>9996986494</p>
        </div>
        <div>
          <h4>Amount:</h4>
        </div>
        <p>Rs 10000</p>
      </div>
      <button onClick={handleAddMoney}>Add Money</button>
      <button onClick={handleWithdraw}>Withdraw</button>
      {/* Add content specific to total amount page */}
    </div>
  );
};

export default TotalAmountPage;
