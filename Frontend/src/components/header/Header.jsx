import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../../components/header/header.css'

const LuxuryHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <>
      <div className="luxury-header-container">


        <nav className={`luxury-navbar ${isScrolled ? 'scrolled' : ''}`}>
          <div className="navbar-content">
            <Link to="/" className="navbar-brand">
              <div className="logo-container">
                <div className="logo-icon">
                  <i className="fas fa-crown"></i>
                </div>
                <div className="logo-text">
                  <span className="logo-main">LuxeEvents</span>
                  <span className="logo-sub">Premium Experiences</span>
                </div>
              </div>
            </Link>

            <button
              className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
              <div className="nav-links">
                <Link to="/" className="nav-link">
                  Home
                </Link>
                <Link to="/about" className="nav-link">
                  About Us
                </Link>
                <Link to="/services" className="nav-link">
                  Services
                </Link>
                <div className="nav-dropdown">
                  <button className="dropdown-toggle">
                    Gallery
                  </button>
                  <div className="dropdown-menu">
                    <Link to="/gallery/wedding" className="dropdown-item">
                      Wedding Celebration
                    </Link>
                    <Link to="/gallery/birthday" className="dropdown-item">
                      Birthday Bash
                    </Link>
                    <Link to="/gallery/farewell" className="dropdown-item">
                      Farewell Party
                    </Link>
                    <Link to="/gallery/corporate" className="dropdown-item">
                      Corporate Events
                    </Link>
                    <Link to="/gallery/anniversary" className="dropdown-item">
                      Anniversary Parties
                    </Link>
                  </div>
                </div>

                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
              </div>

              <div className="">
                <Link to="/login" className="login-btn">
                  <i className="fas fa-user"></i>

                  Login
                </Link>
              </div>
              {/* <button className="cta-btn">
                <i className="fas fa-calendar-check"></i>
                Book Event
              </button> */}
            </div>
          </div>
        </nav>
      </div>


    </>
  );
};

export default LuxuryHeader;