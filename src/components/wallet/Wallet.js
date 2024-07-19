// Wallet.js

import React from "react";
import "./wallet.css";

const Wallet = () => {
    // Dummy total amount
    const totalAmount = "5000";

    return (
        <div className="wallet-container">
            <div className="wallet-content">
                <h2 className="wallet-heading">My Wallet</h2>
                <div className="wallet-info">
                    <p className="total-amount">Total Amount:</p>
                    <p className="amount-value">{totalAmount}</p>
                </div>
                <div className="wallet-actions">
                    {/* Add buttons or other actions here */}
                </div>
            </div>
        </div>
    );
}

export default Wallet;
