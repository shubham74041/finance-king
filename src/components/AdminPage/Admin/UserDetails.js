import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserDetails.css"; // Import the CSS file
import Notification from "../../Notification/Notification.js";

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);
  const [passwords, setPasswords] = useState({}); // State to manage password inputs

  useEffect(() => {
    const id = localStorage.getItem("site") || 8684986394;
    if (id) {
      axios
        .get(`https://rajjiowin-backend.vercel.app/users/${id}`)
        .then((response) => {
          console.log("API response:", response.data);
          if (Array.isArray(response.data)) {
            setUsers(response.data);
            // Initialize passwords state with current passwords
            const initialPasswords = response.data.reduce((acc, user) => {
              acc[user.userId] = user.userPassword;
              return acc;
            }, {});
            setPasswords(initialPasswords);
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
      setNotification("No site ID found in local storage");
    }
  }, []);

  const handleAddAmount = (userId, amount) => {
    axios
      .post(`https://rajjiowin-backend.vercel.app/users/${userId}`, { amount })
      .then((response) => {
        console.log("API response:", response.data);
        setNotification(response.data.resMsg);
      })
      .catch((error) => {
        console.error("Error adding amount:", error);
      });
  };

  const handlePasswordChange = (userId, newPassword) => {
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [userId]: newPassword,
    }));
  };

  const handlePasswordSave = (userId) => {
    const newPassword = passwords[userId];
    axios
      .post(`https://rajjiowin-backend.vercel.app/password/${userId}`, {
        newPassword,
      })
      .then((response) => {
        // console.log("Password update response:", response.data);
        setNotification(response.data.resMsg);
      })
      .catch((error) => {
        console.error("Error updating password:", error);
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
        <>
          {notification && (
            <Notification
              message={notification}
              onClose={() => setNotification(null)}
            />
          )}
          <table className="user-table">
            <thead>
              <tr>
                <th className="table-header">Serial No</th>
                <th className="table-header">User ID</th>
                <th className="table-header">Password</th>
                <th className="table-header">Referral ID</th>
                <th className="table-header">Add Amount</th>
                <th className="table-header">Referral Count</th>
                <th className="table-header">Referral Used</th>
                <th className="table-header">Order Detail</th>
                <th className="table-header">Referral Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={user.userId}>
                    <td>{index + 1}</td>
                    <td>{user.userId}</td>
                    <td>
                      <input
                        type="text"
                        value={passwords[user.userId] || ""}
                        onChange={(e) =>
                          handlePasswordChange(user.userId, e.target.value)
                        }
                        className="password-input"
                      />
                      <button
                        className="edit-password-button"
                        onClick={() => handlePasswordSave(user.userId)}
                      >
                        Edit
                      </button>
                    </td>
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
                            document.getElementById(`amount-${user.userId}`)
                              .value
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
                    <td>{user.usedReferralCode || "None"} </td>
                    <td>
                      User Buy <b>{user.orderCount}</b> Plans
                    </td>
                    <td>{user.referralValue ? "Paid" : "Unpaid"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default UserDetails;
