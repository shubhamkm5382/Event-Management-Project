import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import About from "./pages/about/About";
import Services from "./pages/services/Services";
import BookingPage from "./pages/BookingPage/BookingPage";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import Login from "./pages/login/Login";

function App() {
  const [hideLayout, setHideLayout] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  return (
    <>
      {!hideLayout && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/bookingpage/:category" element={<BookingPage />} />
        <Route path="/gallery/:category" element={<GalleryPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;