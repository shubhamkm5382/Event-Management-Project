import React from "react";

const Features = () => {
  return (
    <div className="container-fluid featurs py-5">
      <div className="container py-5">
        <div className="row g-4">
          {/* Free Shipping */}
          <div className="col-md-6 col-lg-3">
            <div className="featurs-item text-center rounded bg-light p-4">
              <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                <i className="fas fa-car-side fa-3x text-white"></i>
              </div>
              <div className="featurs-content text-center">
                <h5>Free Event Entry</h5>
                <p className="mb-0">On selected registrations</p>
              </div>
            </div>
          </div>

          {/* Secure Payment */}
          <div className="col-md-6 col-lg-3">
            <div className="featurs-item text-center rounded bg-light p-4">
              <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                <i className="fas fa-user-shield fa-3x text-white"></i>
              </div>
              <div className="featurs-content text-center">
                <h5>Secure Booking</h5>
                <p className="mb-0">100% safe payment</p>
              </div>
            </div>
          </div>

          {/* Easy Cancellation */}
          <div className="col-md-6 col-lg-3">
            <div className="featurs-item text-center rounded bg-light p-4">
              <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                <i className="fas fa-exchange-alt fa-3x text-white"></i>
              </div>
              <div className="featurs-content text-center">
                <h5>Easy Cancellation</h5>
                <p className="mb-0">Cancel within 7 days</p>
              </div>
            </div>
          </div>

          {/* 24/7 Support */}
          <div className="col-md-6 col-lg-3">
            <div className="featurs-item text-center rounded bg-light p-4">
              <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                <i className="fa fa-phone-alt fa-3x text-white"></i>
              </div>
              <div className="featurs-content text-center">
                <h5>24/7 Support</h5>
                <p className="mb-0">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
