import React from "react";

const Footer = () => {
  return (
    <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
      <div className="container py-5">
        {/* Top Section */}
        <div
          className="pb-4 mb-4"
          style={{ borderBottom: "1px solid rgba(226, 175, 24, 0.5)" }}
        >
          <div className="row g-4">
            {/* Logo / Branding */}
            <div className="col-lg-3">
              <a href="#">
                <h1 className="text-primary mb-0">EventMaster</h1>
                <p className="text-secondary mb-0">Your Event Partner</p>
              </a>
            </div>

            {/* Subscribe Box */}
            <div className="col-lg-6">
              <div className="position-relative mx-auto">
                <input
                  className="form-control border-0 w-100 py-3 px-4 rounded-pill"
                  type="email"
                  placeholder="Your Email"
                />
                <button
                  type="submit"
                  className="btn btn-primary border-0 py-3 px-4 position-absolute rounded-pill text-white"
                  style={{ top: 0, right: 0 }}
                >
                  Subscribe Now
                </button>
              </div>
            </div>

            {/* Social Icons */}
            <div className="col-lg-3">
              <div className="d-flex justify-content-end pt-3">
                <a
                  className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                  href="#"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                  href="#"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                  href="#"
                >
                  <i className="fab fa-youtube"></i>
                </a>
                <a
                  className="btn btn-outline-secondary btn-md-square rounded-circle"
                  href="#"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="row g-5">
          {/* About */}
          <div className="col-lg-3 col-md-6">
            <div className="footer-item">
              <h4 className="text-light mb-3">Why Choose Us?</h4>
              <p className="mb-4">
                We specialize in creating unforgettable events – from weddings
                to conferences, birthdays to concerts – with world-class
                management.
              </p>
              <a
                href="#"
                className="btn border-secondary py-2 px-4 rounded-pill text-primary"
              >
                Read More
              </a>
            </div>
          </div>

          {/* Info Links */}
          <div className="col-lg-3 col-md-6">
            <div className="d-flex flex-column text-start footer-item">
              <h4 className="text-light mb-3">Event Info</h4>
              <a className="btn-link" href="#">
                About Us
              </a>
              <a className="btn-link" href="#">
                Contact Us
              </a>
              <a className="btn-link" href="#">
                Privacy Policy
              </a>
              <a className="btn-link" href="#">
                Terms & Condition
              </a>
              <a className="btn-link" href="#">
                FAQs & Help
              </a>
            </div>
          </div>

          {/* User Links */}
          <div className="col-lg-3 col-md-6">
            <div className="d-flex flex-column text-start footer-item">
              <h4 className="text-light mb-3">Account</h4>
              <a className="btn-link" href="#">
                My Account
              </a>
              <a className="btn-link" href="#">
                My Bookings
              </a>
              <a className="btn-link" href="#">
                Wishlist
              </a>
              <a className="btn-link" href="#">
                Order History
              </a>
              <a className="btn-link" href="#">
                Support
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6">
            <div className="footer-item">
              <h4 className="text-light mb-3">Contact</h4>
              <p>Address: Patna, Bihar, India</p>
              <p>Email: info@eventmaster.com</p>
              <p>Phone: +91 98765 43210</p>
              <p>Payment Accepted</p>
              <img src="img/payment.png" className="img-fluid" alt="Payment" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
