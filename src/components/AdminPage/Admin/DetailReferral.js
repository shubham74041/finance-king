import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DetailReferral.css"; // Import CSS file for styling

const DetailReferral = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

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
          setReferrals([]);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response data:", error.response.data);
          console.error("Error response status:", error.response.status);
          console.error("Error response headers:", error.response.headers);
        } else if (error.request) {
          console.error("Error request:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
        setReferrals([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="detail-referral-container">
      {" "}
      {/* Add a container class */}
      <h1>Referral Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-container">
          {" "}
          {/* Add a container for table */}
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Password</th>
                <th>Referral ID</th>
                <th>Order Details</th>
              </tr>
            </thead>
            <tbody>
              {referrals.length > 0 ? (
                referrals.map((referral) => (
                  <tr key={referral.userId}>
                    <td>{referral.userId}</td>
                    <td>{referral.userPassword}</td>
                    <td>{referral.referralId}</td>
                    <td>User Buy {referral.orderCount} Plans</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No referrals found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DetailReferral;
