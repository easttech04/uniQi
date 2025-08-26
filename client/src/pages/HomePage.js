import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Innovative Solutions for Aviation & Industry</h1>
          <p>Delivering excellence and reliability in every project.</p>
          <div className="hero-buttons">
            <Link to="/about" className="hero-button">Learn More</Link>
            <a href="/company-profile.pdf" className="hero-button secondary" download>Download Profile</a>
          </div>
        </div>
      </header>

      {/* Portfolio Section */}
      <section className="home-section">
        <h2>Our Portfolio</h2>
        <p>A glimpse into our successful projects and solutions.</p>
        {/* Placeholder for portfolio items */}
        <div className="portfolio-grid">
          <div className="portfolio-item">Project A</div>
          <div className="portfolio-item">Project B</div>
          <div className="portfolio-item">Project C</div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="home-section bg-light">
        <h2>Decades of Experience</h2>
        <p>Our team brings together a wealth of knowledge and expertise.</p>
        {/* Placeholder for experience details */}
      </section>

      {/* Commitment Section */}
      <section className="home-section">
        <h2>Our Commitment</h2>
        <p>We are dedicated to quality, safety, and customer satisfaction.</p>
        {/* Placeholder for commitment details */}
      </section>

      {/* Partners Section */}
      <section className="home-section bg-light">
        <h2>Our Partners</h2>
        <p>We collaborate with leading organizations to deliver the best results.</p>
        {/* Placeholder for partner logos */}
        <div className="partners-grid">
          <div className="partner-logo">Partner 1</div>
          <div className="partner-logo">Partner 2</div>
          <div className="partner-logo">Partner 3</div>
          <div className="partner-logo">Partner 4</div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
