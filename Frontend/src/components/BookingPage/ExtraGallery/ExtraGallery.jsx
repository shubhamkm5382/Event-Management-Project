import React, { forwardRef, useEffect, useRef, useCallback } from "react";
import styles from "./ExtraGallery.module.css";

const ExtraGallery = forwardRef(({ images = [], onImageClick }, ref) => {
  const itemRefs = useRef([]);

  // Function to resize one grid item
  const resizeGridItem = useCallback((el) => {
    if (!el) return;
    const grid = el.parentNode;
    const rowHeight = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
    );
    const rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue("gap")
    );
    const mediaEl = el.querySelector("img");
    if (!mediaEl) return;

    const contentHeight = mediaEl.getBoundingClientRect().height;
    const rowSpan = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));
    el.style.gridRowEnd = `span ${rowSpan}`;
  }, []);

  // Resize all grid items
  const resizeAllGridItems = useCallback(() => {
    itemRefs.current.forEach((el) => resizeGridItem(el));
  }, [resizeGridItem]);

  useEffect(() => {
    resizeAllGridItems();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeAllGridItems, 150);
    };
    window.addEventListener("resize", handleResize);

    const observer = new ResizeObserver(() => {
      resizeAllGridItems();
    });
    itemRefs.current.forEach((el) => el && observer.observe(el));

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [images, resizeAllGridItems]);

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
            onLoad={(e) => resizeGridItem(e.target.parentNode)}
          />
        </div>
      ))}
    </div>
  );
});

export default ExtraGallery;
