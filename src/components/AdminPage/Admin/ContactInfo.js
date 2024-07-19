import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ContactInfoPage.css"; // Import your CSS file for styling

const ContactInfoPage = () => {
  const [contactData, setContactData] = useState(null); // Initialize to null
  const [solvedStatus, setSolvedStatus] = useState({}); // State to handle solved status
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const id = localStorage.getItem("site");

    axios
      .get(`${process.env.REACT_APP_PATH_URL}/messages/${id}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          const sortedData = response.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setContactData(sortedData);

          // Load solved status from localStorage
          const storedSolvedStatus = JSON.parse(
            localStorage.getItem("solvedStatus") || "{}"
          );
          const initialSolvedStatus = sortedData.reduce((acc, contact) => {
            acc[contact._id] = storedSolvedStatus[contact._id] || false;
            return acc;
          }, {});
          setSolvedStatus(initialSolvedStatus);
        } else {
          setContactData([]);
          console.error("Data fetched is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      });
  }, []);

  const handleSolvedChange = (id) => {
    const newStatus = !solvedStatus[id];
    const updatedSolvedStatus = {
      ...solvedStatus,
      [id]: newStatus,
    };

    setSolvedStatus(updatedSolvedStatus);

    // Save the updated solved status to localStorage
    localStorage.setItem("solvedStatus", JSON.stringify(updatedSolvedStatus));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (contactData === null) {
    return <div>Loading...</div>; // Add a loading state
  }

  return (
    <div className="contact-info-container">
      <h2>Contact Information</h2>
      <table className="contact-info-table">
        <thead>
          <tr>
            <th>UserID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Date</th>
            <th>Solved</th>
          </tr>
        </thead>
        <tbody>
          {contactData.map((contact) => (
            <tr key={contact._id}>
              <td data-label="UserID">{contact.userId}</td>
              <td data-label="Name">{contact.name}</td>
              <td data-label="Email">{contact.email}</td>
              <td data-label="Subject">{contact.subject}</td>
              <td data-label="Message">{contact.message}</td>
              <td data-label="Date">
                {new Date(contact.createdAt).toLocaleString()}
              </td>
              <td data-label="Solved">
                <input
                  type="checkbox"
                  checked={solvedStatus[contact._id] || false}
                  onChange={() => handleSolvedChange(contact._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactInfoPage;
