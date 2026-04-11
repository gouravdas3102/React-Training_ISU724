import React, { useState } from 'react';
import { AiOutlineMenuFold } from 'react-icons/ai';
import { useAuth } from '../auth/useAuth';
import ProfileModal from './ProfileModal';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const displayName = user?.extracted_username || "Stebin Ben";
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleViewProfile = () => {
    setIsProfileOpen(false);
    setShowProfileModal(true);
  };

  return (
    <header className="global-header">
      <div className="header-left">
        <button className="menu-toggle">
          <AiOutlineMenuFold size={20} />
        </button>
      </div>
      <div className="header-right">
        <div className="profile-trigger" onClick={() => setIsProfileOpen(!isProfileOpen)}>
          <div className="avatar">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
          </div>
          <span className="user-name">{displayName}</span>
        </div>
        
        {isProfileOpen && (
          <div className="profile-dropdown">
            <div className="profile-dropdown-item" onClick={handleViewProfile}>View Profile</div>
            <div className="profile-dropdown-item logout" onClick={logout}>Logout</div>
          </div>
        )}
      </div>

      {showProfileModal && (
        <ProfileModal onClose={() => setShowProfileModal(false)} />
      )}
    </header>
  );
};
export default Header;
