import React, { useEffect, useState } from "react";
import styles from "./CoverSection.module.css";

export default function CoverSection({ eventType }) {
  const [coverData, setCoverData] = useState({});

  useEffect(() => {
    async function fetchCover() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/events/cover_section/${eventType}`
        );
        const data = await res.json();
        setCoverData(data);
      } catch (error) {
        console.error("Error fetching cover section:", error);
      }
    }

    if (eventType) {
      fetchCover();
    }
  }, [eventType]);
  // console.log(coverData);

  return (
    <section
      className={styles.cover}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.55)), url(${coverData?.data?.cover_image ||
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          })`,
      }}
    >
      <div className={styles["cover-content"]}>
        <h1 className={styles["cover-title"]}>
          {coverData?.data?.event_title || "Event"} - Gallery of LuxeEvents
        </h1>

        <p className={styles["cover-subtitle"]}>
          {coverData?.data?.event_subtitle ||
            "Explore our curated collection of event photos, videos, shorts, and albums"}
        </p>

      </div>
    </section>
  );
}
