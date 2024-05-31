import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserDetails.css"; // Import the CSS file

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("site");
    if (id) {
      axios
        .get(`https://rajjiowin-backend.vercel.app/users/${id}`)
        .then((response) => {
          console.log("API response:", response.data);
          if (Array.isArray(response.data)) {
            setUsers(response.data);
          } else {
            console.error("Unexpected response data format:", response.data);
            setUsers([]);
          }
        })
        .catch((error) => {
          console.error("There was an error fetching the user data!", error);
          setUsers([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.error("No site ID found in local storage");
      setLoading(false);
    }
  }, []);

  const handleAddAmount = (userId, amount) => {
    axios
      .post(`https://rajjiowin-backend.vercel.app/users/${userId}`, { amount })
      .then((response) => {
        console.log("API response:", response.data);
        alert(response.data.resMsg);
      })
      .catch((error) => {
        console.error("Error adding amount:", error);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.referralId &&
        user.referralId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container">
      <h1 className="title">User Details</h1>
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
        <table className="user-table">
          <thead>
            <tr>
              <th className="table-header">User ID</th>
              <th className="table-header">Password</th>
              <th className="table-header">Referral ID</th>
              <th className="table-header">Add Amount</th>
              <th className="table-header">Referral Count</th>
              <th className="table-header">Referral Used</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.userPassword}</td>
                  <td>{user.referralId || "No referral ID"}</td>
                  <td>
                    <input
                      className="amount-input"
                      id={`amount-${user.userId}`}
                      type="number"
                      placeholder="Enter amount"
                    />
                    <button
                      className="add-amount-button"
                      onClick={() => {
                        const amount = parseInt(
                          document.getElementById(`amount-${user.userId}`).value
                        );
                        console.log(amount);
                        if (!isNaN(amount)) {
                          handleAddAmount(user.userId, amount);
                        }
                      }}
                    >
                      Add Amount
                    </button>
                  </td>
                  <td>{user.referralCount || 0}</td>
                  <td>
                    Used Referral Code: {user.usedReferralCode || "None"}{" "}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserDetails;
