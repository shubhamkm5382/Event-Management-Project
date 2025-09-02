import React from 'react';

const Bedding = () => {
  const events = [
    {
      title: "Grand Wedding Ceremony",
      desc: "A royal wedding event with premium arrangements and decoration.",
      date: "12 Oct 2025",
      location: "Patna, Bihar",
      img: "https://via.placeholder.com/300x200?text=Wedding+1"
    },
    {
      title: "Destination Beach Wedding",
      desc: "Celebrate love with a romantic beachside wedding setup.",
      date: "20 Nov 2025",
      location: "Goa, India",
      img: "https://via.placeholder.com/300x200?text=Wedding+2"
    },
    {
      title: "Luxury Palace Wedding",
      desc: "Experience royal vibes with a grand palace wedding.",
      date: "05 Dec 2025",
      location: "Jaipur, Rajasthan",
      img: "https://via.placeholder.com/300x200?text=Wedding+3"
    },
    {
      title: "Garden Wedding Celebration",
      desc: "A beautiful wedding surrounded by nature and floral decor.",
      date: "18 Dec 2025",
      location: "Lucknow, UP",
      img: "https://via.placeholder.com/300x200?text=Wedding+4"
    },
    {
      title: "Traditional South Indian Wedding",
      desc: "An authentic cultural wedding with rituals and traditions.",
      date: "10 Jan 2026",
      location: "Chennai, Tamil Nadu",
      img: "https://via.placeholder.com/300x200?text=Wedding+5"
    },
    {
      title: "Destination Hilltop Wedding",
      desc: "Celebrate love in the mountains with breathtaking views.",
      date: "25 Jan 2026",
      location: "Manali, Himachal",
      img: "https://via.placeholder.com/300x200?text=Wedding+6"
    },
    {
      title: "Luxury Cruise Wedding",
      desc: "Tie the knot on a luxury cruise with family and friends.",
      date: "14 Feb 2026",
      location: "Mumbai, Maharashtra",
      img: "https://via.placeholder.com/300x200?text=Wedding+7"
    },
    {
      title: "Royal Heritage Wedding",
      desc: "An elegant wedding event in a heritage property.",
      date: "01 Mar 2026",
      location: "Udaipur, Rajasthan",
      img: "https://via.placeholder.com/300x200?text=Wedding+8"
    }
  ];

  return (
    <div className="bedding container py-5">
      <h1 className="mb-4 text-center text-primary">Wedding Events</h1>
      <div className="row g-4">
        {events.map((event, index) => (
          <div className="col-lg-3 col-md-6" key={index}>
            <div className="card shadow-sm border-0 rounded h-100">
              <img src={event.img} className="card-img-top rounded-top" alt={event.title} />
              <div className="card-body text-center">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text">{event.desc}</p>
                <h6><span className="fw-bold">Date: </span>{event.date}</h6>
                <h6><span className="fw-bold">Location: </span>{event.location}</h6>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button className="btn btn-primary btn-sm">Book Now</button>
                <button className="btn btn-outline-secondary btn-sm">Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bedding;
