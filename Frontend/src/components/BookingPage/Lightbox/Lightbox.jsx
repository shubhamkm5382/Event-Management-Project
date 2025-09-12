import React, { useEffect, useRef } from "react";
import styles from "./Lightbox.module.css";

const Lightbox = ({ images = [], isOpen, currentIndex, onClose, onNext, onPrev }) => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  // Keyboard events
  useEffect(() => {
    if (!isOpen) return;

    // focus close button for accessibility
    const closeBtn = document.querySelector(`.${styles["lightbox-close"]}`);
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

  // Touch swipe events
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
      if (e.touches.length === 1) touchStartX = e.touches[0].clientX;
    };
    const onTouchMove = (e) => {
      if (e.touches.length === 1) touchEndX = e.touches[0].clientX;
    };
    const onTouchEnd = () => {
      const dx = touchStartX - touchEndX;
      if (Math.abs(dx) > minSwipeDistance) {
        dx > 0 ? onNext?.() : onPrev?.();
      }
      touchStartX = 0;
      touchEndX = 0;
    };

    const lb = containerRef.current;
    lb.addEventListener("touchstart", onTouchStart, { passive: true });
    lb.addEventListener("touchmove", onTouchMove, { passive: true });
    lb.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      lb.removeEventListener("touchstart", onTouchStart);
      lb.removeEventListener("touchmove", onTouchMove);
      lb.removeEventListener("touchend", onTouchEnd);
    };
  }, [isOpen, onNext, onPrev]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className={`${styles.lightbox} ${styles.open}`}
      aria-hidden={!isOpen}
    >
      {/* Close Button */}
      <button
        className={styles["lightbox-close"]}
        aria-label="Close (Esc)"
        onClick={onClose}
      >
        &times;
      </button>

      {/* Left Navigation */}
      <div
        className={`${styles["lightbox-nav"]} ${styles.left}`}
        onClick={(e) => {
          e.stopPropagation();
          onPrev?.();
        }}
        aria-hidden="true"
      >
        &#10094;
      </div>

      {/* Image */}
      <img
        ref={imgRef}
        className={styles["lightbox-img"]}
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        onClick={(e) => e.stopPropagation()}
      />

      {/* Right Navigation */}
      <div
        className={`${styles["lightbox-nav"]} ${styles.right}`}
        onClick={(e) => {
          e.stopPropagation();
          onNext?.();
        }}
        aria-hidden="true"
      >
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
              className={`${styles.thumbnail} ${
                i === currentIndex ? styles.active : ""
              }`}
              onClick={() => {
                if (i !== currentIndex) {
                  if (i > currentIndex) {
                    onNext?.();
                  } else {
                    onPrev?.();
                  }
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Lightbox;
