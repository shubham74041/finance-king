import React, { useState } from 'react';
import "./ContactPage.css"; // Import your CSS file for NavBar styling

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-container">
      <div className="contact-form">
        <h2>Contact Us</h2>
        <p>We're open for any inquiry or just to have a chat.</p>
        {submitted ? (
          <div className="success-message">
            Thank you for your message! We'll get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>
        )}
      </div>
      <div className="contact-info">
        <h2>Contact Information</h2>
        <p>
          Address: 198 West 21th Street, Suite 721 New York NY 10016
        </p>
        <p>Phone: +1(646) 555-3890</p>
        <p>Email: rajiowin@gmail.com</p>
        <p>Website: rajiowin.com</p>
      </div>
    </div>
  );
};

export default ContactPage;
