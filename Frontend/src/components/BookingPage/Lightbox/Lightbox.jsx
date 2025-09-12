import React, { useEffect, useRef } from "react";
import styles from "./Lightbox.module.css";

const Lightbox = ({ images = [], isOpen, currentIndex, onClose, onNext, onPrev }) => {
  const containerRef = useRef(null);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === "ArrowRight") onNext?.();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden"; // Prevent background scroll

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onNext, onPrev, onClose]);

  // Touch swipe navigation
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    let startX = 0;
    let endX = 0;
    const threshold = 50;

    const onTouchStart = (e) => (startX = e.touches[0].clientX);
    const onTouchMove = (e) => (endX = e.touches[0].clientX);
    const onTouchEnd = () => {
      const diff = startX - endX;
      if (Math.abs(diff) > threshold) diff > 0 ? onNext?.() : onPrev?.();
      startX = endX = 0;
    };

    const container = containerRef.current;
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", onTouchEnd);

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [isOpen, onNext, onPrev]);

  if (!isOpen) return null;

  return (
    <div ref={containerRef} className={`${styles.lightbox} ${styles.open}`}>
      {/* Close */}
      <button className={styles["lightbox-close"]} aria-label="Close" onClick={onClose}>
        &times;
      </button>

      {/* Left Nav */}
      <div className={`${styles["lightbox-nav"]} ${styles.left}`} onClick={onPrev}>
        &#10094;
      </div>

      {/* Image */}
      <img
        className={styles["lightbox-img"]}
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        onClick={(e) => e.stopPropagation()}
      />

      {/* Right Nav */}
      <div className={`${styles["lightbox-nav"]} ${styles.right}`} onClick={onNext}>
        &#10095;
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className={styles["lightbox-thumbnails"]}>
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Thumbnail ${i + 1}`}
              className={`${styles.thumbnail} ${i === currentIndex ? styles.active : ""}`}
              onClick={() => i !== currentIndex && (i > currentIndex ? onNext() : onPrev())}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Lightbox;
