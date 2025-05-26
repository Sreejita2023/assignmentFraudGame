import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import Sidebar from './Sidebar';
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
       <Sidebar />
      <div className="overlay">
        <div className="circle-frame">
          <h1 className="title">CATCH THE FAKE</h1>
          <p className="subtitle">Beware of Fraud Messages!<br />Spot the fraud and collect points.</p>
          <button className="login-button" onClick={() => navigate('/login')}>Log in</button>
          <p className="register-link">
            Don’t have log in?{' '}
            <span onClick={() => navigate('/register')}>Register yourself</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
