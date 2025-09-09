import React from "react";
import styles from "./CoverSection.module.css";

export default function CoverSection() {
  return (
    <section className={styles.cover}>
      <div className={styles["cover-content"]}>
        <h1 className={styles["cover-title"]}>Event Gallery of LuxeEvents</h1>
        <p className={styles["cover-subtitle"]}>
          Explore our curated collection of event photos, videos, shorts, and albums
        </p>
      </div>
    </section>
  );
}
