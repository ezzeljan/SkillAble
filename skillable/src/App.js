import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login-register/Login';
import Register from './components/login-register/Register';
import LandingPage from './components/LandingPage';
import Homepage from './components/Homepage';
import AccountPage from './components/AccountPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/homepage" element={<Homepage/>} />
        <Route path="/account" element={<AccountPage/>} />
      </Routes>
    </Router>
  );
}

export default App;