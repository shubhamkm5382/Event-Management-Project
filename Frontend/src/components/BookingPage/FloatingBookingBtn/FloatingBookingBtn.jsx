import React, { useEffect, useState } from "react";
import styles from "./FloatingBookingBtn.module.css";

const FloatingBookingButton = ({ bookingFormRef }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const bookingForm = document.getElementById("booking-form") || (bookingFormRef && bookingFormRef.current);

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
        className={`${styles["floating-booking-btn"]} ${show ? styles.show : ""}`}
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
