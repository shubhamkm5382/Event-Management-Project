import React from "react";
import './footer.css';

const Footer = () => {
  return (
    <footer className="luxury-footer">
      {/* Top Section */}
      <div className="footer-top container py-5">
        <div className="row align-items-center">
          {/* Branding */}
          <div className="col-lg-3 text-center text-lg-start mb-3 mb-lg-0">
            <a href="#" className="footer-brand">
              <h1>LuxeEvents</h1>
              <p>Premium Experiences</p>
            </a>
          </div>

          {/* Social Icons */}
          <div className="col-lg-9 text-center text-lg-end">
            <div className="social-icons">
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="footer-links container py-5">
        <div className="row">
          {/* Main Navigation */}
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h4>Navigate</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/gallery/wedding">Gallery</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Event Types */}
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h4>Event Types</h4>
            <ul>
              <li><a href="/gallery/wedding">Wedding</a></li>
              <li><a href="/gallery/birthday">Birthday</a></li>
              <li><a href="/gallery/farewell">Farewell</a></li>
              <li><a href="/gallery/corporate">Corporate</a></li>
              <li><a href="/gallery/anniversary">Anniversary</a></li>
            </ul>
          </div>

          {/* Event Services */}
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h4>Our Services</h4>
            <ul>
              <li><a href="/services#venue">Venue Management</a></li>
              <li><a href="/services#catering">Catering Services</a></li>
              <li><a href="/services#decor">Decor & Themes</a></li>
              <li><a href="/services#entertainment">Entertainment</a></li>
              <li><a href="/services#photography">Photography & Videography</a></li>
            </ul>
          </div>

          {/* Contact & Info */}
          <div className="col-lg-3 col-md-6">
            <h4>Contact</h4>
            <p>Patna, Bihar, India</p>
            <p>Email: info@luxe-events.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Payment Accepted</p>
            <img src="img/payment.png" alt="Payment Methods" className="payment-img" />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom text-center py-3">
        &copy; 2025 LuxeEvents. All Rights Reserved. | Designed for Unforgettable Events
      </div>
    </footer>
  );
};

export default Footer;
