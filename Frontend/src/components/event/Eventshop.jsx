import React from "react";
import { Link } from "react-router-dom";
import "../../components/event/eventshop.css";

const Eventshop = () => {
  return (
    <div>
      <div className="container my-5">
        <div className="row event_boxcard text-center g-3">
          <div className="col-lg-2 col-md-4 col-sm-6 col-12">
            <Link to="/bookingpage/birthday" className="shop_card birthday">
              <h2>Birthday</h2>
            </Link>
          </div>

          <div className="col-lg-2 col-md-4 col-sm-6 col-12">
            <Link to="/bookingpage/wedding" className="shop_card wedding">
              <h2>Wedding</h2>
            </Link>
          </div>

          <div className="col-lg-2 col-md-4 col-sm-6 col-12">
            <Link to="/bookingpage/concert" className="shop_card concert">
              <h2>Concert</h2>
            </Link>
          </div>

          <div className="col-lg-2 col-md-4 col-sm-6 col-12">
            <Link to="/bookingpage/party" className="shop_card party">
              <h2>Party</h2>
            </Link>
          </div>

          <div className="col-lg-2 col-md-4 col-sm-6 col-12">
            <Link to="/bookingpage/festival" className="shop_card festival">
              <h2>Festival</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eventshop;
