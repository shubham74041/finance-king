import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomAlert from "./CustomAlert"; // Import CustomAlert component
import "./DetailReferral.css";

const DetailReferral = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("site");
    axios
      .get(`https://rajjiowin-backend.vercel.app/details-referral/${id}`)
      .then((response) => {
        console.log("API response:", response.data);
        if (Array.isArray(response.data)) {
          setReferrals(response.data);
        } else {
          console.error("Unexpected response data format:", response.data);
          setError("Unexpected response format");
        }
      })
      .catch((error) => {
        console.error("Error fetching referral details:", error);
        setError("Error fetching referral details");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (userId) => {
    // Send a request to delete the account
    axios
      .post(`https://rajjiowin-backend.vercel.app/delete-account/${userId}`)
      .then((response) => {
        // Handle success response
        setAlertMessage("Account deleted successfully");
        setShowAlert(true);
        // Refresh referral data after deletion
        refreshReferralData();
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
        setError("Error deleting account");
      });
  };

  const refreshReferralData = () => {
    // Refresh referral data after account deletion
    const id = localStorage.getItem("site");
    axios
      .get(`https://rajjiowin-backend.vercel.app/details-referral/${id}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setReferrals(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching referral details after deletion:", error);
      });
  };

  const filteredReferrals = referrals.filter(
    (referral) =>
      referral.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.referralId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="detail-referral-container">
      <h1 style={{ color: "Black" }}>Users Details</h1>
      <input
        type="text"
        placeholder="Search by User ID or Referral ID"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Serial No</th>
                <th>User ID</th>
                <th>Password</th>
                <th>Referral ID</th>
                <th>Order Details</th>
                <th>Delete Account</th>
              </tr>
            </thead>
            <tbody>
              {filteredReferrals.length > 0 ? (
                filteredReferrals.map((referral, index) => (
                  <tr key={referral.userId}>
                    <td>{index + 1}</td>
                    <td>{referral.userId}</td>
                    <td>{referral.userPassword}</td>
                    <td>{referral.referralId}</td>
                    <td>User Buy {referral.orderCount} Plans</td>
                    <td>
                      <button onClick={() => handleDelete(referral.userId)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No referrals found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {showAlert && (
        <CustomAlert message={alertMessage} onClose={handleCloseAlert} />
      )}
    </div>
  );
};

export default DetailReferral;
