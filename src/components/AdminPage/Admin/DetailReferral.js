import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DetailReferral.css";

const DetailReferral = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    const id = localStorage.getItem("site");
    fetchData(id, page, limit);
  }, [page]);

  const fetchData = (id, page, limit) => {
    axios
      .get(
        `https://rajjiowin-backend.vercel.app/details-referral/${id}?page=${page}&limit=${limit}`
      )
      .then((response) => {
        console.log("API response:", response.data);
        if (Array.isArray(response.data)) {
          setReferrals(response.data);
          setTotalPages(Math.ceil(response.data.length / limit)); // Adjust this as per your backend response
        } else {
          console.error("Unexpected response data format:", response.data);
          setReferrals([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching referral details:", error);
        setReferrals([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredReferrals = referrals.filter(
    (referral) =>
      referral.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.referralId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

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
                    <td>{(page - 1) * limit + index + 1}</td>
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
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={page === 1}>
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={page === totalPages}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailReferral;
