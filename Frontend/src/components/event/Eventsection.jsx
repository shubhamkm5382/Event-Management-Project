import React, { useEffect } from "react";


const events = [
  {
    id: 1,
    name: "Grand Wedding Ceremony",
    category: "Wedding",
    img: "img/event-wedding.jpg",
    date: "12 Oct 2025",
    location: "Patna, Bihar",
    desc: "A royal wedding event with premium arrangements and decoration.",
  },
  {
    id: 7,
    name: "Mega Wedding Fest",
    category: "Wedding",
    img: "img/event-wedding2.jpg",
    date: "25 Jan 2026",
    location: "Jaipur",
    desc: "Destination wedding with cultural programs and royal vibes.",
  },
  {
    id: 7,
    name: "Mega Wedding Fest",
    category: "Wedding",
    img: "img/event-wedding2.jpg",
    date: "25 Jan 2026",
    location: "Jaipur",
    desc: "Destination wedding with cultural programs and royal vibes.",
  },
  {
    id: 7,
    name: "Mega Wedding Fest",
    category: "Wedding",
    img: "img/event-wedding2.jpg",
    date: "25 Jan 2026",
    location: "Jaipur",
    desc: "Destination wedding with cultural programs and royal vibes.",
  },
  {
    id: 7,
    name: "Mega Wedding Fest",
    category: "Wedding",
    img: "img/event-wedding2.jpg",
    date: "25 Jan 2026",
    location: "Jaipur",
    desc: "Destination wedding with cultural programs and royal vibes.",
  },
  // Aap aur wedding events yaha add kar sakte ho
];

const WeddingEvents = () => {
  useEffect(() => {
    const scrollBox = document.querySelector(".wedding-scroll");
    let scrollAmount = 0;

    const slide = setInterval(() => {
      if (scrollBox) {
        scrollAmount += 2; // speed
        if (scrollAmount >= scrollBox.scrollWidth - scrollBox.clientWidth) {
          scrollAmount = 0; // reset
        }
        scrollBox.scrollTo({ left: scrollAmount, behavior: "smooth" });
      }
    }, 50);

    return () => clearInterval(slide);
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">💍 Wedding Events</h2>

      <div
        className="d-flex gap-3 wedding-scroll"
        style={{
          overflowX: "auto",
          scrollBehavior: "smooth",
          whiteSpace: "nowrap",
        }}
      >
        {events.map((event) => (
          <div
            key={event.id}
            className="card shadow-sm"
            style={{ minWidth: "280px", flex: "0 0 auto" }}
          >
            <img
              src={event.img}
              className="card-img-top"
              alt={event.name}
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">{event.name}</h5>
              <p className="card-text text-muted">{event.desc}</p>
              <p className="mb-1">
                <i className="bi bi-calendar-event me-2"></i>
                {event.date}
              </p>
              <p className="mb-2">
                <i className="bi bi-geo-alt me-2"></i>
                {event.location}
              </p>
              <a href="#" className="btn btn-outline-primary btn-sm">
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeddingEvents;
