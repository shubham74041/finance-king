import React from "react";
import "./ReferralPage.css"; // Import your CSS file for styling
import { useNavigate } from "react-router-dom";

const ReferralPage = () => {
  const navigate = useNavigate();
  const referralCode = "YOUR_REFERRAL_CODE"; // Replace with your actual referral code

  const handleSendWhatsApp = () => {
    const referralLink = `http://example.com/referral/${referralCode}`; // Replace with your actual referral link
    const message = `Join me on this awesome platform using my referral code ${referralCode}! ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
  };

  const handleSendTelegram = () => {
    const referralLink = `http://example.com/referral/${referralCode}`; // Replace with your actual referral link
    const message = `Join me on this awesome platform using my referral code ${referralCode}! ${referralLink}`;
    window.open(
      `https://telegram.me/share/url?url=${encodeURIComponent(message)}`
    );
  };

  const handlePromotion = () => {
    navigate("/promotion-tasks");
  };

  return (
    <div className="referral-container">
      <h2 className="referral-title">Referral Page</h2>
      <p>Your referral code: {referralCode}</p>
      <button onClick={handleSendWhatsApp}>Send referral via WhatsApp</button>
      <button onClick={handleSendTelegram}>Send referral via Telegram</button>
      <div>
        <button onClick={handlePromotion}>Promotion Rewards</button>
      </div>
    </div>
  );
};

export default ReferralPage;
