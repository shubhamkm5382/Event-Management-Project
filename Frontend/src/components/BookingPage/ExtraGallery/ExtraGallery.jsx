import React, { forwardRef } from "react";
import styles from "./ExtraGallery.module.css";

const ExtraGallery = forwardRef(({ images = [], onImageClick }, ref) => {
  return (
    <div ref={ref} className={styles["extra-gallery"]}>
      {images.map((src, idx) => {
        return (
          <img
            key={idx}
            src={src}
            alt={"Extra " + (idx + 1)}
            onClick={() => onImageClick && onImageClick(idx)}
            tabIndex="0"
            onKeyDown={(e) => { if (e.key === "Enter") onImageClick && onImageClick(idx); }}
          />
        );
      })}
    </div>
  );
});

export default ExtraGallery;