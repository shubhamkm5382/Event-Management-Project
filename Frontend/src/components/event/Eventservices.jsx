import React, { useEffect, useRef } from "react";

const EventServices = () => {
  const sections = [
    {
      title: "Wedding Events",
      events: [
        { img: "img/event1.jpg", title: "Royal Wedding", offer: "30% OFF" },
        { img: "img/event2.jpg", title: "Beach Wedding", offer: "Flat $200 OFF" },
        { img: "img/event3.jpg", title: "Traditional Wedding", offer: "Special Packages" },
        { img: "img/event4.jpg", title: "Destination Wedding", offer: "Discount 25%" },
        { img: "img/event5.jpg", title: "Luxury Wedding", offer: "Save $500" },
      ],
    },
    {
      title: "Corporate Events",
      events: [
        { img: "img/corp1.jpg", title: "Business Meet", offer: "Free Catering" },
        { img: "img/corp2.jpg", title: "Annual Party", offer: "15% OFF" },
        { img: "img/corp3.jpg", title: "Conference", offer: "Special Discount" },
        { img: "img/corp4.jpg", title: "Award Ceremony", offer: "Flat $100 OFF" },
        { img: "img/corp5.jpg", title: "Team Outing", offer: "20% OFF" },
      ],
    },
    {
      title: "Birthday Events",
      events: [
        { img: "img/bday1.jpg", title: "Kids Birthday", offer: "Save $50" },
        { img: "img/bday2.jpg", title: "Theme Birthday", offer: "10% OFF" },
        { img: "img/bday3.jpg", title: "Outdoor Birthday", offer: "Special Gift" },
        { img: "img/bday4.jpg", title: "Surprise Party", offer: "Flat $75 OFF" },
        { img: "img/bday5.jpg", title: "Family Birthday", offer: "20% OFF" },
      ],
    },
  ];

  const scrollRefs = useRef([]);

  useEffect(() => {
    scrollRefs.current.forEach((ref) => {
      if (ref) {
        let scrollAmount = 0;
        let autoScroll;

        const startScroll = () => {
          autoScroll = setInterval(() => {
            if (ref.scrollWidth - ref.clientWidth <= scrollAmount) {
              scrollAmount = 0;
            } else {
              scrollAmount += 2; // speed
            }
            ref.scrollTo({ left: scrollAmount, behavior: "smooth" });
          }, 50);
        };

        const stopScroll = () => clearInterval(autoScroll);

        startScroll();
        ref.addEventListener("mouseenter", stopScroll);
        ref.addEventListener("mouseleave", startScroll);

        return () => {
          stopScroll();
          ref.removeEventListener("mouseenter", stopScroll);
          ref.removeEventListener("mouseleave", startScroll);
        };
      }
    });
  }, []);

  return (
    <div className="container-fluid py-5">
      {sections.map((section, idx) => (
        <div key={idx} className="mb-5">
          <h3 className="mb-3 fw-bold">{section.title}</h3>
          <div
            className="scroll-section d-flex gap-3"
            style={{
              overflowX: "auto",
              scrollbarWidth: "thin",
              scrollBehavior: "smooth",
              paddingBottom: "10px",
            }}
            ref={(el) => (scrollRefs.current[idx] = el)}
          >
            {section.events.map((event, i) => (
              <div
                key={i}
                className="service-item bg-light rounded shadow-sm border"
                style={{
                  flex: "0 0 auto",
                  width: "100%",
                  maxWidth: "280px",
                  transition: "transform 0.3s ease",
                }}
              >
                <img
                  src={event.img}
                  className="img-fluid rounded-top w-100"
                  alt={event.title}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="px-3 rounded-bottom">
                  <div className="service-content bg-primary text-center p-3 rounded">
                    <h5 className="text-white">{event.title}</h5>
                    <h6 className="mb-0 text-light">{event.offer}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Custom scrollbar styling */}
      <style>{`
        .scroll-section::-webkit-scrollbar {
          height: 6px;
        }
        .scroll-section::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .scroll-section::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .service-item:hover {
          transform: translateY(-5px);
        }
        @media (max-width: 768px) {
          .service-item {
            max-width: 200px;
          }
        }
        @media (max-width: 576px) {
          .service-item {
            max-width: 160px;
          }
        }
      `}</style>
    </div>
  );
};

export default EventServices;
