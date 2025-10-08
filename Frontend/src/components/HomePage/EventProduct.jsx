import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Events.css";

const Events = () => {
  const [activeTab, setActiveTab] = useState("All Events");
  const [events, setEvents] = useState([]);

  const categories = [
    "All Events",
    "Wedding",
    "Farewell",
    "Corporate",
    "Birthday",
    "Anniversary",
  ];

  useEffect(() => {
    axios.get("/api/sub-event")
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredEvents =
    activeTab === "All Events"
      ? events
      : events.filter((e) => e.event_type.toLowerCase() === activeTab.toLowerCase());

  const groupedEvents = filteredEvents.reduce((acc, event) => {
    const key = event.event_type.charAt(0).toUpperCase() + event.event_type.slice(1).toLowerCase(); // Always Capitalize
    if (!acc[key]) acc[key] = [];
    acc[key].push(event);
    return acc;
  }, {});


  return (
    <div className="container-fluid my-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Upcoming Events</h2>
        <p className="text-muted">Explore our latest events by category</p>
      </div>

      {/* Tabs */}
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn ${activeTab === cat ? "btn-primary" : "btn-outline-primary"} rounded-pill`}
            onClick={() => setActiveTab(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events */}
      <div className="container my-5">
        {Object.keys(groupedEvents).map((catName) => (
          <div key={catName} className="mb-5">
            <h3 className="fw-bold mb-4 text-primary">{catName}</h3>
            <div className="row g-4">
              {groupedEvents[catName].map((event) => (
                <div key={event.sub_event_id} className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex">
                  <Link
                    to={`/bookingpage/${event.event_type}`}
                    className="card shadow-lg border-0 event-card w-100 d-flex flex-column text-decoration-none text-dark"
                  >
                    {/* Image */}
                    <div className="overflow-hidden">
                      <img
                        src={event.img}
                        className="card-img-top"
                        alt={event.name}
                        style={{ height: "180px", objectFit: "cover", transition: "0.3s" }}
                      />
                    </div>

                    {/* Body */}
                    <div className="card-body text-center flex-grow-1 d-flex flex-column justify-content-center">
                      <h5 className="card-title fw-bold">{event.name}</h5>
                    </div>

                    {/* Tagline */}
                    <div className="tagline">{event.tagline}</div>

                    {/* Footer Buttons */}
                    <div
                      className="card-footer bg-white border-0 text-center d-flex justify-content-center gap-2 flex-wrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link
                        to={`/bookingpage/${event.event_type}`}
                        className="btn btn-outline-primary rounded-pill btn-sm flex-fill"
                      >
                        <i className="fa fa-ticket me-2"></i> Book Now
                      </Link>
                      <a
                        href="tel:9293888929"
                        className="btn btn-outline-success rounded-pill btn-sm flex-fill"
                      >
                        <i className="fa fa-phone me-2"></i> Call
                      </a>
                    </div>

                    {/* Bottom Info */}
                    <div className="muted-info">
                      Free consultation • Customized packages
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
