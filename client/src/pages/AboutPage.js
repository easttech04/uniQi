import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  const teamMembers = [
    { name: "John Doe", title: "CEO & Founder", imageUrl: "https://via.placeholder.com/150" },
    { name: "Jane Smith", title: "Chief Technology Officer", imageUrl: "https://via.placeholder.com/150" },
    { name: "Peter Jones", title: "Head of Operations", imageUrl: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About UniQi</h1>
        <p>Your trusted partner in innovative aviation and industrial solutions.</p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            To provide state-of-the-art technology and services that enhance safety, efficiency, and reliability for our clients in the aviation and industrial sectors. We are committed to delivering excellence and innovation in everything we do.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Vision</h2>
          <p>
            To be a global leader in specialized technology solutions, recognized for our quality, integrity, and commitment to customer success. We aim to shape the future of airport and industrial operations through continuous improvement and strategic partnerships.
          </p>
        </div>

        <div className="about-section team-section">
          <h2>Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member-card">
                <img src={member.imageUrl} alt={member.name} className="team-member-image" />
                <h3>{member.name}</h3>
                <p>{member.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
