import React, { useState } from "react";
import { Link } from "react-router-dom";

const Events = () => {
  const [activeTab, setActiveTab] = useState("All Events");

  const categories = [
    "All Events",
    "Wedding",
    "Farewell",
    "Corporate",
    "Birthday",
    "Anniversary",
  ];

  const events = [
    // Wedding Events
    { id: 1, name: "Grand Wedding Ceremony", category: "Wedding", img: "https://www.eternalweddingz.in/storage/vendor_images/I9mT59jiQwDYu8oVCOEX7Y5EhlL6EegoJyKIabBV.webp" },
    { id: 2, name: "Royal Engagement Party", category: "Wedding", img: "https://media.istockphoto.com/id/471906412/photo/beautiful-table-setting-for-an-wedding-reception-or-an-event.jpg?s=612x612&w=0&k=20&c=knlIBspy-ZKuQV7bUVr_eclJmyC24ShNAva_Jh9Rwfc=" },
    { id: 3, name: "Traditional Haldi Function", category: "Wedding", img: "https://i.pinimg.com/564x/42/9b/af/429baf18cbb66c62afa1fcb44918dd6e.jpg" },
    { id: 4, name: "Reception Gala Night", category: "Wedding", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5cDokb8Us6VvyMd-ajbI2ekiPaB8_hjI0Fw&s" },

    // Farewell Events
    { id: 5, name: "College Farewell Bash", category: "Farewell", img: "https://t4.ftcdn.net/jpg/12/72/48/87/360_F_1272488753_bbbmzCaDEVEtD2cIug6sBVhD3OagnRqj.jpg" },
    { id: 6, name: "Office Farewell Party", category: "Farewell", img: "https://priyangaa.in/cdn/shop/articles/farewell_8d095b00-9aeb-4b02-af34-b1811a7a3cf4.jpg?v=1751297680" },
    { id: 7, name: "Teacher Farewell Celebration", category: "Farewell", img: "https://hindustancollege.in/wp-content/gallery/farewell-party/farewell-party3.jpg?x57117" },
    { id: 8, name: "Army Retirement Farewell", category: "Farewell", img: "https://m.media-amazon.com/images/I/717DHz3ocBL._UF1000,1000_QL80_.jpg" },

    // Corporate Events
    { id: 9, name: "Annual Corporate Meet", category: "Corporate", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnyDdLBW29tETzMKBN7K4bgUCYuXJ4YTGzXQ&s" },
    { id: 10, name: "Product Launch Event", category: "Corporate", img: "https://www.aahadecorevents.com/events/corporate-events/corporate-event-management-company-in-chennai.jpg" },
    { id: 11, name: "Business Conference 2025", category: "Corporate", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3zOKvUNveJg2-6CTLfsHOTtnAvK1jkV95WQ&s" },
    { id: 12, name: "Award Ceremony Night", category: "Corporate", img: "https://admin.hire4event.com/assets/ckeditor/uploads/Corporate%20event%20organiser,%20Planner%20in%20Delhi,%20Noida,%20Gurgaon.webp" },

    // Birthday Events
    { id: 13, name: "Kids Birthday Party", category: "Birthday", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqDCur2jl-3ZMJwJqgYL-yoUb5FXwd3JFSCQ&s" },
    { id: 14, name: "21st Birthday Bash", category: "Birthday", img: "https://theforeverevent.com/wp-content/uploads/2022/10/Birthday-Party-planner-1.jpg" },
    { id: 15, name: "Surprise Birthday Event", category: "Birthday", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqDCur2jl-3ZMJwJqgYL-yoUb5FXwd3JFSCQ&s" },
    { id: 16, name: "Grand 50th Birthday", category: "Birthday", img: "https://images-cdn.ubuy.co.in/66f58428e1785c49f27d83d2-rose-gold-birthday-party-decorations.jpg" },

    // Anniversary Events
    { id: 17, name: "Silver Jubilee Anniversary", category: "Anniversary", img: "https://5.imimg.com/data5/SELLER/Default/2023/11/363363931/QM/UK/GO/32940729/anniversary-event-management-service.jpg" },
    { id: 18, name: "Golden Jubilee Celebration", category: "Anniversary", img: "https://eventsolutions.com/wp-content/uploads/2019/11/20th-anniversary-party-with-dramatic-lighting-1-1030x765.jpg.webp" },
    { id: 19, name: "Romantic Anniversary Dinner", category: "Anniversary", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8f1PFf7gsgFk3igk-_ACMHQa0rlgLJq8RrZ7_sMgDWGhDiloZed2MDKHphkQcUYdqBHs&usqp=CAU" },
    { id: 20, name: "25th Anniversary Party", category: "Anniversary", img: "https://4.imimg.com/data4/IR/TC/MY-12958090/anniversary-event-management.jpeg" },
  ];

  const filteredEvents =
    activeTab === "All Events"
      ? events
      : events.filter((e) => e.category === activeTab);

  const groupedEvents = filteredEvents.reduce((acc, event) => {
    if (!acc[event.category]) acc[event.category] = [];
    acc[event.category].push(event);
    return acc;
  }, {});

  return (
    <div className="container-fluid my-5">
      {/* Title */}
      <div className="text-center mb-4">
        <h2 className="fw-bold">Upcoming Events</h2>
        <p className="text-muted">Explore our latest events by category</p>
      </div>

      {/* Tabs */}
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn ${
              activeTab === cat ? "btn-primary" : "btn-outline-primary"
            } rounded-pill`}
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
                <div
                  key={event.id}
                  className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex"
                >
                  {/* Whole Card Clickable */}
                  <Link
                    to={`/bookingpage/${event.category}`}
                    className="card shadow-lg border-0 event-card w-100 d-flex flex-column text-decoration-none text-dark"
                  >
                    {/* Image */}
                    <div className="overflow-hidden">
                      <img
                        src={event.img}
                        className="card-img-top"
                        alt={event.name}
                        style={{
                          height: "180px",
                          objectFit: "cover",
                          transition: "0.3s",
                        }}
                      />
                    </div>

                    {/* Body */}
                    <div className="card-body text-center flex-grow-1 d-flex flex-column justify-content-center">
                      <h5 className="card-title fw-bold">{event.name}</h5>
                    </div>

                    {/* Footer Buttons */}
<div
  className="card-footer bg-white border-0 text-center d-flex justify-content-center gap-2 flex-wrap"
  onClick={(e) => e.stopPropagation()} // Card click रोकने के लिए
>
  <Link
    to={`/bookingpage/${event.category}`}
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
