import React from "react";
import { Link } from "react-router-dom";
import "./eventshop.css";

const Eventshop = () => {
  return (
    <div>
      <div className="container-fluid my-5">
          {/* Gallery Section Heading */}
          <div class="text-center my-5">
            <h2 class="fw-bold text-uppercase mb-3">
              <span class="text-primary">✨ Explore Our Gallery ✨</span>
            </h2>
            <p class="text-muted fs-5">
              Discover different categories and click to open the full gallery
            </p>
          </div>
        <div className="row event_boxcard text-center g-1">
          <div className="col-lg-2 col-md-4 col-sm-6 col-12">
            <Link to="/gallery/birthday" className="shop_card birthday">
              <h2>Birthday</h2>
            </Link>
          </div>

          <div className="col-lg-2 col-md-4 col-sm-6 col-12">
            <Link to="/gallery/wedding" className="shop_card wedding">
              <h2>Wedding</h2>
            </Link>
          </div>

          <div className="col-lg-2 col-md-4 col-sm-6 col-12">
            <Link to="/gallery/anniversary" className="shop_card concert">
              <h2>Anniversary</h2>
            </Link>
          </div>

          <div className="col-lg-2 col-md-4 col-sm-6 col-12">
            <Link to="/gallery/corporate" className="shop_card party">
              <h2>Corporate</h2>
            </Link>
          </div>

          <div className="col-lg-2 col-md-4 col-sm-6 col-12">
            <Link to="/gallery/festival" className="shop_card festival">
              <h2>Festival</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eventshop;
