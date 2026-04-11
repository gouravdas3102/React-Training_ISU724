import React from 'react';
import './StatCard.css';

const StatCard = ({ icon, title, value }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-content">
        <div className="stat-card-icon-wrapper">
          {icon}
        </div>
        <div className="stat-card-info">
          <div className="stat-card-title">{title}</div>
          <div className="stat-card-value">{value}</div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
