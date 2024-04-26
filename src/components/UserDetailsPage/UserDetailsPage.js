import React, { useState, useEffect } from "react";
import "./UserDetailsPage.css"; // Import CSS file for styling

const UserDetailsPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API call
    fetchUserData()
      .then(data => {
        setUserData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  const fetchUserData = async () => {
    // Simulated API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Replace this with actual API call to fetch user data
    // For example:
    // const response = await fetch('https://api.example.com/userData');
    // const data = await response.json();
    // return data;

    // For demonstration, returning mock data
    return {
      userId: "9996986494",
      email: "demo@gmail.com",
      phoneNumber: "9996986494"
    };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-details-container">
      <h2>User Details Page</h2>
      {userData ? (
        <>
          <div className="user-detail">
            <h4>UserId:-</h4>
            <p>{userData.userId}</p>
          </div>
          <div className="user-detail">
            <h4>Email:-</h4>
            <p>{userData.email}</p>
          </div>
          <div className="user-detail">
            <h4>Phone-Number:-</h4>
            <p>{userData.phoneNumber}</p>
          </div>
        </>
      ) : (
        <div>Data not available</div>
      )}
    </div>
  );
};

export default UserDetailsPage;
