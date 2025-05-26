import React, { useState } from 'react';
import { signInWithEmailAndPassword ,onAuthStateChanged} from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // your custom CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../context/UserContext';
import Topbar from './Topbar';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUid } = useUser();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUid(user.uid);
          alert('Login successful!');
          navigate('/dashboard');
        }
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <Topbar/>
      <div className="login-box">
        <h2>Log in</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
            <p className="forgot-password">Forgot your password?</p>
          </div>
          <button type="submit" className="submit-btn">Next</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
