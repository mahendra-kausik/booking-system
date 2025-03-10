import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './ContactUs.css'; // Assuming you have styles

const ContactUs = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (isSubmitted) {
      Swal.fire({
        title: 'Message Sent',
        text: 'Your message was sent successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        setIsSubmitted(false); // Reset the form state after user acknowledges
      });
    }
  }, [isSubmitted]);

  return (
    <div className="contact-us-page">
      <header className="contact-header">
        <h1>Contact Us</h1>
      </header>
      <section className="contact-content">
        <div className="content-section">
          <div className="text-content">
            <h2>Get in Touch</h2>
            <p>
              If you have any questions or need assistance, feel free to reach out to us.
              We are here to help!
            </p>
          </div>
          <img
            src="https://via.placeholder.com/500x300" // Replace with a relevant image for contact section
            alt="Contact Us"
            className="contact-image"
          />
        </div>
        <div className="form-section">
          <h2>Write to Us</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Your name" required />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Your email" required />

            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Write your message here..." rows="4" required></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
