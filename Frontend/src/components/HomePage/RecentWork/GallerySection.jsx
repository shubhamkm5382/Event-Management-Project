import React, { useRef, useEffect, useCallback } from "react";
import styles from "./Gallery.module.css";

export default function GallerySection() {
  const wrapRef = useRef(null);
  const carouselRef = useRef(null);
  const scrollXRef = useRef(0);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const animationRef = useRef(null);

  // Double the photos for seamless looping
  const doubledPhotos = [...photos, ...photos];

  const getSingleWidth = useCallback(() => {
    return carouselRef.current ? carouselRef.current.scrollWidth / 2 : 1;
  }, []);

  const norm = useCallback(
    (x) => {
      const w = getSingleWidth();
      let r = x % w;
      if (r < 0) r += w;
      return r;
    },
    [getSingleWidth]
  );

  const render = useCallback(() => {
    if (!carouselRef.current || !wrapRef.current) return;

    const displayX = norm(scrollXRef.current);
    carouselRef.current.style.transform = `translate(${-displayX}px, -50%)`;

    const wrapRect = wrapRef.current.getBoundingClientRect();
    const centerX = wrapRect.left + wrapRect.width / 2;

    const imgs = carouselRef.current.querySelectorAll("img");
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
  }, [norm]);

  // Auto move
  const autoMove = useCallback(() => {
    if (!draggingRef.current) {
      scrollXRef.current += 0.6; // speed adjust karo
      render();
    }
    animationRef.current = requestAnimationFrame(autoMove);
  }, [render]);

  // Scroll with wheel (only horizontal)
  const handleWheel = useCallback(
    (e) => {
      const LINE_HEIGHT = 16;
      const factor = e.deltaMode === 1 ? LINE_HEIGHT : 1;
      const dx = (e.deltaX || 0) * factor;

      if (Math.abs(dx) < 0.5) return;
      e.preventDefault();

      scrollXRef.current += dx;
      render();
    },
    [render]
  );

  // Mouse drag
  const handleMouseDown = useCallback((e) => {
    draggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartScrollRef.current = scrollXRef.current;
    wrapRef.current.classList.add(styles.dragging);
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - dragStartXRef.current;
      scrollXRef.current = dragStartScrollRef.current - dx;
      render();
    },
    [render]
  );

  const handleMouseUp = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    wrapRef.current.classList.remove(styles.dragging);
  }, []);

  // Touch drag
  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 0) return;
    draggingRef.current = true;
    const t = e.touches[0];
    dragStartXRef.current = t.clientX;
    dragStartScrollRef.current = scrollXRef.current;
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      if (!draggingRef.current) return;
      const t = e.touches[0];
      const dx = t.clientX - dragStartXRef.current;
      scrollXRef.current = dragStartScrollRef.current - dx;
      render();
    },
    [render]
  );

  const handleTouchEnd = useCallback(() => {
    draggingRef.current = false;
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--gap", "42px");
    document.documentElement.style.setProperty("--img-w", "220px");
    document.documentElement.style.setProperty("--img-h", "350px");
    document.documentElement.style.setProperty("--scale-max", "1.2");

    const wrap = wrapRef.current;
    if (!wrap || !carouselRef.current) return;

    wrap.addEventListener("wheel", handleWheel, { passive: false });
    wrap.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    wrap.addEventListener("touchstart", handleTouchStart, { passive: true });
    wrap.addEventListener("touchmove", handleTouchMove, { passive: true });
    wrap.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("resize", render);

    render();

    // ✅ Run autoMove only when section visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!animationRef.current) {
              animationRef.current = requestAnimationFrame(autoMove);
            }
          } else {
            if (animationRef.current) {
              cancelAnimationFrame(animationRef.current);
              animationRef.current = null;
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(wrap);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      observer.disconnect();
      wrap.removeEventListener("wheel", handleWheel);
      wrap.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      wrap.removeEventListener("touchstart", handleTouchStart);
      wrap.removeEventListener("touchmove", handleTouchMove);
      wrap.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", render);
    };
  }, [
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    render,
    autoMove,
  ]);

  return (
    <section className={styles.gallerySection} id="gallery">
      <h2 className={styles.sectionTitle}>MY RECENT WORK</h2>

      <div className={`${styles.carouselWrap} ${styles.grab}`} ref={wrapRef}>
        <div className={styles.carousel} ref={carouselRef}>
          {doubledPhotos.map((photo, i) => (
            <div className={styles.carouselItem} key={i}>
              <img src={photo.src} alt={photo.title} />
            </div>
          ))}
        </div>
        {/* centerLine agar nahi chahiye to hata do */}
        {/* <div className={styles.centerLine} aria-hidden="true"></div> */}
      </div>
    </section>
  );
}

// Full photos list
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
