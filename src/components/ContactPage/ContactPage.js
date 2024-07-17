import React, { useState } from "react";
import axios from "axios";
import "./ContactPage.css"; // Import your CSS file for NavBar styling
import Navbar from "../Header/Header";

const ContactPage = () => {
  const userId = localStorage.getItem("site");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PATH_URL}/contact/${userId}`,
        formData
      );
      console.log("Success:", response.data);
      setSubmitted(true);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="contact-container">
      <Navbar />
      <div className="contact-form">
        <h2 className="contact-heading">Contact Us</h2>
        <p className="contact-text">
          We're open for any inquiry or just to have a chat.
        </p>
        {submitted ? (
          <div className="success-message">
            Thank you for your message! We'll get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="contact-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="contact-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="contact-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="contact-input"
              ></textarea>
            </div>
            <button className="contact-button" type="submit">
              Send Message
            </button>
          </form>
        )}
      </div>
      <div className="contact-info">
        {/* <h2>Contact Information</h2>
        <p>Address: 198 West 21th Street, Suite 721 New York NY 10016</p>
        <p>Phone: +1(646) 555-3890</p>
        <p>Email: rajiowin@gmail.com</p>
        <p>Website: rajiowin.com</p> */}
        <p className="contact-text">Issue will resolved within 24 hours</p>
      </div>
    </div>
  );
};

export default ContactPage;
