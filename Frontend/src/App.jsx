import React, { useState } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import About from "./pages/about/About";
import Services from "./pages/services/Services";
import Gallery from "./pages/Gallery/Gallery";
// import Login from "./components/LoginModal/LoginModal";
import Login from "./pages/login/Login";

function App() {
  const [hideLayout, setHideLayout] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  return (
    <>
      {!hideLayout && <Header onLoginClick={handleLoginClick} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />} />
        <Route path="/gallery/:category" element={<Gallery showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;