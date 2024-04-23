// GenericCard.js
import React from 'react';

const GenericCard = ({ timestamp, amount, imagePath }) => {
    console.log(timestamp, amount, imagePath);
    return (
        <div className="generic-card">
            <p>Timestamp: {timestamp}</p>
            <p>Amount: {amount}</p>
            <img src={imagePath} alt="Card" />
        </div>
    );
};

export default GenericCard;
