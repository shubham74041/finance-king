import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReferralPage.css";
import { useNavigate } from "react-router-dom";

const ReferralPage = () => {
  const navigate = useNavigate();
  const [referralCode, setReferralCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [referralData, setReferralData] = useState({
    count: "",
    totalReferralAmount: "",
    lastAmount: "",
  });

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

      // Then, make a GET request
      const getResponse = await axios.get(
        `https://rajjiowin-backend.vercel.app/referral/${userId}`
      );
      console.log(getResponse.data);
      setReferralData(getResponse.data); // Assuming the API returns an array with a single object
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
    const referralLink = `https://finance-king-pi.vercel.app/signup?referralCode=${referralCode}`; // Updated with the correct query parameter name
    const message = `Join me on this awesome platform using my referral code ${referralCode}! ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
  };

  const handleSendTelegram = () => {
    const referralLink = `https://finance-king-pi.vercel.app/signup?referralCode=${referralCode}`; // Updated with the correct query parameter name
    const message = `Join me on this awesome platform using my referral code ${referralCode}! ${referralLink}`;
    window.open(
      `https://telegram.me/share/url?url=${encodeURIComponent(
        referralLink
      )}&text=${encodeURIComponent(message)}`
    );
  };

  // const handlePromotion = () => {
  //   navigate("/promotion-tasks");
  // };

  return (
    <div className="referral-page">
      <h2>Your Referral Code</h2>
      {errorMessage ? (
        <p className="error-message">{errorMessage}</p>
      ) : (
        referralCode && (
          <div className="referral-container">
            <p className="code">{referralCode}</p>
            <button className="copy" onClick={handleCopy}>
              Copy Code
            </button>
            <button className="whatsapp" onClick={handleSendWhatsApp}>
              Share on WhatsApp
            </button>
            <button className="telegram" onClick={handleSendTelegram}>
              Share on Telegram
            </button>
          </div>
        )
      )}
      {referralData && (
        <div className="referral-data">
          <div className="data-item">
            <h3 className="data-title">Total Referrals</h3>
            <p className="data">{referralData.count}</p>
          </div>
          <div className="data-item">
            <h3 className="data-title">Total Referral Amount</h3>
            <p className="data">{referralData.totalReferralAmount}</p>
          </div>
          <div className="data-item">
            <h3 className="data-title">Last Referral Amount</h3>
            <p className="data">{referralData.newAmount}</p>
          </div>
        </div>
      )}
      {/* 
      <div>
        <button onClick={handlePromotion}>Promotion Rewards</button>
      </div> */}
    </div>
  );
};

export default ReferralPage;
