import React, { useState } from "react";
import "./WithdrawalPage.css"; // Import CSS file for styling

function WithdrawalPage() {
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [ifscCode, setIFSCCode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [bankAddress, setBankAddress] = useState("");
  const [upiId, setUpiId] = useState(""); // State for UPI ID
  const [selectedMethod, setSelectedMethod] = useState("bank"); // State for selected withdrawal method
  const [showPopup, setShowPopup] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate form
    const errors = [];
    if (selectedMethod === "bank") {
      if (
        !withdrawalAmount ||
        !bankName ||
        !accountNumber ||
        !accountHolderName ||
        !ifscCode ||
        !mobileNumber ||
        !bankAddress
      ) {
        errors.push("Please fill out all fields.");
      }
    } else if (selectedMethod === "upi") {
      if (!withdrawalAmount || !upiId) {
        errors.push("Please fill out all fields.");
      }
    }
    if (errors.length > 0) {
      setFormErrors(errors);
    } else {
      // Add logic for money withdrawal
      console.log("Withdrawal Amount:", withdrawalAmount);
      if (selectedMethod === "bank") {
        console.log("Bank Name:", bankName);
        console.log("Account Number:", accountNumber);
        console.log("Account Holder Name:", accountHolderName);
        console.log("IFSC Code:", ifscCode);
        console.log("Mobile Number:", mobileNumber);
        console.log("Bank Address:", bankAddress);
      } else if (selectedMethod === "upi") {
        console.log("UPI ID:", upiId);
      }
      // Show popup
      setShowPopup(true);
      // Clear form
      setWithdrawalAmount("");
      setBankName("");
      setAccountNumber("");
      setAccountHolderName("");
      setIFSCCode("");
      setMobileNumber("");
      setBankAddress("");
      setUpiId("");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="main">
      <div className="container_withdrawal">
        {/* <span>Money Withdrawal</span> */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="withdrawalAmount">Withdrawal Amount:</label>
            <input
              type="text"
              id="withdrawalAmount"
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Withdrawal Method:</label>
            <div className="radio_checks">
              <label>
                <input
                  type="radio"
                  value="bank"
                  checked={selectedMethod === "bank"}
                  onChange={() => setSelectedMethod("bank")}
                />
                Bank Withdrawal
              </label>
              <label>
                <input
                  type="radio"
                  value="upi"
                  checked={selectedMethod === "upi"}
                  onChange={() => setSelectedMethod("upi")}
                />
                UPI Withdrawal
              </label>
            </div>
          </div>
          {selectedMethod === "bank" && (
            <>
              <div className="form-group">
                <label htmlFor="bankName">Bank Name:</label>
                <input
                  type="text"
                  id="bankName"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  required={selectedMethod === "bank"}
                />
              </div>
              {/* Other bank fields */}
              <div className="form-group">
                <label htmlFor="accountNumber">Account Number:</label>
                <input
                  type="text"
                  id="accountNumber"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="accountHolderName">Account Holder Name:</label>
                <input
                  type="text"
                  id="accountHolderName"
                  value={accountHolderName}
                  onChange={(e) => setAccountHolderName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="ifscCode">IFSC Code:</label>
                <input
                  type="text"
                  id="ifscCode"
                  value={ifscCode}
                  onChange={(e) => setIFSCCode(e.target.value)}
                  required
                />
              </div>

              {/* <div className="form-group">
              <label htmlFor="mobileNumber">Mobile Number:</label>
              <input
                type="text"
                id="mobileNumber"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div> */}
            </>
          )}
          {selectedMethod === "upi" && (
            <div className="form-group">
              <label htmlFor="upiId">UPI ID:</label>
              <input
                type="text"
                id="upiId"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                required={selectedMethod === "upi"}
              />
            </div>
          )}
          <button type="submit">Withdraw</button>
        </form>

        {/* Popup */}
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={closePopup}>
                &times;
              </span>
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
    </div>
  );
}

export default WithdrawalPage;
