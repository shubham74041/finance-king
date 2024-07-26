import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReferralPage.css";

import CustomAlert from "../AdminPage/Admin/CustomAlert"; // Import your CustomAlert component
import Navbar from "../Header/Header";

const ReferralPage = () => {
  const [referralCode, setReferralCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [referralData, setReferralData] = useState({
    count: "",
    totalReferralAmount: "",
    lastAmount: "",
  });
  const [showAlert, setShowAlert] = useState(false); // State to control CustomAlert visibility

  const userId = localStorage.getItem("site");

  const fetchReferralCode = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PATH_URL}/referral`,
        {
          userId,
        }
      );
      setReferralCode(response.data.referralCode);

      // Then, make a GET request
      const getResponse = await axios.get(
        `${process.env.REACT_APP_PATH_URL}/referral/${userId}`
      );
      console.log("Getting Data:", getResponse.data);
      setReferralData(getResponse.data); // Assuming the API returns an array with a single object
      setErrorMessage(""); // Clear error message on success
    } catch (error) {
      console.error(
        "Error fetching referral data:",
        error.response || error.message
      );
      setErrorMessage("Failed to fetch referral code. Please try again later.");
      setReferralCode(""); // Clear referral code on error
      setShowAlert(true); // Show CustomAlert on error
    }
  };

  useEffect(() => {
    fetchReferralCode();
  }, []); // Empty dependency array ensures this runs once on mount

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setShowAlert(true); // Show CustomAlert when code is copied
  };

  const handleSendWhatsApp = () => {
    const referralLink = `https://rajjiowin-backend.vercel.app/signup?referralCode=${referralCode}`; // Updated with the correct query parameter name
    const message = `Join me on this awesome platform using my referral code ${referralCode}! ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
  };

  const handleSendTelegram = () => {
    const referralLink = `https://rajjiowin-backend.vercel.app/signup?referralCode=${referralCode}`; // Updated with the correct query parameter name
    const message = `Join me on this awesome platform using my referral code ${referralCode}! ${referralLink}`;
    window.open(
      `https://telegram.me/share/url?url=${encodeURIComponent(
        referralLink
      )}&text=${encodeURIComponent(message)}`
    );
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  // const handlePromotion = () => {
  //   navigate("/promotion-tasks");
  // };

  return (
    <div className="referral-page">
      <Navbar />
      <h2>Your Referral Code</h2>
      {errorMessage ? (
        <CustomAlert message={errorMessage} onClose={handleCloseAlert} />
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
            <p className="data">{referralData.lastAmount}</p>
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
