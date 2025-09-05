import React from "react";
import "./Packages.css";

const Packages = () => {
  return (
    <div>
      <h2>Sample Packages</h2>
      <div className="packages">
        <div className="package">
          <h3>Essential</h3>
          <p>Venue rental, basic decor, standard catering</p>
          <span>₹12,00,000</span>
        </div>
        <div className="package">
          <h3>Elegant</h3>
          <p>Premium decor, upgraded menu, live music</p>
          <span>₹18,00,000</span>
        </div>
        <div className="package">
          <h3>Luxury</h3>
          <p>All-inclusive: luxury decor, 5-star catering, photography, DJ</p>
          <span>₹25,00,000</span>
        </div>
      </div>
    </div>
  );
};

export default Packages;
