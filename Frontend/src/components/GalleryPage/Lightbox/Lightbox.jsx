import React from "react";
import "./Lightbox.css";

export default function Lightbox({ item, onClose, onPrev, onNext }) {
  if (!item) return null;

  return (
    <div className="lightbox open">
      <button className="lb-close" onClick={onClose}>
        &times;
      </button>
      <button className="lb-prev" onClick={onPrev}>
        &#10094;
      </button>

      <div className="lb-wrap">
        <img src={item.url} alt={item.title} />
        <div className="caption">
          {item.title} — {item.description}
        </div>
      </div>

      <button className="lb-next" onClick={onNext}>
        &#10095;
      </button>
    </div>
  );
}
