import React from 'react';
import { MdOutlineHelpOutline } from 'react-icons/md';
import './HelpSupport.css';

const HelpSupport = () => {
  return (
    <div className="help-support-container">
      <div className="help-content-card">
        <div className="coming-soon-badge">New Features Incoming</div>
        <div className="illustration-wrapper">
          <div className="icon-circle">
            <MdOutlineHelpOutline className="hero-icon" />
          </div>
          <div className="floating-elements">
            <div className="dot dot-1"></div>
            <div className="dot dot-2"></div>
            <div className="dot dot-3"></div>
          </div>
        </div>
        
        <h1 className="coming-soon-title">Help & Support</h1>
        <p className="coming-soon-subtitle">
          We're currently building a powerful support center to serve you better. 
          Soon you'll be able to raise tickets, view FAQs, and chat with our experts.
        </p>
        
        <div className="pnb-divider">
          <div className="divider-line"></div>
          <div className="divider-pnb-logo"></div>
          <div className="divider-line"></div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
