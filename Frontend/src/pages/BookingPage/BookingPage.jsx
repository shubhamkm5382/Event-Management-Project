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

  // ✅ Media states
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Event Info states
  const [eventInfo, setEventInfo] = useState([]);
  const [eventLoading, setEventLoading] = useState(true);

  // Refs
  const bookingFormRef = useRef(null);
  const extraGalleryRef = useRef(null);

  // Lightbox states
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Fetch Media
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/media/bookingpage/${category}`); 
        const data = await res.json();
        setMedia(data);
      } catch (err) {
        console.error("Error fetching media:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [category]);

  // ✅ Fetch Event Info
useEffect(() => {
  const fetchEventInfo = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/event-info/by-type/${category.toLowerCase()}`);
      const data = await res.json();
      // data array hai → pehle element ko hi pass kar do
      setEventInfo(data[0]);
    } catch (err) {
      console.error("Error fetching event info:", err);
    } finally {
      setEventLoading(false);
    }
  };

  fetchEventInfo();
}, [category]);


  // ✅ Lightbox Handlers
  const openLightbox = (index) => {
    if (typeof index !== "number") return;
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const showNext = () => setCurrentIndex((prev) => (prev + 1) % media.length);

  const showPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);

  // ✅ Scroll to Extra Gallery
  const scrollToExtraGallery = () => {
    if (extraGalleryRef.current) {
      extraGalleryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ✅ Loader for media
  if (loading) return <p>Loading gallery...</p>;

  // ✅ Extract only urls
  const imageUrls = media.map((item) => item.media_url);

  return (
    <div className={styles["booking-page-container"]}>
      <div className={styles.container}>

        {/* {console.log(eventInfo)} */}
        
        {/* ✅ Gallery */}
        {imageUrls.length > 0 && (
          <Gallery
            images={imageUrls.slice(0, 5)}
            onImageClick={openLightbox}
            scrollToExtraGallery={scrollToExtraGallery}
            totalImagesCount={imageUrls.length}
          />
        )}

        {/* ✅ Event Info + Booking Form */}
        <div className={styles.content}>
          {eventLoading ? (
            <p>Loading event info...</p>
          ) : (
            <EventInfo eventInfo={eventInfo} />

            // <EventInfo eventInfo={eventInfo} />
          )}
          <BookingForm bookingFormRef={bookingFormRef} />
        </div>

        {/* ✅ Extra Gallery */}
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

      {/* ✅ Lightbox */}
      <Lightbox
        images={imageUrls}
        isOpen={lightboxOpen}
        currentIndex={currentIndex}
        onClose={closeLightbox}
        onNext={showNext}
        onPrev={showPrev}
      />

      {/* ✅ Floating Booking Button */}
      <FloatingBookingButton bookingFormRef={bookingFormRef} />
    </div>
  );
};

export default BookingPage;
