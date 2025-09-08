import React from "react";
import styles from "./MainGallery.module.css";

const MainGallery = ({ images = [], onImageClick, scrollToExtraGallery, totalImagesCount }) => {
  const extraPhotosCount = Math.max(totalImagesCount - 5, 0);

  const handleViewMoreClick = (e) => {
    e.stopPropagation();
    if (scrollToExtraGallery) {
      scrollToExtraGallery();
    }
  };

  return (
    <div className={styles.gallery}>
      {images.slice(0, 5).map((img, index) => {
        // Wrapper div classes
        let wrapperClass = "";
        if (index === 0) wrapperClass = styles["gallery-main"];
        if (index === 4) wrapperClass = styles["view-more"];

        return (
          <div key={index} className={wrapperClass}>
            <img
              src={img}
              alt={`Gallery Image ${index + 1}`}
              onClick={() => onImageClick && onImageClick(index)}
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === "Enter") onImageClick && onImageClick(index);
              }}
            />

            {/* Overlay सिर्फ 5th image (index 4) पर */}
            {index === 4 && extraPhotosCount > 0 && (
              <div className={styles.overlay} onClick={handleViewMoreClick}>
                +{extraPhotosCount} Photos
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MainGallery;
