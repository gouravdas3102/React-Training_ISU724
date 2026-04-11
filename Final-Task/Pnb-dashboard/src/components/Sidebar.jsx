import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdDashboard, MdOutlineHelpOutline } from 'react-icons/md';
import { BsQrCode } from 'react-icons/bs';
import { CgFileDocument } from 'react-icons/cg';
import { HiOutlineLanguage } from 'react-icons/hi2';
import logo from '../assets/images/logo.png';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="PNB Logo" className="logo-image" />
      </div>
      <nav className="sidebar-menu">
        <div 
          className={`menu-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
          onClick={() => navigate('/dashboard')}
        >
          <div className="menu-inner">
            <span className="icon"><MdDashboard /></span>
            <span className="title">Dashboard</span>
          </div>
        </div>
        <div 
          className={`menu-item ${location.pathname === '/transaction-reports' ? 'active' : ''}`}
          onClick={() => navigate('/transaction-reports')}
        >
          <div className="menu-inner">
            <span className="icon"><CgFileDocument /></span>
            <span className="title">Transaction Reports</span>
          </div>
        </div>
        <div 
          className={`menu-item ${location.pathname === '/qr-details' ? 'active' : ''}`}
          onClick={() => navigate('/qr-details')}
        >
          <div className="menu-inner">
            <span className="icon"><BsQrCode /></span>
            <span className="title">QR Details</span>
          </div>
        </div>
        <div 
          className={`menu-item ${location.pathname === '/language-update' ? 'active' : ''}`}
          onClick={() => navigate('/language-update')}
        >
          <div className="menu-inner">
            <span className="icon"><HiOutlineLanguage /></span>
            <span className="title">Language Update</span>
          </div>
        </div>
        <div 
          className={`menu-item ${location.pathname === '/help-support' ? 'active' : ''}`}
          onClick={() => navigate('/help-support')}
        >
          <div className="menu-inner">
            <span className="icon"><MdOutlineHelpOutline /></span>
            <span className="title">Help & Support</span>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
