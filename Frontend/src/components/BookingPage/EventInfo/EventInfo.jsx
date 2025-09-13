import React from "react";
import styles from "./EventInfo.module.css";
import Packages from "../Packages/Packages";

const parseList = (v) => {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  if (typeof v === "string") {
    const t = v.trim();
    // अगर JSON array string है
    if (t.startsWith("[")) {
      try { return JSON.parse(t); } catch { /* fallthrough */ }
    }
    // otherwise treat as CSV: "A, B, C"
    return t.split(",").map(s => s.trim()).filter(Boolean);
  }
  return [];
};

const EventInfo = ({ eventInfo }) => {
  const info = Array.isArray(eventInfo) && eventInfo.length ? eventInfo[0] : eventInfo;
  if (!info) return <p>No event info available</p>;

  const amenities = parseList(info.amenities);
  const themes = parseList(info.themes);
  const packages = parseList(info.packages);

  return (
    <div className={styles.info}>
      <h1>{info.title}</h1>
      <p className={styles.location}>{info.location}</p>

      <div className={styles["quick-info"]}>
        <span><b>Event Type:</b> {info.event_type}</span>
        <span><b>Guests:</b> {info.guests}</span>
        <span><b>Date:</b> {info.date_info}</span>
        <span><b>Price:</b> {info.price}</span>
      </div>

      <p className={styles.description}>{info.description}</p>

      {amenities.length > 0 && (
        <>
          <h2>Offered Amenities</h2>
          <ul className={styles.amenities}>
            {amenities.map((a, i) => <li key={i}>✔️ {a}</li>)}
          </ul>
        </>
      )}

      {themes.length > 0 && (
        <>
          <h2>Popular Themes</h2>
          <ul className={styles.themes}>
            {themes.map((t, i) => <li key={i}>✨ {t}</li>)}
          </ul>
        </>
      )}

      {packages.length > 0 && <Packages packages={packages} />}
    </div>
  );
};

export default EventInfo;