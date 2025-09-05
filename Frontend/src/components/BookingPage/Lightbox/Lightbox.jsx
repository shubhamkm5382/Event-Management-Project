import React, { useEffect, useRef } from "react";
import "./Lightbox.css";

const Lightbox = ({ images = [], isOpen, currentIndex, onClose, onNext, onPrev }) => {
  const imgRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // focus close button for accessibility
    const closeBtn = document.querySelector(".lightbox-close");
    if (closeBtn) closeBtn.focus();

    const handleKey = (e) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight") onNext && onNext();
      else if (e.key === "ArrowLeft") onPrev && onPrev();
      else if (e.key === "Escape") onClose && onClose();
    };

    window.addEventListener("keydown", handleKey);

    // prevent body scroll
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onNext, onPrev, onClose]);

  // Touch swipe support
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
      if (e.touches && e.touches.length === 1) touchStartX = e.touches[0].clientX;
    };
    const onTouchMove = (e) => {
      if (e.touches && e.touches.length === 1) touchEndX = e.touches[0].clientX;
    };
    const onTouchEnd = () => {
      const dx = touchStartX - touchEndX;
      if (Math.abs(dx) > minSwipeDistance) {
        if (dx > 0) onNext && onNext();
        else onPrev && onPrev();
      }
      touchStartX = 0; touchEndX = 0;
    };

    const lb = document.getElementById("lightbox");
    if (lb) {
      lb.addEventListener("touchstart", onTouchStart, { passive: true });
      lb.addEventListener("touchmove", onTouchMove, { passive: true });
      lb.addEventListener("touchend", onTouchEnd, { passive: true });
    }

    return () => {
      if (lb) {
        lb.removeEventListener("touchstart", onTouchStart);
        lb.removeEventListener("touchmove", onTouchMove);
        lb.removeEventListener("touchend", onTouchEnd);
      }
    };
  }, [onNext, onPrev]);

  if (!isOpen) return null;

  return (
    <div id="lightbox" className={`lightbox open`} aria-hidden={!isOpen}>
      <button className="lightbox-close" aria-label="Close (Esc)" onClick={onClose}>&times;</button>

      <div className="lightbox-nav left" data-action="prev" onClick={(e) => { e.stopPropagation(); onPrev && onPrev(); }} aria-hidden="true">&#10094;</div>

      <img
        ref={imgRef}
        className="lightbox-img"
        id="lightbox-img"
        src={images[currentIndex]}
        alt="Enlarged photo"
        onClick={(e) => e.stopPropagation()}
      />

      <div className="lightbox-nav right" data-action="next" onClick={(e) => { e.stopPropagation(); onNext && onNext(); }} aria-hidden="true">&#10095;</div>
    </div>
  );
};

export default Lightbox;
