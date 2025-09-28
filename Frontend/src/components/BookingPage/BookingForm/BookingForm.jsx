import React, { forwardRef, useState } from "react";
import styles from "./BookingForm.module.css";
import Swal from "sweetalert2";
import * as bootstrap from "bootstrap"; // ✅ Proper import

const BookingForm = forwardRef(({ bookingFormRef }, ref) => {
  const appliedRef = ref || bookingFormRef || null;

  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();

    const bookingData = {
      building: bookingFormRef?.id || "default_building",
      user_name: fullName,
      email: email,
      mobile_number: mobile,
      event_type: eventType,
      event_date: eventDate,
    };

    try {
      const response = await fetch(
        "/api/bookings/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        }
      );

      if (!response.ok) throw new Error("Failed to book the room");

      await response.json();

      Swal.fire({
        icon: "success",
        title: "Booking Successful!",
        text: "Your booking has been confirmed.",
        confirmButtonText: "OK",
      });

      // ✅ Close modal
      const modalEl = document.getElementById("myModalcontact");
      if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
      }

      // ✅ Reset form fields
      setFullname("");
      setEmail("");
      setMobile("");
      setEventType("");
      setEventDate("");
    } catch (error) {
      console.error("Booking error:", error); // ✅ Error logged
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: error.message || "Something went wrong. Please try again later.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className={styles["booking-form"]} ref={appliedRef}>
      <h2 className={styles.title}>Book Your Event</h2>
      <form className={styles.form} onSubmit={handleBooking}>
        {/* Full Name */}
        <label>Full Name</label>
        <input
          type="text"
          placeholder="Enter Full Name"
          required
          value={fullName}
          onChange={(e) => setFullname(e.target.value)}
        />

        {/* Email */}
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Mobile */}
        <label>Mobile No</label>
        <input
          type="number"
          placeholder="Enter Mobile Number"
          required
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        {/* Event Type */}
        <label>Event Type</label>
        <select
          required
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        >
          <option value="">Select type</option>
          <option>Wedding</option>
          <option>Corporate</option>
          <option>Birthday</option>
          <option>Farewell</option>
          <option>Anniversary</option>
        </select>

        {/* Event Date */}
        <div className={styles.row}>
          <div className={styles.col}>
            <label>Event Date</label>
            <input
              type="date"
              required
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className={styles.btn}>
          Book Now
        </button>
      </form>
    </div>
  );
});

export default BookingForm;
