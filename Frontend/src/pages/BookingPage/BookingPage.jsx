import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";  
import styles from "../BookingPage/BookingPage.module.css";

import Gallery from "../../components/BookingPage/MainGallery/MainGallery";
import ExtraGallery from "../../components/BookingPage/ExtraGallery/ExtraGallery";
import BookingForm from "../../components/BookingPage/BookingForm/BookingForm";
import Lightbox from "../../components/BookingPage/Lightbox/Lightbox";
import FloatingBookingButton from "../../components/BookingPage/FloatingBookingBtn/FloatingBookingBtn";
import EventInfo from "../../components/BookingPage/EventInfo/EventInfo";

const BookingPage = () => {
  const { category } = useParams(); 
  const [media, setMedia] = useState([]); // pura object store karenge
  const [loading, setLoading] = useState(true);

  const bookingFormRef = useRef(null);
  const extraGalleryRef = useRef(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/media/bookingpage/${category}`); 
        const data = await res.json();
        setMedia(data); // ab media objects ka pura array aa jayega
      } catch (err) {
        console.error("Error fetching media:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [category]);

  const openLightbox = (index) => {
    if (typeof index !== "number") return;
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const showNext = () => setCurrentIndex((prev) => (prev + 1) % media.length);

  const showPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);

  const scrollToExtraGallery = () => {
    if (extraGalleryRef.current) {
      extraGalleryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) return <p>Loading...</p>;

  // sirf urls nikalne ke liye ek array bana lo
  const imageUrls = media.map((item) => item.media_url);

  return (
    <div className={styles["booking-page-container"]}>
      <div className={styles.container}>
        {imageUrls.length > 0 && (
          <Gallery
            images={imageUrls.slice(0, 5)}
            onImageClick={openLightbox}
            scrollToExtraGallery={scrollToExtraGallery}
            totalImagesCount={imageUrls.length}
          />
        )}

        <div className={styles.content}>
          <EventInfo />
          <BookingForm bookingFormRef={bookingFormRef} />
        </div>

        {imageUrls.length > 5 && (
          <>
            <h2 className={styles["gallery-title"]}>More Wedding Moments</h2>
            <ExtraGallery
              ref={extraGalleryRef}
              images={imageUrls.slice(5)}
              onImageClick={(i) => openLightbox(i + 5)}
            />
          </>
        )}
      </div>

      <Lightbox
        images={imageUrls}
        isOpen={lightboxOpen}
        currentIndex={currentIndex}
        onClose={closeLightbox}
        onNext={showNext}
        onPrev={showPrev}
      />

      <FloatingBookingButton bookingFormRef={bookingFormRef} />
    </div>
  );
};

export default BookingPage;
