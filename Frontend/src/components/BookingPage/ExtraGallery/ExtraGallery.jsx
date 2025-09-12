import React, { forwardRef, useEffect, useRef } from "react";
import styles from "./ExtraGallery.module.css";

const ExtraGallery = forwardRef(({ images = [], onImageClick }, ref) => {
  const itemRefs = useRef([]);

  // Function to resize one grid item
  function resizeGridItem(el) {
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

  // Resize all grid items
  function resizeAllGridItems() {
    itemRefs.current.forEach((el) => resizeGridItem(el));
  }

  useEffect(() => {
    resizeAllGridItems(); // run on mount
    window.addEventListener("resize", resizeAllGridItems);
    return () => window.removeEventListener("resize", resizeAllGridItems);
  }, [images]);

  return (
    <div ref={ref} className={styles["extra-gallery"]}>
      {images.map((src, idx) => (
        <div
          key={idx}
          ref={(el) => (itemRefs.current[idx] = el)}
          className={styles["extra-gallery-item"]}
          role="button"
          tabIndex="0"
          onClick={() => onImageClick && onImageClick(idx)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onImageClick && onImageClick(idx);
          }}
        >
          <img
            src={src}
            alt={`Extra ${idx + 1}`}
            loading="lazy"
            onLoad={(e) => resizeGridItem(e.target.parentNode)} // ✅ fix: adjust after image load
          />
        </div>
      ))}
    </div>
  );
});

export default ExtraGallery;
