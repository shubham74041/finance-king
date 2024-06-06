import React, { useState } from "react";
import { connect } from "react-redux";
import { addCard } from "../../redux/actions";
import "./AdminPage.css";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPage = ({ addCard }) => {
  const navigate = useNavigate();
  // const [newCardData, setNewCardData] = useState({
  //   timestamp: "",
  //   amount: "",
  //   imagePath: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewCardData({ ...newCardData, [name]: value });
  // };

  // const handleAddCard = () => {
  //   addCard(newCardData);
  //   setNewCardData({ timestamp: "", amount: "", imagePath: "" });
  // };

  const handleAddCard = () => {
    navigate("/new-product");
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

  const handleMessage = () => {
    navigate("/messages");
  };

  return (
    <div className="admin_container">
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
        <button className="admin_button" onClick={handleRechargeData}>
          Show Recharge Data
        </button>
      </div>

      <div>
        <button className="admin_button" onClick={handleWithdrawData}>
          Show Withdraw Data
        </button>
      </div>
      <div>
        <button className="admin_button" onClick={handleCustomPopup}>
          Add Custom Popup
        </button>
      </div>
      <div>
        <button className="admin_button" onClick={handleUser}>
          Referral Details Page
        </button>
      </div>
      <div>
        <button className="admin_button" onClick={handleReferral}>
          View Users Details
        </button>
      </div>
      <div>
        <button className="admin_button" onClick={handleMessage}>
          View Users Messages
        </button>
      </div>
      <div>
        <button className="admin_button" onClick={handleAddCard}>
          Add New Product
        </button>
      </div>
    </div>
  );
};

export default connect(null, { addCard })(AdminPage);
