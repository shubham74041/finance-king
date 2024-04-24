import React, { useState } from "react";
import { connect } from "react-redux";
import { addCard } from "../../redux/actions";
import "./AdminPage.css";

const AdminPage = ({ addCard }) => {
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

  return (
    <div className="container">
      <h2>Admin Page</h2>
      <div className="input-group">
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
    </div>
  );
};

export default connect(null, { addCard })(AdminPage);