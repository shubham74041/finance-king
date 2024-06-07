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
          {/* Form elements */}
          {/* ... */}
          <button type="submit">Withdraw</button>
        </form>

        {/* Popup */}
        {showPopup && (
          <CustomAlert
            message="Money will be sent to your account in 24 hours."
            onClose={closePopup}
          />
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
