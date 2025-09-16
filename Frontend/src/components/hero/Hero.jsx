import React from "react";
import { Link } from "react-router-dom";

import "../../components/hero/hero.css";

const HeroSection = () => {
  return (
    <>
      {/* 🌟 Hero Section */}
      <div className="container-fluid hero-section py-5">
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            {/* Left Content */}
            <div className="col-lg-7 col-md-12 text-center text-lg-start">
              <h4 className="mb-3 text-warning fw-bold animate__animated animate__fadeInDown">
                Professional Event Management
              </h4>
              <h1 className="mb-4 display-4 fw-bold text-white animate__animated animate__fadeInLeft">
                Making Your Events <br />
                <span className="text-warning">Memorable</span> &{" "}
                <span className="text-info">Successful</span>
              </h1>
              <p className="text-light mb-4 animate__animated animate__fadeInUp">
                From weddings to corporate gatherings – we craft experiences
                that last a lifetime.
              </p>
              <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                <button className="btn btn-warning rounded-pill px-4 py-2 fw-bold">
                  Explore Events
                </button>

                <Link to="/contact">
                  <button className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Carousel */}
            <div className="col-lg-5 col-md-12">
              <div
                id="heroCarousel"
                className="carousel slide shadow-lg rounded-4 overflow-hidden position-relative border border-3"
                data-bs-ride="carousel"
                data-bs-interval="3000"
                style={{ backgroundColor: "#fff3cd", borderRadius: "20px" }} // 🟡 Pila background
              >
                <div className="carousel-inner rounded-4">
                  {/* Slide 1 */}
                  <div className="carousel-item active">
                    <img
                      src='https://eventsolutions.com/wp-content/uploads/2019/11/20th-anniversary-party-with-dramatic-lighting-1-1030x765.jpg.webp'
                      className="d-block w-100"
                      alt="Event 1"
                      style={{
                        height: "400px",
                        objectFit: "cover",
                        borderRadius: "20px", // 🟡 Image bhi round
                      }}
                    />
                    {/* Overlay Text */}

                  </div>

                  {/* Slide 2 */}
                  <div className="carousel-item">
                    <img
                      src='https://www.weddingsutra.com/images/wedding-images/blog-images/mosaic-events-oman/mosaic-events-oman-img1.webp'
                      className="d-block w-100"
                      alt="Event 2"
                      style={{
                        height: "400px",
                        objectFit: "cover",
                        borderRadius: "20px", // 🟡 Image bhi round
                      }}
                    />
                    {/* Overlay Text */}

                  </div>

                  <div className="carousel-item">
                    <img
                      src='https://i.pinimg.com/originals/35/c7/e9/35c7e97b3da4289d308836ea3ff85d97.jpg'
                      className="d-block w-100"
                      alt="Event 2"
                      style={{
                        height: "400px",
                        objectFit: "cover",
                        borderRadius: "20px", // 🟡 Image bhi round
                      }}
                    />
                    {/* Overlay Text */}

                  </div>
                </div>

                {/* Controls */}
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#heroCarousel"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon  rounded-circle p-3"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#heroCarousel"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon  rounded-circle p-3"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
