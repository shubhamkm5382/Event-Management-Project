import React from "react";
import { Link } from "react-router-dom";

const Birthday = () => {
  return (
    <div>
      {/* Page Header */}
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn" style={{backgroundColor:'pink'}} data-wow-delay="0.1s">
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">
            Birthday Gallery
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/pages">Pages</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Birthday Gallery
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Birthday Section */}
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto pb-4 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "500px" }}
          >
            <p className="section-title bg-white text-center text-primary px-3">
              Birthday Moments
            </p>
            <h1 className="mb-5">Celebrate With Our Birthday Memories</h1>
          </div>
          <div className="row g-0">
            {/* Column 1 */}
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="row g-1">
                <div className="col-12">
                  <Link to="/img/birthday-1.jpg">
                    <img
                      className="img-fluid"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC3gQKVnfmLEX7eXi_cjtRO8f74LIZtpapUQ&s "
                      alt="Birthday Celebration"
                    />
                  </Link>
                </div>
                <div className="col-12">
                  <Link to="/img/birthday-2.jpg">
                    <img
                      className="img-fluid"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC3gQKVnfmLEX7eXi_cjtRO8f74LIZtpapUQ&s"
                      alt="Birthday Cake"
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="row g-1">
                <div className="col-12">
                  <Link to="/img/birthday-1.jpg">
                    <img
                      className="img-fluid"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC3gQKVnfmLEX7eXi_cjtRO8f74LIZtpapUQ&s "
                      alt="Birthday Celebration"
                    />
                  </Link>
                </div>
                <div className="col-12">
                  <Link to="/img/birthday-2.jpg">
                    <img
                      className="img-fluid"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC3gQKVnfmLEX7eXi_cjtRO8f74LIZtpapUQ&s"
                      alt="Birthday Cake"
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="row g-1">
                <div className="col-12">
                  <Link to="/img/birthday-1.jpg">
                    <img
                      className="img-fluid"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC3gQKVnfmLEX7eXi_cjtRO8f74LIZtpapUQ&s "
                      alt="Birthday Celebration"
                    />
                  </Link>
                </div>
                <div className="col-12">
                  <Link to="/img/birthday-2.jpg">
                    <img
                      className="img-fluid"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC3gQKVnfmLEX7eXi_cjtRO8f74LIZtpapUQ&s"
                      alt="Birthday Cake"
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* Column 4 */}
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="row g-1">
                <div className="col-12">
                  <Link to="/img/birthday-1.jpg">
                    <img
                      className="img-fluid"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC3gQKVnfmLEX7eXi_cjtRO8f74LIZtpapUQ&s "
                      alt="Birthday Celebration"
                    />
                  </Link>
                </div>
                <div className="col-12">
                  <Link to="/img/birthday-2.jpg">
                    <img
                      className="img-fluid"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC3gQKVnfmLEX7eXi_cjtRO8f74LIZtpapUQ&s"
                      alt="Birthday Cake"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Birthday;
