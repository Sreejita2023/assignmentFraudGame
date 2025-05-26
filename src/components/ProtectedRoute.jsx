// components/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { uid } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!uid) {
      alert('You must be logged in to access this page.');
      navigate('/login');
    }
  }, [uid, navigate]);

  return uid ? children : null;
};

export default ProtectedRoute;
