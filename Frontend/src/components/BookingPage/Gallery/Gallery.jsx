import React, { useRef } from "react";
import "./Gallery.css";

const Gallery = ({ images = [], onImageClick }) => {
  const extraGalleryRef = useRef(null);

  // Scroll-to-extra-gallery helper (used when overlay clicked)
  const handleViewMoreClick = (e) => {
    e.stopPropagation();
    const extra = document.querySelector(".extra-gallery");
    if (extra) {
      extra.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="gallery">
      <div className="gallery-main">
        <img
          src={images[0]}
          alt="Wedding Venue"
          onClick={() => onImageClick && onImageClick(0)}
          tabIndex="0"
          onKeyDown={(e) => { if (e.key === "Enter") onImageClick && onImageClick(0); }}
        />
      </div>

      <div>
        <img
          src={images[1]}
          alt="Outdoor Venue"
          onClick={() => onImageClick && onImageClick(1)}
          tabIndex="0"
          onKeyDown={(e) => { if (e.key === "Enter") onImageClick && onImageClick(1); }}
        />
      </div>

      <div>
        <img
          src={images[2]}
          alt="Stage Setup"
          onClick={() => onImageClick && onImageClick(2)}
          tabIndex="0"
          onKeyDown={(e) => { if (e.key === "Enter") onImageClick && onImageClick(2); }}
        />
      </div>

      <div>
        <img
          src={images[3]}
          alt="Banquet Hall"
          onClick={() => onImageClick && onImageClick(3)}
          tabIndex="0"
          onKeyDown={(e) => { if (e.key === "Enter") onImageClick && onImageClick(3); }}
        />
      </div>

      <div className="view-more">
        <img
          src={images[4]}
          alt="Dining Decor"
          onClick={() => onImageClick && onImageClick(4)}
          tabIndex="0"
          onKeyDown={(e) => { if (e.key === "Enter") onImageClick && onImageClick(4); }}
        />
        <div className="overlay" onClick={handleViewMoreClick}>+25 Photos</div>
      </div>
    </div>
  );
};

export default Gallery;
