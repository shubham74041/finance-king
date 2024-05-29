import React, { useState } from "react";
import { connect } from "react-redux";
import { addCard } from "../../redux/actions";
import "./AdminPage.css";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPage = ({ addCard }) => {
  const navigate = useNavigate();
  const [newCardData, setNewCardData] = useState({
    timestamp: "",
    amount: "",
    imagePath: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCardData({ ...newCardData, [name]: value });
  };

  const handleAddCard = () => {
    addCard(newCardData);
    setNewCardData({ timestamp: "", amount: "", imagePath: "" });
  };

  const handleRechargeData = () => {
    navigate("/recharge-data");
  };

  const handleWithdrawData = () => {
    navigate("/withdraw-data");
  };
  const handleCustomPopup = () => {
    navigate("/custom-popup");
  };
  const handleUser = () => {
    navigate("/users");
  };

  const handleReferral = () => {
    navigate("/details-referral");
  };

  return (
    <div className="container">
      <h2>Admin Page</h2>
      {/* <div className="input-group">
        <label htmlFor="timestamp">Timestamp:</label>
        <input
          type="text"
          id="timestamp"
          name="timestamp"
          value={newCardData.timestamp}
          onChange={handleChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="amount">Amount:</label>
        <input
          type="text"
          id="amount"
          name="amount"
          value={newCardData.amount}
          onChange={handleChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="imagePath">Image Path:</label>
        <input
          type="text"
          id="imagePath"
          name="imagePath"
          value={newCardData.imagePath}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleAddCard}>Add Card</button>
      {/* Data Showing */}
      <div>
        <button onClick={handleRechargeData}>Show Recharge Data</button>
      </div>

      <div>
        <button onClick={handleWithdrawData}>Show Withdraw Data</button>
      </div>
      <div>
        <button onClick={handleCustomPopup}>Add Custom Popup</button>
      </div>
      <div>
        <button onClick={handleUser}>Referral Details Page</button>
      </div>
      <div>
        <button onClick={handleReferral}>View User Details</button>
      </div>
    </div>
  );
};

export default connect(null, { addCard })(AdminPage);
