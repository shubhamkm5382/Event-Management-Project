import React, { useEffect, useRef, memo } from "react";
import styles from "./Lightbox.module.css";

const Lightbox = ({ images = [], isOpen, currentIndex, onClose, onNext, onPrev }) => {
  const containerRef = useRef(null);

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === "ArrowRight") onNext?.();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handleKey, { passive: true });
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onNext, onPrev, onClose]);

  // Touch swipe
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

  // ✅ Preload next/prev images
  useEffect(() => {
    if (images[currentIndex + 1]) {
      const img = new Image();
      img.src = images[currentIndex + 1];
    }
    if (images[currentIndex - 1]) {
      const img = new Image();
      img.src = images[currentIndex - 1];
    }
  }, [currentIndex, images]);

  if (!isOpen) return null;

  return (
    <div ref={containerRef} className={`${styles.lightbox} ${styles.open}`}>
      <button className={styles["lightbox-close"]} aria-label="Close" onClick={onClose}>
        &times;
      </button>

      <div className={`${styles["lightbox-nav"]} ${styles.left}`} onClick={onPrev}>
        &#10094;
      </div>

      <img
        key={currentIndex}
        className={`${styles["lightbox-img"]} ${styles.fade}`}
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        loading="eager"
        draggable="false"
      />

      <div className={`${styles["lightbox-nav"]} ${styles.right}`} onClick={onNext}>
        &#10095;
      </div>
    </div>
  );
};

export default memo(Lightbox);
