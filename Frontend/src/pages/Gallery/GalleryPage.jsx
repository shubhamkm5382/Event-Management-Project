import React, { useState, useEffect } from "react";
import './GalleryPage.css'

export default function Gallery() {
  const categories = ["photo", "video", "shorts", "album"];
  const [activeCategory, setActiveCategory] = useState("photo");
  const [items, setItems] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Backend से data fetch
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/gallery?category=${activeCategory}`);
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    fetchData();
  }, [activeCategory]);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <div>
      {/* Cover */}
      <section className="cover">
        <div className="cover-content">
          <h1 className="cover-title">Photos Gallery of Melodia</h1>
          <p className="cover-subtitle">
            Fast loading — fetch category wise data
          </p>
        </div>
      </section>

      <div className="container">
        {/* Tabs */}
        <div className="filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery */}
        <div className="gallery">
          {items.map((item, index) => (
            <article
              key={item.id}
              className="gallery-item"
              onClick={() => openLightbox(index)}
            >
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
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && items.length > 0 && (
        <div className="lightbox open">
          <button className="lb-close" onClick={closeLightbox}>
            &times;
          </button>
          <button className="lb-prev" onClick={prevItem}>
            &#10094;
          </button>

          <div className="lb-wrap">
            <img
              src={items[currentIndex].url}
              alt={items[currentIndex].title}
            />
            <div className="caption">
              {items[currentIndex].title} — {items[currentIndex].description}
            </div>
          </div>

          <button className="lb-next" onClick={nextItem}>
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
}
