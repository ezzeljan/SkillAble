import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  // Check if current path is "/login"
  const isLoginPage = location.pathname === '/login';

  return (
    <nav className="nav-bar">
      {/* Left: Title */}
      <RouterLink to="/" style={{ textDecoration: 'none' }}>
        <div className="navbar-title">SkillAble</div>
      </RouterLink>

      {/* Center: Navigation links */}
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="#about">About us</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      {/* Right: Login button - Only show if NOT on /login */}
      {!isLoginPage && (
        <div className="navbar-right">
          <RouterLink to="/login" className="register-btn">
            Login
          </RouterLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
