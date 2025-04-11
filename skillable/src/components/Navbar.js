import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="nav-bar">
      <RouterLink to="/" style={{ textDecoration: 'none' }}>
        <div className="navbar-title">SkillAble</div>
      </RouterLink>
      <ul 
      className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="#about">About us</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
