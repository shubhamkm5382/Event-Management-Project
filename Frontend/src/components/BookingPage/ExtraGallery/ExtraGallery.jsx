import React, { forwardRef, useEffect, useRef } from "react";
import styles from "./ExtraGallery.module.css";

const ExtraGallery = forwardRef(({ images = [], onImageClick }, ref) => {
  const itemRefs = useRef([]);

  useEffect(() => {
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

    function resizeAllGridItems() {
      itemRefs.current.forEach((el) => resizeGridItem(el));
    }

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
          onClick={() => onImageClick && onImageClick(idx)}
          tabIndex="0"
          onKeyDown={(e) => {
            if (e.key === "Enter") onImageClick && onImageClick(idx);
          }}
        >
          <img src={src} alt={"Extra " + (idx + 1)} loading="lazy" />
        </div>
      ))}
    </div>
  );
});

export default ExtraGallery;
