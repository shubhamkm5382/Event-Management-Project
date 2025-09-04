import React from 'react';
import './CoverSection.css';

const CoverSection = ({ activeCategory, coverImages }) => {
  return (
    <section 
      className="cover" 
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url("${coverImages[activeCategory]}")`
      }}
    >
      <div className="cover-content">
        <h1 className="cover-title">
          {activeCategory === 'all' ? 'All Events' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Gallery
        </h1>
        <p className="cover-subtitle">
          Explore our curated collection of event photos, videos, shorts, and albums
        </p>
        <a href="#gallery-section" className="cover-btn">Explore Gallery</a>
      </div>
      <div className="scroll-indicator">
        <i className="fas fa-chevron-down"></i>
      </div>
    </section>
  );
};

export default CoverSection;