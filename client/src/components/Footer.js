import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About UniQi</h4>
          <p>Your trusted partner in innovative aviation and industrial solutions. We are committed to delivering excellence and reliability.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">FB</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">TW</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">LI</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} UniQi. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
