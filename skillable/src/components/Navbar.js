import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null);

  // Check login status on component mount and when location changes
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isLoggedIn');
    
    // Redirect to login page
    navigate('/login');
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    
    // Check current location
    const currentPath = location.pathname;
    
    // At login or register pages, navigate to landing page
    if (currentPath === '/login' || currentPath === '/register') {
      navigate('/');
    }
    // At landing page, stay at landing page
    else if (currentPath === '/') {
      navigate('/');
    }
    // Anywhere else, go to homepage
    else {
      navigate('/homepage');
    }
  };

  // Determine target for title and home link
  const getHomeTarget = () => {
    const currentPath = location.pathname;
    
    // At login, register, or landing page, target should be landing page
    if (currentPath === '/login' || currentPath === '/register' || currentPath === '/') {
      return '/';
    }
    // Anywhere else, target should be homepage
    else {
      return '/homepage';
    }
  };

  // Check if we should show the profile dropdown
  const shouldShowProfileDropdown = () => {
    const currentPath = location.pathname;
    // Don't show dropdown on landing, login, or register pages, or when not logged in
    return isLoggedIn && currentPath !== '/' && currentPath !== '/login' && currentPath !== '/register';
  };

  const homeTarget = getHomeTarget();

  return (
    <nav className="nav-bar">
      {/* Left: Title */}
      <RouterLink to={homeTarget} style={{ textDecoration: 'none' }}>
        <div className="navbar-title">SkillAble</div>
      </RouterLink>

      {/* Center: Navigation links */}
      <ul className="navbar-links">
        <li>
          <a href="/" onClick={handleHomeClick}>Home</a>
        </li>
        <li><a href="#about">About us</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      {/* Right: Only show profile dropdown when appropriate */}
      <div className="navbar-right">
        {shouldShowProfileDropdown() && (
          <div className="profile-dropdown" ref={dropdownRef}>
            <div 
              className="profile-dropdown-trigger" 
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <AccountCircleIcon sx={{ fontSize: 32, color: "white" }} />
              <ExpandMoreIcon sx={{ color: "white" }} />
            </div>
            
            {dropdownOpen && (
              <div className="profile-dropdown-menu">
                <RouterLink to="/account" className="dropdown-item">
                  Account
                </RouterLink>
                <div className="dropdown-item" onClick={handleLogout}>
                  Log out
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;