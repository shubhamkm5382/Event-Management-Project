import React, { useState, useEffect } from "react";
import styles from "./GalleryPage.module.css";
import CoverSection from "../../components/GalleryPage/CoverSection/CoverSection";
import CategoryTabs from "../../components/GalleryPage/CategoryTabs/CategoryTabs";
import GalleryItem from "../../components/GalleryPage/GalleryItem/GalleryItem";
import Lightbox from "../../components/GalleryPage/Lightbox/Lightbox";
import { useParams } from "react-router-dom";  

const categories = ["photo", "video", "shorts", "album"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("photo");
  const [items, setItems] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
   const { category } = useParams(); 

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/media/${category}/${activeCategory}`);
        console.log(category);
        
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    }
    fetchData();
  }, [category, activeCategory]);
  
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

      <div className={styles.container}>
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <div className={styles.gallery}>

          {items.map((item, index) => (
            <GalleryItem
              key={item.media_id}
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
