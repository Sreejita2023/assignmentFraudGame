// src/pages/Register.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, realtimeDB } from '../firebase';
import '../styles/Register.css';
import Sidebar from './Sidebar';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    points:0,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, confirmPassword,points} = formData;

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("registration successful",user)
    
      await set(ref(realtimeDB, 'users/' + user.uid), {
        uid: user.uid,
        name,
        email,
        phone,
        points,
        createdAt: new Date().toISOString()
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      });

      alert('Registration successful!');

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="register-page">
    <Sidebar />
    <div className="register-container">
      <h2>Register yourself</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email ID" value={formData.email} onChange={handleChange} required />
        <input name="phone" type="tel" placeholder="Phone No." value={formData.phone} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} required />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        <button type="submit">Continue</button>
      </form>
    </div>
  </div>
  );
};

export default Register;
