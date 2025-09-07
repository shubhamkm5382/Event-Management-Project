import React, { useState, useEffect } from "react";
import "./GalleryPage.css";
import CoverSection from "../../components/GalleryPage/CoverSection/CoverSection";
import CategoryTabs from "../../components/GalleryPage/CategoryTabs/CategoryTabs";
import GalleryItem from "../../components/GalleryPage/GalleryItem/GalleryItem";
import Lightbox from "../../components/GalleryPage/Lightbox/Lightbox";

const categories = ["photo", "video", "shorts", "album"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("photo");
  const [items, setItems] = useState([
  {
    "id": 1,
    "category": "photo",
    "title": "Mountain View",
    "description": "Beautiful mountain landscape",
    "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "alt": "Mountain",
    "location": "Himachal",
    "date": "Apr 2023"
  },
  {
    "id": 2,
    "category": "photo",
    "title": "Forest Walk",
    "description": "Peaceful trail",
    "url": "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "alt": "Forest",
    "location": "Kerala",
    "date": "Jun 2023"
  },
  {
    "id": 3,
    "category": "photo",
    "title": "Beach",
    "description": "Sunny beach",
    "url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "alt": "Beach",
    "location": "Goa",
    "date": "May 2023"
  },
  {
    "id": 4,
    "category": "photo",
    "title": "Wedding Album",
    "description": "Special memories",
    "url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
    "alt": "Wedding",
    "location": "Rajasthan",
    "date": "Sep 2023"
  },
  {
    "id": 5,
    "category": "photo",
    "title": "Beach",
    "description": "Sunny beach",
    "url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "alt": "Beach",
    "location": "Goa",
    "date": "May 2023"
  }

]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/gallery?category=${activeCategory}`);
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    }
    fetchData();
  }, [activeCategory]);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prevItem = () =>
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  const nextItem = () =>
    setCurrentIndex((prev) => (prev + 1) % items.length);

  return (
    <div>
      <CoverSection />

      <div className="container">
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <div className="gallery">
          {items.map((item, index) => (
            <GalleryItem
              key={item.id}
              item={item}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          item={items[currentIndex]}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}
    </div>
  );
}
