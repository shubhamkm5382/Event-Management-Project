import React, { useRef, useEffect } from "react";
import styles from "./GalleryItem.module.css";

export default function GalleryItem({ item, onClick }) {
  const ref = useRef();

useEffect(() => {
  const el = ref.current;
  if (!el) return;

  const resizeGridItem = () => {
    const grid = el.parentNode;
    const rowHeight = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
    );
    const rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue("gap")
    );
    const mediaEl = el.querySelector("img, video");
    if (!mediaEl) return;

    const contentHeight = mediaEl.getBoundingClientRect().height;
    const rowSpan = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));
    el.style.gridRowEnd = `span ${rowSpan}`;
  };

  const observer = new ResizeObserver(resizeGridItem);
  observer.observe(el);

  return () => observer.disconnect();
}, [item]);


  return (
    <article
      ref={ref}
      className={styles["gallery-item"]}
      onClick={onClick}
    >
      {item.media_type === "photo" && (
        <img
          className={styles["gallery-image"]}
          src={item.media_url}
          alt={item.media_title}
          loading="lazy"
        />
      )}

{item.media_type === "video" && (
  <video
    className={styles["gallery-video"]}
    src={item.media_url}
    muted
    loop
    playsInline
    preload="metadata"
    onMouseEnter={e => e.target.play()}
    onMouseLeave={e => e.target.pause()}
  />
)}

{item.media_type === "short" && (
  <video
    className={styles["gallery-shorts"]}
    src={item.media_url}
    muted
    loop
    playsInline
    preload="metadata"
    onMouseEnter={e => e.target.play()}
    onMouseLeave={e => e.target.pause()}
  />
)}


      <div className={styles.overlay}>
        <h3 className={styles["image-title"]}>{item.media_title}</h3>
        <p className={styles["image-desc"]}>{item.media_description}</p>
        <div className={styles["image-meta"]}>
          <div>
            <i className="fas fa-map-marker-alt"></i> {item.media_location}
          </div>
          <div>
            <i className="fas fa-calendar"></i>{" "}
            {new Date(item.media_date).toISOString().split("T")[0]}
          </div>
        </div>
      </div>
    </article>
  );
}
