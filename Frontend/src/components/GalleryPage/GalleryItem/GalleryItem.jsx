import React, { useRef, useEffect } from "react";
import styles from "./GalleryItem.module.css";

export default function GalleryItem({ item, onClick }) {
  const ref = useRef();

  useEffect(() => {
    function resizeGridItem() {
      const el = ref.current;
      if (!el) return;

      const grid = el.parentNode;
      const rowHeight = parseInt(
        window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
      );
      const rowGap = parseInt(
        window.getComputedStyle(grid).getPropertyValue("gap")
      );
      const contentHeight = el.querySelector("img").getBoundingClientRect().height;
      const rowSpan = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));
      el.style.gridRowEnd = `span ${rowSpan}`;
    }

    resizeGridItem(); // run once on mount

    // recalc on window resize (responsive)
    window.addEventListener("resize", resizeGridItem);
    return () => window.removeEventListener("resize", resizeGridItem);
  }, [item]);

  return (
    <article
      ref={ref}
      className={styles["gallery-item"]}
      onClick={onClick}
    >
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
