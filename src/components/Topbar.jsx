// components/Topbar.jsx
import React from 'react';
import Sidebar from './Sidebar';
import '../styles/Topbar.css';

const Topbar = () => {
  return (
    <div className="topbar-container">
      <h1 className="topbar-title">CATCH THE FAKE</h1>
      <Sidebar />
    </div>
  );
};

export default Topbar;
