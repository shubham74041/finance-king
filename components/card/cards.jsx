import React from 'react';
import './Card.css'; // Import CSS file for styling

const Card = ({ userData }) => {
  console.log(userData);
  const { userId, balance } = userData; // Destructure user data

  return (
    <div className="card">
      <div className="card-content">
        <div className="info">
          <p className="label">User Id</p>
          <p className="value">{userId}</p>
        </div>
        <div className="info">
          <p className="label">Balance</p>
          <p className="value">&#8377; {balance}</p>
        </div>
        <button className="action-btn withdraw">Withdraw</button>
        <button className="action-btn recharge">Recharge</button>
      </div>
    </div>
  );
};

export default Card;
