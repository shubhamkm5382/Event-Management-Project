import React from 'react';
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
import ContactUs from "./pages/ContactUsPage/ContactUsPage"


import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login";

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
        <Route path="/contact" element={<ContactUs />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}


export default App;