import React, { useEffect, useState } from "react";
import styles from "./FloatingBookingBtn.module.css";

const FloatingBookingButton = ({ bookingFormRef, category }) => {
  const [show, setShow] = useState(false);

  // Category ke hisaab se button text decide karenge
  const getButtonText = (cat) => {
    switch (cat?.toLowerCase()) {
      case "wedding":
        return "Book Wedding";
      case "corporate":
        return "Book Corporate Event";
      case "birthday":
        return "Book Birthday Party";
      case "anniversary":
        return "Book Anniversary Celebration";
      case "farewell":
        return "Book Farewell";
      case "usa": // example custom
        return "Book USA Event";
      default:
        return "Book Now";
    }
  };

  useEffect(() => {
    const bookingForm =
      document.getElementById("booking-form") ||
      (bookingFormRef && bookingFormRef.current);

    if (!bookingForm) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShow(false);
          } else {
            setShow(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(bookingForm);

    return () => {
      observer.disconnect();
    };
  }, [bookingFormRef]);

  const handleClick = () => {
    const bookingForm =
      document.getElementById("booking-form") ||
      (bookingFormRef && bookingFormRef.current);
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
        aria-label={getButtonText(category)}
      >
        {getButtonText(category)}
      </button>
    </>
  );
};

export default FloatingBookingButton;
