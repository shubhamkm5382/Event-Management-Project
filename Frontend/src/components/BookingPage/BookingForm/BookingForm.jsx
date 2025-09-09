import React, { forwardRef } from "react";
import styles from "./BookingForm.module.css";

/**
 * BookingForm supports both:
 *  - <BookingForm ref={bookingFormRef} />
 *  - <BookingForm bookingFormRef={bookingFormRef} />
 *
 * This ensures backward compatibility and that the booking form stays sticky/right-side.
 */
const BookingForm = forwardRef(({ bookingFormRef }, ref) => {
  // use the forwarded ref if provided, otherwise use bookingFormRef prop
  const appliedRef = ref || bookingFormRef || null;

  return (
    <div className={styles["booking-form"]} id="booking-form" ref={appliedRef}>
      <h2>Book Your Event</h2>
      <form>
        <label>Event Date</label>
        <input type="date" required />

        <label>Guests</label>
        <input type="number" placeholder="Enter number of guests" required />

        <label>Event Theme</label>
        <select>
          <option>Traditional</option>
          <option>Beach</option>
          <option>Luxury</option>
          <option>Rustic</option>
          <option>Bohemian</option>
        </select>

        <button type="submit">Check Availability</button>
      </form>
    </div>
  );
});

export default BookingForm;
