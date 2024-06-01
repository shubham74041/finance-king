import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DetailReferral.css";

const DetailReferral = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

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

  const filteredReferrals = referrals.filter(
    (referral) =>
      referral.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.referralId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="detail-referral-container">
      <h1>Referral Details</h1>
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No referrals found</td>
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
