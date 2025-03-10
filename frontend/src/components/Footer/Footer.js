import React from 'react';
import './Footer.css'; 

const Footer = () => {
  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <div className="footer-container">
      <footer className="d-flex justify-content-center align-items-center py-3 ">
        <ul className="nav">
          <li className="nav-item mx-3">
            <button className="footer-button" onClick={() => navigateTo('/about-us')}>
              About Us
            </button>
          </li>
          <li className="nav-item mx-3">
            <button className="footer-button" onClick={() => navigateTo('/contact-us')}>
              Contact Us
            </button>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;