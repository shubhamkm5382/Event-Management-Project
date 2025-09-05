import React, { useEffect, useState } from "react";
import "./FloatingBookingBtn.css";

const FloatingBookingButton = ({ bookingFormRef }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const bookingForm = document.getElementById("booking-form") || (bookingFormRef && bookingFormRef.current);
    const floatingBtn = document.getElementById("floatingBookingBtn");

    if (!bookingForm) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setShow(false);
        } else {
          setShow(true);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(bookingForm);

    return () => {
      observer.disconnect();
    };
  }, [bookingFormRef]);

  const handleClick = () => {
    const bookingForm = document.getElementById("booking-form") || (bookingFormRef && bookingFormRef.current);
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <>
      <button
        id="floatingBookingBtn"
        className={`floating-booking-btn ${show ? "show" : ""}`}
        onClick={handleClick}
        aria-label="Book Now"
      >
        Book Now
      </button>
      {/* Mobile bottom fixed "Book Now" is same element and will be visible via CSS media queries */}
    </>
  );
};

export default FloatingBookingButton;
