import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { UserProvider } from './context/UserContext';
import Game from './components/Game';
function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={
              <ProtectedRoute>
          <Dashboard/>
          </ProtectedRoute>} />
        <Route path="/game" element={
             <ProtectedRoute>
                <Game />
              </ProtectedRoute>
        } />
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
