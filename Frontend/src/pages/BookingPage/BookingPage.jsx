import React, { useRef, useState } from "react";
import "../BookingPage/BookingPage.css";

import Gallery from "../../components/BookingPage/Gallery/Gallery";
import ExtraGallery from "../../components/BookingPage/ExtraGallery/ExtraGallery";
import BookingForm from "../../components/BookingPage/BookingForm/BookingForm";
import Lightbox from "../../components/BookingPage/Lightbox/Lightbox";
import FloatingBookingButton from "../../components/BookingPage/FloatingBookingBtn/FloatingBookingBtn";

import EventInfo from "../../components/BookingPage/EventInfo/EventInfo";
import Packages from "../../components/BookingPage/Packages/Packages";

const BookingPage = () => {
  const images = [
    "https://images.pexels.com/photos/265947/pexels-photo-265947.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600",
    "https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600",
    "https://images.pexels.com/photos/179907/pexels-photo-179907.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600",
    "https://images.pexels.com/photos/256737/pexels-photo-256737.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600",
    "https://images.pexels.com/photos/265920/pexels-photo-265920.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600",
    // extra gallery images
    "https://images.pexels.com/photos/169189/pexels-photo-169189.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600",
    "https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600",
    "https://images.pexels.com/photos/265940/pexels-photo-265940.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600",
    "https://images.pexels.com/photos/265949/pexels-photo-265949.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600",
    "https://images.pexels.com/photos/172194/pexels-photo-172194.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600",
    "https://images.pexels.com/photos/2959194/pexels-photo-2959194.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600",
    "https://images.pexels.com/photos/265916/pexels-photo-265916.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600",
    "https://images.pexels.com/photos/265898/pexels-photo-265898.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600"
  ];

  const bookingFormRef = useRef(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    if (typeof index !== "number") return;
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const showPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="booking-page-container">
      <div className="container">
        <Gallery images={images.slice(0,5)} onImageClick={openLightbox} />

        <div className="content">
          {/* EventInfo (previously inline .info) */}
          <EventInfo /> 

          {/* Booking form stays to the right */}
          <BookingForm bookingFormRef={bookingFormRef} />
        </div>

        {/* Packages section (placed below info/description as before) */}
        <Packages />

        <h2 className="gallery-title">More Wedding Moments</h2>
        <ExtraGallery images={images.slice(5)} onImageClick={(i) => openLightbox(i + 5)} />
      </div>

      <Lightbox
        images={images}
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
