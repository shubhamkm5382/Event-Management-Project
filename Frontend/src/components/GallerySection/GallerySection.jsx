import React from 'react';
import './GallerySection.css'; // This is the correct import

const GallerySection = ({ 
  mediaItems, 
  activeType, 
  isAdmin, 
  onTypeChange, 
  onEditMedia, 
  onDeleteMedia, 
  onOpenLightbox 
}) => {
  return (
    <div className="gallery-container">
      <div className="gallery-header" id="gallery-section">
        <h2 className="gallery-title">Featured Events</h2>
        <p className="gallery-subtitle">Discover memorable moments from various events</p>
      </div>

      <div className="filter-bar">
        {["photo", "video", "short", "album"].map(type => (
          <button 
            key={type}
            className={`filter-btn ${activeType === type ? 'active' : ''}`}
            onClick={() => onTypeChange(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1) + "s"}
          </button>
        ))}
      </div>

      <div className="gallery">
        {mediaItems.map((item, index) => (
          <div 
            key={item.id} 
            className="gallery-item"
            data-type={item.type}
            data-category={item.category}
            onClick={() => !isAdmin && onOpenLightbox(index)}
          >
            <img src={item.file} alt={item.title} className="gallery-image" />
            <div className="overlay">
              <h3 className="image-title">{item.title}</h3>
              <p className="image-desc">{item.desc}</p>
              <div className="image-meta">
                <div className="likes"><i className="fas fa-heart"></i> {item.likes}</div>
                <div className="date"><i className="fas fa-calendar"></i> {item.date}</div>
              </div>
            </div>
            {isAdmin && (
              <div className="admin-item-actions">
                <button 
                  className="action-btn edit-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditMedia(item.id);
                  }}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  className="action-btn delete-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteMedia(item.id);
                  }}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GallerySection;