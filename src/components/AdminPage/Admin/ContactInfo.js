import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ContactInfoPage.css"; // Import your CSS file for styling

const ContactInfoPage = () => {
  const [contactData, setContactData] = useState(null); // Initialize to null
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const id = localStorage.getItem("site");
    axios
      .get(`https://rajjiowin-backend.vercel.app/messages/${id}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setContactData(response.data);
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactInfoPage;
