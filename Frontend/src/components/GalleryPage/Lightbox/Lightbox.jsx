import React from "react";
import styles from "./Lightbox.module.css";

export default function Lightbox({ item, onClose, onPrev, onNext }) {
  if (!item) return null;

  const renderMedia = () => {
    if (item.media_type === "video" || item.media_type === "short") {
      return (
        <video
          src={item.media_url}
          controls
          autoPlay
          className={styles.media}
        />
      );
    }
    return (
      <img
        src={item.media_url}
        alt={item.media_title}
        className={styles.media}
      />
    );
  };

  return (
    <div className={`${styles.lightbox} ${styles.open}`}>
      <button className={styles["lb-close"]} onClick={onClose}>
        &times;
      </button>
      <button className={styles["lb-prev"]} onClick={onPrev}>
        &#10094;
      </button>

      <div className={styles["lb-wrap"]}>
        {renderMedia()}
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
