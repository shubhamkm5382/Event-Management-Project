import React, { useState } from "react";
import { Link } from "react-router-dom";

const Events = () => {
  // Categories
  const categories = [
    "All Events",
    "Wedding",
    "Conference",
    "Concert",
    "Birthday",
    "Exhibition",
  ];
  const [activeTab, setActiveTab] = useState("All Events");

  // Events Data
  const events = [
    // 🟢 Wedding Events
    {
      id: 1,
      name: "Grand Wedding Ceremony",
      category: "Wedding",
      img: "../../img/heroimg3.jpg",
      date: "12 Oct 2025",
      location: "Patna, Bihar",
      desc: "A royal wedding event with premium arrangements and decoration.",
    },
    {
      id: 2,
      name: "Luxury Palace Wedding",
      category: "Wedding",
      img: "img/event-wedding2.jpg",
      date: "05 Dec 2025",
      location: "Jaipur, Rajasthan",
      desc: "Experience royal vibes with a grand palace wedding.",
    },

    // 🟢 Conference Events
    {
      id: 3,
      name: "Tech Conference 2025",
      category: "Conference",
      img: "img/event-conference.jpg",
      date: "22 Nov 2025",
      location: "Delhi NCR",
      desc: "International speakers and workshops on AI, Web, and Cloud.",
    },
    {
      id: 4,
      name: "Business Leadership Summit",
      category: "Conference",
      img: "img/event-conference2.jpg",
      date: "10 Jan 2026",
      location: "Bangalore",
      desc: "Networking with CEOs and leaders from top companies.",
    },

    // 🟢 Concert Events
    {
      id: 5,
      name: "Live Music Concert",
      category: "Concert",
      img: "img/event-concert.jpg",
      date: "5 Dec 2025",
      location: "Mumbai",
      desc: "Rock the stage with India's top artists performing live.",
    },
    {
      id: 6,
      name: "Bollywood Night",
      category: "Concert",
      img: "img/event-concert2.jpg",
      date: "18 Dec 2025",
      location: "Delhi",
      desc: "Dance and music show with famous Bollywood singers.",
    },

    // 🟢 Birthday Events
    {
      id: 7,
      name: "Birthday Party Celebration",
      category: "Birthday",
      img: "img/event-birthday.jpg",
      date: "18 Sep 2025",
      location: "Lucknow",
      desc: "A grand birthday event with theme decorations and entertainment.",
    },
    {
      id: 8,
      name: "Kids Theme Birthday",
      category: "Birthday",
      img: "img/event-birthday2.jpg",
      date: "02 Oct 2025",
      location: "Patna",
      desc: "Cartoon-themed birthday with games, cake, and fun activities.",
    },

    // 🟢 Exhibition Events
    {
      id: 9,
      name: "Art & Culture Exhibition",
      category: "Exhibition",
      img: "img/event-exhibition.jpg",
      date: "2 Jan 2026",
      location: "Kolkata",
      desc: "Explore art, culture, and handicrafts from across India.",
    },
    {
      id: 10,
      name: "Tech & Innovation Expo",
      category: "Exhibition",
      img: "img/event-exhibition2.jpg",
      date: "15 Feb 2026",
      location: "Hyderabad",
      desc: "Latest innovations in technology and startup showcases.",
    },
  ];

  // Filter Events
  const filteredEvents =
    activeTab === "All Events"
      ? events
      : events.filter((e) => e.category === activeTab);

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="tab-class text-center">
          {/* Header */}
          <div className="row g-4 align-items-center mb-4">
            <div className="col-lg-4 col-md-12 text-start text-md-center text-lg-start">
              <h1 className="mb-3 mb-lg-0">Upcoming Events</h1>
            </div>
            <div className="col-lg-8 col-md-12">
              <ul className="nav nav-pills justify-content-center justify-content-lg-end flex-wrap">
                {categories.map((cat) => (
                  <li className="nav-item" key={cat}>
                    <button
                      onClick={() => setActiveTab(cat)}
                      className={`btn m-1 py-2 px-3 ${
                        activeTab === cat
                          ? "btn-primary text-white"
                          : "btn-light text-dark"
                      } rounded-pill`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Events List */}
          <div className="row g-4 mt-4">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="col-12 col-sm-6 col-lg-4 col-xl-3 d-flex"
              >
                <div className="card shadow-sm w-100 rounded-3 overflow-hidden position-relative">
                  <img
                    src={event.img}
                    className="card-img-top"
                    alt={event.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="position-absolute top-0 start-0 m-2 px-3 py-1 bg-secondary text-white rounded">
                    {event.category}
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{event.name}</h5>
                    <p className="card-text small text-muted flex-grow-1">
                      {event.desc}
                    </p>
                    <p className="mb-1">
                      <strong>Date:</strong> {event.date}
                    </p>
                    <p className="mb-3">
                      <strong>Location:</strong> {event.location}
                    </p>
                    <div className="d-flex justify-content-between gap-2 flex-wrap">
                      <Link
                        href="#"
                        className="btn btn-outline-primary flex-fill rounded-pill"
                      >
                        <i className="fa fa-ticket me-2"></i> Book Now
                      </Link>
                      <a
                        href="#"
                        className="btn btn-outline-success flex-fill rounded-pill"
                      >
                        <i className="fa fa-info-circle me-2"></i> Details
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Events */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-5">
              <h4>No events found in this category</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
