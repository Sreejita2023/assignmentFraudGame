import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css'; // You'll style here

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="sidebar-container">
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <div />
        <div />
        <div />
      </div>

      {isOpen && (
        <div className="sidebar-menu">
          <p onClick={() => navigate('/')}>Home</p>
          <p onClick={() => navigate('/game')}>Game</p>
          <p onClick={() => navigate('/login')}>Login</p>
          <p onClick={() => navigate('/register')}>Register</p>
          <p onClick={() => navigate('/dashboard')}>Dashboard</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
