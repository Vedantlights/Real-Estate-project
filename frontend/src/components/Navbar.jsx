import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="logo-container">
              <img src="/logo.jpg" alt="India Propertys" className="logo-image" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-links-desktop">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              <span>Home</span>
            </Link>
            <Link to="/search?type=sale" className={`nav-link ${location.pathname === '/search' && location.search.includes('type=sale') ? 'active' : ''}`}>
              <span>Buy</span>
            </Link>
            <Link to="/search?type=rent" className={`nav-link ${location.pathname === '/search' && location.search.includes('type=rent') ? 'active' : ''}`}>
              <span>Rent</span>
            </Link>
            <Link to="/agents" className={`nav-link ${isActive('/agents') ? 'active' : ''}`}>
              <span>Agents</span>
            </Link>
            <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
              <span>Contact</span>
            </Link>
          </div>

          {/* Auth Buttons Desktop */}
          <div className="auth-buttons-desktop">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="auth-button auth-button-secondary">
                  <span>Dashboard</span>
                </Link>
                <button onClick={() => setIsLoggedIn(false)} className="auth-button auth-button-primary">
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="auth-button auth-button-secondary">
                  <span>Login</span>
                </Link>
                <Link to="/register" className="auth-button auth-button-primary">
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`mobile-menu-button ${isMenuOpen ? 'open' : ''}`}
            aria-label="Toggle menu"
          >
            <span className="menu-icon-line"></span>
            <span className="menu-icon-line"></span>
            <span className="menu-icon-line"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
            <Link to="/" className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}>
              <span>Home</span>
            </Link>
            <Link to="/search?type=sale" className={`mobile-nav-link ${location.pathname === '/search' && location.search.includes('type=sale') ? 'active' : ''}`}>
              <span>Buy</span>
            </Link>
            <Link to="/search?type=rent" className={`mobile-nav-link ${location.pathname === '/search' && location.search.includes('type=rent') ? 'active' : ''}`}>
              <span>Rent</span>
            </Link>
            <Link to="/agents" className={`mobile-nav-link ${isActive('/agents') ? 'active' : ''}`}>
              <span>Agents</span>
            </Link>
            <Link to="/contact" className={`mobile-nav-link ${isActive('/contact') ? 'active' : ''}`}>
              <span>Contact</span>
            </Link>
            
            <div className="mobile-auth-buttons">
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" className="auth-button auth-button-secondary">
                    <span>Dashboard</span>
                  </Link>
                  <button onClick={() => setIsLoggedIn(false)} className="auth-button auth-button-primary">
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="auth-button auth-button-secondary">
                    <span>Login</span>
                  </Link>
                  <Link to="/register" className="auth-button auth-button-primary">
                    <span>Register</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;