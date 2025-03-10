import React from 'react';
import './AboutUs.css'; // Assuming you'll create a separate CSS file for styles

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <section className="about-header">
        <h1>About Us</h1>
      </section>

      <section className="about-description">
        <h2> Bookings </h2>
        <p>
          We offer hassle-free court booking services, making it easy to secure your preferred sports venue. 
          Play your game, we'll handle the rest!
        </p>
      </section>

      <section className="our-team">
        <h2>Our Team</h2>
        <div className="team-cards">
          <div className="team-card">
            <img
              className="profile-img"
              src="/images/ananthesha.jpg" 
              alt="Profile 1"
            /> 
            <h3>Ananthesha</h3>
            <p>PES1UG23AM161</p>
          </div>
          <div className="team-card">
            <img
              className="profile-img"
              src="/images/purandar.jpg" 
              alt="Profile 2"
            />
            <h3>Purandar</h3>
            <p>PES1UG23AM906</p>
          </div>
          <div className="team-card">
            <img
              className="profile-img"
              src="/images/kausik.jpg" 
              alt="Profile 3"
            />
            <h3>Kausik</h3>
            <p>PES1UG23AM163</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
