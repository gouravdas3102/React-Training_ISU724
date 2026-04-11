import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="layout-content-wrapper">
        <Header />
        <main className="layout-main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
