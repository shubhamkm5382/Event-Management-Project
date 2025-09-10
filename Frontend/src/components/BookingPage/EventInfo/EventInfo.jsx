import React from "react";
import styles from "./EventInfo.module.css";
import Packages from "../Packages/Packages";

const EventInfo = () => {
  return (
    <div className={styles.info}>
      <h1>Grand Wedding Celebration</h1>
      <p className={styles.location}>123 Party Avenue, Patna, Bihar, India</p>

      <div className={styles["quick-info"]}>
        <span><b>Event Type:</b> Wedding</span>
        <span><b>Guests:</b> Up to 300</span>
        <span><b>Date:</b> Flexible</span>
        <span><b>Price:</b> ₹1,50,000+</span>
      </div>

      <p className={styles.description}>
        Celebrate your special moments at our premium wedding venue. Whether it's a
        traditional ceremony, a modern luxury wedding, or a romantic beach-inspired setup,
        we provide a customizable experience for you and your guests.
      </p>

      <h2>Offered Amenities</h2>
      <ul className={styles.amenities}>
        <li>✔️ Air Conditioning</li>
        <li>✔️ Catering Services</li>
        <li>✔️ Decoration & Lighting</li>
        <li>✔️ Parking Available</li>
        <li>✔️ Live Music / DJ</li>
        <li>✔️ Photography & Videography</li>
      </ul>

      <h2>Popular Wedding Themes</h2>
      <ul className={styles.themes}>
        <li>✨ Traditional & Cultural</li>
        <li>✨ Beach / Coastal</li>
        <li>✨ Luxury & Glamorous</li>
        <li>✨ Rustic & Vintage</li>
        <li>✨ Bohemian Chic</li>
      </ul>

      <Packages />
    </div>
  );
};

export default EventInfo;
