import React from 'react';
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/HomePage/HomePage";
import About from "./pages/about/About";
import BookingPage from "./pages/BookingPage/BookingPage";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import Login from "./pages/LoginPage/Login";
import ContactUsPage from "./pages/ContactUsPage/ContactUsPage"
import ServicesPage from "./pages/ServicesPage/ServicesPage"

import { useLocation } from "react-router-dom";

import SignInPage from "./pages/LoginPage/SignInPage";
import SignUpPage from "./pages/LoginPage/SignUpPage";
import AfterSignInRedirect from "./pages/LoginPage/AfterSignInRedirect";

function App() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login";

  return (
    <>
      {!hideLayout && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/bookingpage/:category" element={<BookingPage />} />
        <Route path="/gallery/:category" element={<GalleryPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<ContactUsPage />} />

        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/after-sign-in" element={<AfterSignInRedirect />} />

      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}


export default App;