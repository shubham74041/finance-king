import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ContactInfoPage.css"; // Import your CSS file for styling

const ContactInfoPage = () => {
  const [contactData, setContactData] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("site");
    axios
      .get(`https://rajjiowin-backend.vercel.app/${id}`)
      .then((response) => setContactData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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
            <tr key={contact.userId}>
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
