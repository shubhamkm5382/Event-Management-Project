import React from "react";
import "./ExtraGallery.css";

const ExtraGallery = ({ images = [], onImageClick }) => {
  return (
    <div className="extra-gallery">
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
};

export default ExtraGallery;
