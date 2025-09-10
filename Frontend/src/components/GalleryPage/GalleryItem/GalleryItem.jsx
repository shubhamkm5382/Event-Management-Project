import React from "react";
import styles from "./GalleryItem.module.css";

export default function GalleryItem({ item, onClick }) {
  return (
    <article className={styles["gallery-item"]} onClick={onClick}>
      <img
        className={styles["gallery-image"]}
        src={item.media_url}
        alt={item.media_title}
        loading="lazy"
      />
      <div className={styles.overlay}>
        <h3 className={styles["image-title"]}>{item.media_title}</h3>
        <p className={styles["image-desc"]}>{item.media_description}</p>
        <div className={styles["image-meta"]}>
          <div>
            <i className="fas fa-map-marker-alt"></i> {item.media_location}
          </div>
        <div>
          <i className="fas fa-calendar"></i>{" "}
          {new Date(item.created_at).toISOString().split("T")[0]}
        </div>

        </div>
      </div>
    </article>
  );
}
