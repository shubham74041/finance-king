import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "antd";
import CustomAlert from "./CustomAlert"; // Import CustomAlert component
import "./DetailReferral.css";

const DetailReferral = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchReferrals(currentPage, pageSize, searchTerm);
  }, [currentPage, pageSize, searchTerm]);

  const fetchReferrals = (page, size, search) => {
    setLoading(true);
    const id = localStorage.getItem("site") || 9876543210;
    axios
      .get(`${process.env.REACT_APP_PATH_URL}/details-referral/${id}`, {
        params: {
          page,
          size,
          search,
        },
      })
      .then((response) => {
        if (Array.isArray(response.data.referrals)) {
          setReferrals(response.data.referrals);
          setTotalItems(response.data.totalItems);
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
  };

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page on new search
  };

  const handleDelete = (userId) => {
    axios
      .post(`${process.env.REACT_APP_PATH_URL}/delete-account/${userId}`)
      .then((response) => {
        setAlertMessage("Account deleted successfully");
        setShowAlert(true);
        refreshReferralData();
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
        setError("Error deleting account");
      });
  };

  const refreshReferralData = () => {
    fetchReferrals(currentPage, pageSize, searchTerm);
  };

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
              {referrals.length > 0 ? (
                referrals.map((referral, index) => (
                  <tr key={referral.userId}>
                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
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
          <div className="pagination-container">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalItems}
              onChange={handlePageChange}
              showSizeChanger
            />
          </div>
        </div>
      )}
      {showAlert && (
        <CustomAlert message={alertMessage} onClose={handleCloseAlert} />
      )}
    </div>
  );
};

export default DetailReferral;
