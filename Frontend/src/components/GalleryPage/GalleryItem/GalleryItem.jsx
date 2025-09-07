import React from "react";
import "./GalleryItem.css";

export default function GalleryItem({ item, onClick }) {
  return (
    <article className="gallery-item" onClick={onClick}>
      <img
        className="gallery-image"
        src={item.url}
        alt={item.title}
        loading="lazy"
      />
      <div className="overlay">
        <h3 className="image-title">{item.title}</h3>
        <p className="image-desc">{item.description}</p>
        <div className="image-meta">
          <div>
            <i className="fas fa-map-marker-alt"></i> {item.location}
          </div>
          <div>
            <i className="fas fa-calendar"></i> {item.date}
          </div>
        </div>
      </div>
    </article>
  );
}
