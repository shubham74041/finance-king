import React, { useState } from "react";
import axios from "axios";
import "./WithdrawalPage.css"; // Import CSS file for styling
import CustomAlert from "../AdminPage/Admin/CustomAlert"; // Import your CustomAlert component

function WithdrawalPage() {
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [ifscCode, setIFSCCode] = useState("");
  const [upiId, setUpiId] = useState(""); // State for UPI ID
  const [selectedMethod, setSelectedMethod] = useState("bank"); // State for selected withdrawal method
  const [showPopup, setShowPopup] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  const submitWithdrawal = async (data) => {
    const phoneNumber = localStorage.getItem("site");
    try {
      const response = await axios.post(
        `https://rajjiowin-backend.vercel.app/withdrawal/${phoneNumber}`,
        data
      );

      console.log("Success:", response.data.userId);

      // Show popup
      setShowPopup(true);
      // Clear form
      setWithdrawalAmount("");
      setBankName("");
      setAccountNumber("");
      setAccountHolderName("");
      setIFSCCode("");
      setUpiId("");
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate form
    const errors = [];

    // Check for minimum withdrawal amount
    if (Number(withdrawalAmount) < 150) {
      errors.push("The minimum withdrawal amount is 150.");
    }

    if (selectedMethod === "bank") {
      if (
        !withdrawalAmount ||
        !bankName ||
        !accountNumber ||
        !accountHolderName ||
        !ifscCode
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
      const formData = {
        withdrawalAmount,
        method: selectedMethod,
        ...(selectedMethod === "bank" && {
          bankName,
          accountNumber,
          accountHolderName,
          ifscCode,
        }),
        ...(selectedMethod === "upi" && {
          upiId,
        }),
      };

      // Send form data to backend
      submitWithdrawal(formData);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="main">
      <div className="container_withdrawal">
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

        <div className="info-box">
        <h4 style={{display:"flex",margin:0}}>Note:</h4>
          <ul>
            <li>Withdrawal available daily between 08:00 - 20:00</li>
            <li>Minimum amount to withdraw is only ₹150.</li>
            <li>Correctly fill in bank account information and IFSC code</li>
            <li>In some cases withdraw takes upto 24 hours to arrive. If you don't
              receive after 24 hours, contact our customer support.
            </li>
          </ul>
        </div>

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
