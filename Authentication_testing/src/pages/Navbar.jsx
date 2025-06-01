import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaUserCircle, FaLock, FaEdit, FaShoppingBag, FaBars } from "react-icons/fa";
import logo from "../assets/logo2.png";
import '../assets/style.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  }, []);


  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Don't show navbar on the registration page
  if (location.pathname === "/register") return null;

  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <h1>AcTion Figure Hub</h1>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-toggler-button"
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FaBars />
        </button>

        <div className={`navbar-collapse-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="navbar-nav-list">
            <li className="nav-list-item">
              <Link to="/" className="nav-list-link">
                Home
              </Link>
            </li>
            <li className="nav-list-item">
              <Link to="/about" className="nav-list-link">
                About
              </Link>
            </li>
            <li className="nav-list-item">
              <Link to="/create-action-figure" className="nav-list-link">
                Create Figure
              </Link>
            </li>
            <li className="nav-list-item">
              <Link to="/action-figures" className="nav-list-link">
                Figures List
              </Link>
            </li>
            <li className="nav-list-item">
              {user ? (
                <div className="user-profile-dropdown" ref={dropdownRef}>
                  <button 
                    className="nav-list-link profile-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDropdownOpen(!isDropdownOpen);
                    }}
                    aria-haspopup="true"
                    aria-expanded={isDropdownOpen}
                    type="button"
                  >
                    {user.profileImage ? (
                      <img 
                        src={user.profileImage} 
                        alt={user.username} 
                        className="profile-image"
                      />
                    ) : (
                      <FaUserCircle className="profile-icon" />
                    )}
                    <span className="user-name">Hi, {user.username}</span>
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="dropdown-menu">
                      <Link to="/profile" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                        <FaUser /> My Profile
                      </Link>
                      <Link to="/edit-profile" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                        <FaEdit /> Edit Details
                      </Link>
                      <Link to="/change-password" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                        <FaLock /> Change Password
                      </Link>
                      <Link to="/orders" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                        <FaShoppingBag /> My Orders
                      </Link>
                      <button onClick={handleLogout} className="dropdown-item">
                        <FaSignOutAlt /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="nav-list-link">
                  Sign In / Sign Up
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
