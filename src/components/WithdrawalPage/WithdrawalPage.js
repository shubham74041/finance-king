// WithdrawalPage.js
import React, { useState } from 'react';
import './WithdrawalPage.css'; // Import CSS file for styling

function WithdrawalPage() {
    const [withdrawalAmount, setWithdrawalAmount] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountHolderName, setAccountHolderName] = useState('');
    const [ifscCode, setIFSCCode] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [bankAddress, setBankAddress] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [formErrors, setFormErrors] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Validate form
        const errors = [];
        if (!withdrawalAmount || !bankName || !accountNumber || !accountHolderName || !ifscCode || !mobileNumber || !bankAddress) {
            errors.push('Please fill out all fields.');
        }
        if (errors.length > 0) {
            setFormErrors(errors);
        } else {
            // Add logic for money withdrawal
            console.log('Withdrawal Amount:', withdrawalAmount);
            console.log('Bank Name:', bankName);
            console.log('Account Number:', accountNumber);
            console.log('Account Holder Name:', accountHolderName);
            console.log('IFSC Code:', ifscCode);
            console.log('Mobile Number:', mobileNumber);
            console.log('Bank Address:', bankAddress);
            // Show popup
            setShowPopup(true);
            // Clear form
            setWithdrawalAmount('');
            setBankName('');
            setAccountNumber('');
            setAccountHolderName('');
            setIFSCCode('');
            setMobileNumber('');
            setBankAddress('');
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="container">
            <h1>Money Withdrawal</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="withdrawalAmount">Withdrawal Amount:</label>
                    <input type="text" id="withdrawalAmount" value={withdrawalAmount} onChange={(e) => setWithdrawalAmount(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="bankName">Bank Name:</label>
                    <input type="text" id="bankName" value={bankName} onChange={(e) => setBankName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="accountNumber">Account Number:</label>
                    <input type="text" id="accountNumber" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="accountHolderName">Account Holder Name:</label>
                    <input type="text" id="accountHolderName" value={accountHolderName} onChange={(e) => setAccountHolderName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="ifscCode">IFSC Code:</label>
                    <input type="text" id="ifscCode" value={ifscCode} onChange={(e) => setIFSCCode(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="mobileNumber">Mobile Number:</label>
                    <input type="text" id="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="bankAddress">Bank Address:</label>
                    <textarea id="bankAddress" value={bankAddress} onChange={(e) => setBankAddress(e.target.value)} required></textarea>
                </div>
                <button type="submit">Withdraw</button>
            </form>

            {/* Popup */}
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={closePopup}>&times;</span>
                        <p>Money will be sent to your account in 24 hours.</p>
                    </div>
                </div>
            )}

            {/* Form errors */}
            {formErrors.length > 0 && (
                <div className="error">
                    {formErrors.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WithdrawalPage;
