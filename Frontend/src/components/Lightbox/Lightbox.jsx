import React from 'react';
import './Lightbox.css';

const Lightbox = ({ media, currentIndex, onClose, onNext, onPrev }) => {
  const currentMedia = media[currentIndex];
  
  return (
    <div className="lightbox" onClick={onClose}>
      <div className="close-btn" onClick={onClose}>
        <i className="fas fa-times"></i>
      </div>
      <div className="nav-btn prev-btn" onClick={(e) => { e.stopPropagation(); onPrev(); }}>
        <i className="fas fa-chevron-left"></i>
      </div>
      <div className="nav-btn next-btn" onClick={(e) => { e.stopPropagation(); onNext(); }}>
        <i className="fas fa-chevron-right"></i>
      </div>
      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        <img 
          src={currentMedia.file} 
          alt={currentMedia.title} 
          className="lightbox-img" 
        />
        <div className="lightbox-caption">{currentMedia.title}</div>
      </div>
      <a 
        className="download-btn" 
        href={currentMedia.file} 
        download
        onClick={e => e.stopPropagation()}
      >
        <i className="fas fa-download"></i>
      </a>
    </div>
  );
};

export default Lightbox;