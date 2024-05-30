import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReferralPage.css";
import { useNavigate } from "react-router-dom";

const ReferralPage = () => {
  const navigate = useNavigate();
  const [referralCode, setReferralCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const userId = localStorage.getItem("site"); // Replace this with the actual user ID

  const fetchReferralCode = async () => {
    try {
      const response = await axios.post(
        "https://rajjiowin-backend.vercel.app/referral",
        {
          userId,
        }
      );
      setReferralCode(response.data.referralCode);
      setErrorMessage(""); // Clear error message on success
    } catch (error) {
      setErrorMessage("Failed to fetch referral code. Please try again later.");
      setReferralCode(""); // Clear referral code on error
    }
  };

  useEffect(() => {
    fetchReferralCode();
  }, []); // Empty dependency array ensures this runs once on mount

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    alert("Referral code copied to clipboard!");
  };

  const handleSendWhatsApp = () => {
    const referralLink = `https://rajjiowin-backend.vercel.app/signup?referralCode=${referralCode}`; // Updated URL parameter to "referralCode"
    const message = `Join me on this awesome platform using my referral code ${referralCode}! ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
  };

  const handleSendTelegram = () => {
    const referralLink = `https://rajjiowin-backend.vercel.app/signup?referralCode=${referralCode}`; // Updated URL parameter to "referralCode"
    const message = `Join me on this awesome platform using my referral code ${referralCode}! ${referralLink}`;
    window.open(
      `https://telegram.me/share/url?url=${encodeURIComponent(
        referralLink
      )}&text=${encodeURIComponent(message)}`
    );
  };

  const handlePromotion = () => {
    navigate("/promotion-tasks");
  };

  return (
    <div className="referral-page">
      <h2>Your Referral Code</h2>
      {errorMessage ? (
        <p className="error-message">{errorMessage}</p>
      ) : (
        referralCode && (
          <div className="referral-container">
            <p>{referralCode}</p>
            <button onClick={handleCopy}>Copy Code</button>
            <button onClick={handleSendWhatsApp}>Share on WhatsApp</button>
            <button onClick={handleSendTelegram}>Share on Telegram</button>
          </div>
        )
      )}

      <div>
        <button onClick={handlePromotion}>Promotion Rewards</button>
      </div>
    </div>
  );
};

export default ReferralPage;
