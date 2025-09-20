import React, { useEffect } from "react";
import styles from "./Gallery.module.css";

export default function GallerySection() {
  useEffect(() => {
    const wrap = document.getElementById("wrap");
    const carousel = document.getElementById("carousel");

    if (!wrap || !carousel) {
      console.error("Carousel elements not found.");
      return;
    }

    // Set CSS custom properties
    document.documentElement.style.setProperty("--gap", "42px");
    document.documentElement.style.setProperty("--img-w", "220px");
    document.documentElement.style.setProperty("--img-h", "350px");
    document.documentElement.style.setProperty("--scale-max", "1.2");

    // Double the carousel content for continuous loop effect
    if (carousel.innerHTML.split("carouselItem").length - 1 < photos.length * 2) {
      carousel.innerHTML += carousel.innerHTML;
    }
    const imgs = Array.from(carousel.querySelectorAll("img"));

    let scrollX = 0;
    let speed = 0.8;
    let paused = false;
    let dragging = false;
    let dragStartX = 0;
    let dragStartScroll = 0;
    let resumeTimer = null;
    let lastFrameTime = 0;
    let pointerInside = false;

    function getSingleWidth() {
      return carousel.scrollWidth / 2 || 1;
    }

    function norm(x) {
      const w = getSingleWidth();
      let r = x % w;
      if (r < 0) r += w;
      return r;
    }

    function render() {
      const displayX = norm(scrollX);
      carousel.style.transform = `translate(${-displayX}px, -50%)`;

      const wrapRect = wrap.getBoundingClientRect();
      const centerX = wrapRect.left + wrapRect.width / 2;
      imgs.forEach((img) => {
        const r = img.getBoundingClientRect();
        const imgCenter = r.left + r.width / 2;
        const dist = Math.abs(centerX - imgCenter);
        const max = wrapRect.width / 2;
        const t = Math.max(0, 1 - dist / max);
        const scale = 1 + (1.2 - 1) * Math.pow(t, 1.4);
        img.style.transform = `scale(${scale})`;
        img.style.zIndex = Math.round(scale * 100);
        img.style.boxShadow =
          scale > 1.01
            ? "0 12px 30px rgba(2,6,23,0.18)"
            : "0 6px 18px rgba(2,6,23,0.06)";
      });
    }

    function step(ts) {
      if (!lastFrameTime) lastFrameTime = ts;
      const dt = ts - lastFrameTime;
      lastFrameTime = ts;

      if (!paused && !dragging) {
        const px = speed * (dt / (1000 / 60));
        scrollX += px;
      }
      render();
      requestAnimationFrame(step);
    }
    const animationFrameId = requestAnimationFrame(step);

    function pauseAuto() {
      paused = true;
      if (resumeTimer) clearTimeout(resumeTimer);
    }

    function resumeAutoWithDelay(delay = 1200) {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        paused = false;
      }, delay);
    }

    const handleWheelEvent = (e) => {
      if (e.currentTarget === window && !pointerInside) return;
      const LINE_HEIGHT = 16;
      const factor = e.deltaMode === 1 ? LINE_HEIGHT : 1;
      const dx = (e.deltaX || 0) * factor;
      const dy = (e.deltaY || 0) * factor;
      const combined = dx + dy * 0.9;
      if (Math.abs(combined) < 0.5) return;
      e.preventDefault();
      pauseAuto();
      scrollX += combined * 0.9;
      render();
      resumeAutoWithDelay(900);
    };

    const handleMouseDown = (e) => {
      dragging = true;
      dragStartX = e.clientX;
      dragStartScroll = scrollX;
      pauseAuto();
      wrap.classList.add(styles.dragging);
    };

    const handleMouseMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - dragStartX;
      scrollX = dragStartScroll - dx;
      render();
    };

    const handleMouseUp = () => {
      if (!dragging) return;
      dragging = false;
      wrap.classList.remove(styles.dragging);
      resumeAutoWithDelay(900);
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 0) return;
      dragging = true;
      const t = e.touches[0];
      dragStartX = t.clientX;
      dragStartScroll = scrollX;
      pauseAuto();
    };

    const handleTouchMove = (e) => {
      if (!dragging) return;
      const t = e.touches[0];
      const dx = t.clientX - dragStartX;
      scrollX = dragStartScroll - dx;
      render();
    };

    const handleTouchEnd = () => {
      if (!dragging) return;
      dragging = false;
      resumeAutoWithDelay(800);
    };

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        pauseAuto();
        scrollX += 260;
        resumeAutoWithDelay(800);
      }
      if (e.key === "ArrowLeft") {
        pauseAuto();
        scrollX -= 260;
        resumeAutoWithDelay(800);
      }
    };

    // Event Listeners setup
    wrap.addEventListener("mouseenter", () => {
      pointerInside = true;
      pauseAuto();
    });
    wrap.addEventListener("mouseleave", () => {
      pointerInside = false;
      resumeAutoWithDelay(600);
    });
    wrap.addEventListener("wheel", handleWheelEvent, { passive: false });
    window.addEventListener("wheel", handleWheelEvent, { passive: false });
    wrap.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    wrap.addEventListener("touchstart", handleTouchStart, { passive: true });
    wrap.addEventListener("touchmove", handleTouchMove, { passive: true });
    wrap.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", render);

    // Initial render
    render();

    // Cleanup function to remove listeners
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resumeTimer);
      wrap.removeEventListener("wheel", handleWheelEvent);
      window.removeEventListener("wheel", handleWheelEvent);
      wrap.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      wrap.removeEventListener("touchstart", handleTouchStart);
      wrap.removeEventListener("touchmove", handleTouchMove);
      wrap.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", render);
      wrap.removeEventListener("mouseenter", () => { }); // No-op for cleanup
      wrap.removeEventListener("mouseleave", () => { }); // No-op for cleanup
    };
  }, []);

  return (
    <section className={styles.gallerySection} id="gallery">
      <h2 className={styles.sectionTitle}>MY RECENT WORK</h2>

      <div className={`${styles.carouselWrap} ${styles.grab}`} id="wrap">
        <div className={styles.carousel} id="carousel">
          {photos.map((photo, i) => (
            <div className={styles.carouselItem} key={i}>
              <img src={photo.src} alt={photo.title} />
              <div className={styles.photoDetails}>
                <h4 className={styles.photoTitle}>{photo.title}</h4>
                <p className={styles.photoLocation}>{photo.location}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.centerLine} aria-hidden="true"></div>
      </div>
    </section>
  );
}

const photos = [
  {
    src: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
    title: "Southern Charm",
    location: "Charleston, SC",
  },
  {
    src: "https://images.pexels.com/photos/19662657/pexels-photo-19662657.jpeg",
    title: "City Lights Love",
    location: "New York City",
  },
  {
    src: "https://images.pexels.com/photos/2306279/pexels-photo-2306279.jpeg",
    title: "Winter Wonderland",
    location: "Bavarian Alps",
  },
  {
    src: "https://images.pexels.com/photos/28450666/pexels-photo-28450666.jpeg",
    title: "Vineyard Romance",
    location: "Napa Valley",
  },
  {
    src: "https://images.pexels.com/photos/12688994/pexels-photo-12688994.jpeg",
    title: "Mountain Majesty",
    location: "Aspen, Colorado",
  },
  {
    src: "https://images.pexels.com/photos/13788178/pexels-photo-13788178.jpeg",
    title: "Beachside Vows",
    location: "Malibu, California",
  },
  {
    src: "https://images.pexels.com/photos/33925577/pexels-photo-33925577.jpeg",
    title: "Golden Hour Magic",
    location: "Lake Como, Italy",
  },
  {
    src: "https://images.pexels.com/photos/26447532/pexels-photo-26447532.jpeg",
    title: "Forest Whispers",
    location: "Black Forest, Germany",
  },
];