import React, { useEffect, useRef } from "react";
import styles from "./Lightbox.module.css";

export default function Lightbox({ item, onClose, onPrev, onNext }) {
  const containerRef = useRef(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") onNext?.();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden"; // Prevent scroll

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onNext, onPrev, onClose]);

  // Touch swipe
  useEffect(() => {
    if (!containerRef.current) return;

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
  }, [onNext, onPrev]);

  // If no item, render nothing (hooks have already run)
  if (!item) return null;

  const renderMedia = () => {
    if (item.media_type === "video" || item.media_type === "short") {
      return (
        <video
          src={item.media_url}
          controls
          autoPlay
          preload="metadata"
          className={styles.media}
        />
      );
    }
    return (
      <img
        src={item.media_url}
        alt={item.media_title}
        loading="lazy"
        className={styles.media}
      />
    );
  };

  return (
    <div ref={containerRef} className={`${styles.lightbox} ${styles.open}`}>
      {/* Close */}
      <button className={styles["lb-close"]} onClick={onClose}>
        &times;
      </button>

      {/* Left Nav */}
      <button className={styles["lb-prev"]} onClick={onPrev}>
        &#10094;
      </button>

      {/* Content */}
      <div className={styles["lb-wrap"]}>
        {renderMedia()}
        {(item.media_title || item.media_description) && (
          <div className={styles.caption}>
            {item.media_title} — {item.media_description}
          </div>
        )}
      </div>

      {/* Right Nav */}
      <button className={styles["lb-next"]} onClick={onNext}>
        &#10095;
      </button>
    </div>
  );
}
