import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundAnimation from '../components/BackgroundAnimation';
import FlipCard from '../components/FlipCard';
import Counter from '../components/Counter';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import './HomePage.css';

// A wrapper component to handle the animation logic
const AnimatedSection = ({ children, className }) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1, // Trigger when 10% of the element is visible
  });

  return (
    <section
      ref={ref}
      className={`${className} home-section ${isIntersecting ? 'visible' : ''}`}
    >
      {children}
    </section>
  );
};


const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <header className="hero-section">
        <BackgroundAnimation />
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
      <AnimatedSection>
        <h2>Our Portfolio</h2>
        <p>A glimpse into our successful projects and solutions.</p>
        <div className="portfolio-grid">
          <div className="portfolio-item">Project A</div>
          <div className="portfolio-item">Project B</div>
          <div className="portfolio-item">Project C</div>
        </div>
      </AnimatedSection>

      {/* Experience Section */}
      <AnimatedSection className="bg-light">
        <h2>Decades of Experience</h2>
        <p>Our team brings together a wealth of knowledge and expertise.</p>
        <div className="experience-counters">
          <div className="counter-item">
            <h3><Counter end={15} suffix="+" /></h3>
            <p>Years in Business</p>
          </div>
          <div className="counter-item">
            <h3><Counter end={500} suffix="+" /></h3>
            <p>Projects Completed</p>
          </div>
          <div className="counter-item">
            <h3><Counter end={100} suffix="%" /></h3>
            <p>Customer Satisfaction</p>
          </div>
        </div>
      </AnimatedSection>

      {/* Commitment Section */}
      <AnimatedSection>
        <h2>Our Commitment</h2>
        <div className="commitment-grid">
          <FlipCard
            frontContent={<h3>Quality</h3>}
            backContent={<p>We uphold the highest standards of quality in every project, ensuring durable and reliable solutions.</p>}
          />
          <FlipCard
            frontContent={<h3>Safety</h3>}
            backContent={<p>Safety is at the core of our operations. We are committed to protecting our clients, our team, and the public.</p>}
          />
          <FlipCard
            frontContent={<h3>Innovation</h3>}
            backContent={<p>We constantly seek innovative solutions to meet the evolving needs of the aviation and industrial sectors.</p>}
          />
        </div>
      </AnimatedSection>

      {/* Partners Section */}
      <AnimatedSection className="bg-light">
        <h2>Our Partners</h2>
        <p>We collaborate with leading organizations to deliver the best results.</p>
        <div className="partners-grid">
          <div className="partner-logo">Partner 1</div>
          <div className="partner-logo">Partner 2</div>
          <div className="partner-logo">Partner 3</div>
          <div className="partner-logo">Partner 4</div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default HomePage;
