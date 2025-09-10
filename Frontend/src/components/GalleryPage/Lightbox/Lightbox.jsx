import React from "react";
import styles from "./Lightbox.module.css";

export default function Lightbox({ item, onClose, onPrev, onNext }) {
  if (!item) return null;

  return (
    <div className={`${styles.lightbox} ${styles.open}`}>
      <button className={styles["lb-close"]} onClick={onClose}>
        &times;
      </button>
      <button className={styles["lb-prev"]} onClick={onPrev}>
        &#10094;
      </button>

      <div className={styles["lb-wrap"]}>
        <img src={item.media_url} alt={item.media_title} />
        <div className={styles.caption}>
          {item.media_title} — {item.media_description}
        </div>
      </div>

      <button className={styles["lb-next"]} onClick={onNext}>
        &#10095;
      </button>
    </div>
  );
}
