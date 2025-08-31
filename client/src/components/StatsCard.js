import React from 'react';
import './StatsCard.css';

const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="stats-card">
      <div className="stats-card-icon">
        {/* In a real app, you'd use an icon library e.g., <FaMoneyBillWave /> */}
        <span>{icon}</span>
      </div>
      <div className="stats-card-info">
        <h4>{title}</h4>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
