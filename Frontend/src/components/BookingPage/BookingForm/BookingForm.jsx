import React, { forwardRef } from "react";
import styles from "./BookingForm.module.css";

const BookingForm = forwardRef(({ bookingFormRef }, ref) => {
  const appliedRef = ref || bookingFormRef || null;

  return (
    <div className={styles["booking-form"]} ref={appliedRef}>
      <h2 className={styles.title}>Book Your Event</h2>
      <form className={styles.form}>
        {/* Full Name */}
        <label>Full Name</label>
        <input type="text" placeholder="Enter Full Name" required />

        {/* Email */}
        <label>Email</label>
        <input type="email" placeholder="Enter Email" required />

        {/* Mobile */}
        <label>Mobile No</label>
        <input type="text" placeholder="Enter Mobile Number" required />

        {/* Event Type */}
        <label>Event Type</label>
        <select required>
          <option value="">Select type</option>
          <option>Wedding</option>
          <option>Corporate</option>
          <option>Birthday</option>
          <option>Farewell</option>
          <option>Anniversary</option>
        </select>

        {/* Event Date & Time */}
        <div className={styles.row}>
          <div className={styles.col}>
            <label>Event Date</label>
            <input type="date" required />
          </div>
          <div className={styles.col}>
            <label>Event Time</label>
            <input type="time" required />
          </div>
        </div>

        {/* Guests */}
        <label>Guests</label>
        <input type="number" placeholder="Enter number of guests" required />

        {/* Estimated Budget */}
        <label>Estimated Budget</label>
        <input type="text" placeholder="e.g. ₹1,00,000 - ₹10,00,000" required />

        {/* Submit */}
        <button type="submit" className={styles.btn}>Book Now</button>
      </form>
    </div>
  );
});

export default BookingForm;
