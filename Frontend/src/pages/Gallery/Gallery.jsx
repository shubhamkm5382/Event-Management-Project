import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminControls from '../../components/AdminControls/AdminControls';
import LoginModal from '../../components/LoginModal/LoginModal';
import MediaModal from '../../components/MediaModal/MediaModal';
import CoverSection from '../../components/CoverSection/CoverSection';
import GallerySection from '../../components/GallerySection/GallerySection';
import Lightbox from '../../components/Lightbox/Lightbox';
import './Gallery.css';

const Gallery = ({ showLoginModal, setShowLoginModal }) => {
  const { category } = useParams();
  
  // Data
const galleryData = [
  // Wedding photos
  { id: 1, title: "Bride's Preparation", desc: "Bride getting ready for the ceremony", type: "photo", category: "wedding", file: "https://images.unsplash.com/photo-1544006657-8f661a984ec8?w=400", likes: 150, date: "Sep 1, 2025" },
  { id: 2, title: "Wedding Ceremony", desc: "Exchange of vows at the altar", type: "photo", category: "wedding", file: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400", likes: 180, date: "Sep 1, 2025" },
  { id: 3, title: "First Dance", desc: "Newlyweds' first dance as a married couple", type: "photo", category: "wedding", file: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400", likes: 210, date: "Sep 1, 2025" },
  { id: 4, title: "Wedding Cake", desc: "Beautiful multi-tier wedding cake", type: "photo", category: "wedding", file: "https://images.unsplash.com/photo-1535254972430-4f82b13c9ac4?w=400", likes: 95, date: "Sep 1, 2025" },
  { id: 5, title: "Wedding Album", desc: "Collection of wedding photos", type: "album", category: "wedding", file: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400", cover: true, likes: 200, date: "Jun 10, 2025" },
  
  // Birthday photos
  { id: 6, title: "Birthday Cake", desc: "Colorful birthday cake with candles", type: "photo", category: "birthday", file: "https://images.unsplash.com/photo-1558301214-0de8470c5e7b?w=400", likes: 120, date: "Aug 15, 2025" },
  { id: 7, title: "Balloon Decor", desc: "Festive birthday balloon arrangement", type: "photo", category: "birthday", file: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400", likes: 85, date: "Aug 15, 2025" },
  { id: 8, title: "Gift Opening", desc: "Excited birthday person opening gifts", type: "photo", category: "birthday", file: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400", likes: 75, date: "Aug 15, 2025" },
  { id: 9, title: "Birthday Video", desc: "Fun birthday celebration", type: "video", category: "birthday", file: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400", likes: 120, date: "Aug 15, 2025" },
  
  // Farewell photos
  { id: 10, title: "Farewell Speech", desc: "Colleague giving a farewell speech", type: "photo", category: "farewell", file: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?w=400", likes: 65, date: "Jul 20, 2025" },
  { id: 11, title: "Farewell Gift", desc: "Thoughtful farewell gift presentation", type: "photo", category: "farewell", file: "https://images.unsplash.com/photo-1519452635268-2c6d0c614c5a?w=400", likes: 70, date: "Jul 20, 2025" },
  { id: 12, title: "Group Photo", desc: "Final group photo with colleagues", type: "photo", category: "farewell", file: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400", likes: 90, date: "Jul 20, 2025" },
  { id: 13, title: "Farewell Short", desc: "Emotional farewell clip", type: "short", category: "farewell", file: "https://images.unsplash.com/photo-1555489436-c795a5c4e643?w=400", likes: 80, date: "Jul 20, 2025" },
  
  // Christmas photos
  { id: 14, title: "Christmas Tree", desc: "Beautifully decorated Christmas tree", type: "photo", category: "christmas", file: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=400", likes: 250, date: "Dec 25, 2024" },
  { id: 15, title: "Santa Claus", desc: "Santa handing out gifts to children", type: "photo", category: "christmas", file: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400", likes: 180, date: "Dec 25, 2024" },
  { id: 16, title: "Christmas Dinner", desc: "Festive holiday feast", type: "photo", category: "christmas", file: "https://images.unsplash.com/photo-1573316364756-33b34d5a5c77?w=400", likes: 145, date: "Dec 25, 2024" },
  { id: 17, title: "Caroling Night", desc: "Group Christmas caroling event", type: "photo", category: "christmas", file: "https://images.unsplash.com/photo-1519455956582-56d6ccb77a9e?w=400", likes: 110, date: "Dec 24, 2024" },
  
  // Corporate photos
  { id: 18, title: "Team Meeting", desc: "Team brainstorming session", type: "photo", category: "corporate", file: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=400", likes: 75, date: "Nov 12, 2024" },
  { id: 19, title: "Office Party", desc: "Annual corporate celebration", type: "photo", category: "corporate", file: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400", likes: 95, date: "Dec 15, 2024" },
  { id: 20, title: "Conference", desc: "Annual industry conference", type: "photo", category: "corporate", file: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=400", likes: 85, date: "Oct 5, 2024" },
  { id: 21, title: "Award Ceremony", desc: "Employee recognition event", type: "photo", category: "corporate", file: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400", likes: 105, date: "Sep 20, 2024" },
  
  // Anniversary photos
  { id: 22, title: "Anniversary Dinner", desc: "Romantic anniversary celebration", type: "photo", category: "anniversary", file: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400", likes: 165, date: "May 30, 2024" },
  { id: 23, title: "Renewing Vows", desc: "Couple renewing their wedding vows", type: "photo", category: "anniversary", file: "https://images.unsplash.com/photo-1501930282483-3a673ba01c25?w=400", likes: 195, date: "May 30, 2024" },
  { id: 24, title: "Anniversary Gift", desc: "Special anniversary present", type: "photo", category: "anniversary", file: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400", likes: 125, date: "May 30, 2024" },
  { id: 25, title: "Family Celebration", desc: "Extended family anniversary party", type: "photo", category: "anniversary", file: "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?w=400", likes: 145, date: "May 30, 2024" }
];

  const coverImages = {
    all: "https://via.placeholder.com/800x200.png?text=All+Events+Cover",
    wedding: "https://via.placeholder.com/800x200.png?text=Wedding+Cover",
    birthday: "https://via.placeholder.com/800x200.png?text=Birthday+Cover",
    farewell: "https://via.placeholder.com/800x200.png?text=Farewell+Cover",
    christmas: "https://via.placeholder.com/800x200.png?text=Christmas+Cover",
    corporate: "https://via.placeholder.com/800x200.png?text=Corporate+Cover",
    anniversary: "https://via.placeholder.com/800x200.png?text=Anniversary+Cover"
  };

  // State
  const [isAdmin, setIsAdmin] = useState(false);
  const [mediaItems, setMediaItems] = useState([...galleryData]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editingMediaId, setEditingMediaId] = useState(null);
  const [activeCategory, setActiveCategory] = useState(category || "all");
  const [activeType, setActiveType] = useState("photo");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    type: "photo",
    category: "wedding",
    file: null,
    cover: null
  });
  const [mediaPreview, setMediaPreview] = useState(null);

  // Update active category when URL parameter changes
  useEffect(() => {
    if (category) {
      setActiveCategory(category);
    }
  }, [category]);

  // Handle login modal from header
  useEffect(() => {
    if (showLoginModal) {
      setShowLoginModal(false);
      setLoginModalOpen(true);
    }
  }, [showLoginModal, setShowLoginModal]);

  // Filter media based on current selections
  const filteredMedia = mediaItems.filter(item =>
    (activeType === "all" || item.type === activeType) &&
    (activeCategory === "all" || item.category === activeCategory)
  );

  // Event handlers
  const handleLogin = () => {
    setLoginModalOpen(true);
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  const submitLogin = (username, password) => {
    if (username === "admin" && password === "password") {
      setIsAdmin(true);
      setLoginModalOpen(false);
    } else {
      alert("Invalid credentials. Try admin/password");
    }
  };

  const handleCategoryChange = (newCategory) => {
    setActiveCategory(newCategory);
  };

  const handleTypeChange = (type) => {
    setActiveType(type);
  };

  const openMediaForm = (id = null) => {
    if (id) {
      const item = mediaItems.find(m => m.id === id);
      setFormData({
        title: item.title,
        desc: item.desc,
        type: item.type,
        category: item.category,
        file: null,
        cover: null
      });
      setMediaPreview(item.file);
      setEditingMediaId(id);
    } else {
      setFormData({
        title: "",
        desc: "",
        type: "photo",
        category: "wedding",
        file: null,
        cover: null
      });
      setMediaPreview(null);
      setEditingMediaId(null);
    }
    setShowMediaModal(true);
  };

  const closeMediaForm = () => {
    setShowMediaModal(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setMediaPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, cover: file }));
    }
  };

  const saveMedia = () => {
    const { title, desc, type, category } = formData;
    if (!title || !desc || !type || !category) {
      alert("Please fill in all fields");
      return;
    }

    if (editingMediaId) {
      // Update existing media
      setMediaItems(prev => prev.map(item => 
        item.id === editingMediaId 
          ? { ...item, title, desc, type, category, file: mediaPreview || item.file }
          : item
      ));
    } else {
      // Add new media
      const newMedia = {
        id: mediaItems.length > 0 ? Math.max(...mediaItems.map(m => m.id)) + 1 : 1,
        title,
        desc,
        type,
        category,
        file: mediaPreview || "https://via.placeholder.com/300x150.png?text=New+Media",
        likes: Math.floor(Math.random() * 100) + 50,
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
      };
      setMediaItems(prev => [...prev, newMedia]);
    }
    
    setShowMediaModal(false);
    alert(editingMediaId ? "Media updated successfully!" : "Media added successfully!");
  };

  const deleteMedia = (id) => {
    if (window.confirm("Are you sure you want to delete this media?")) {
      setMediaItems(prev => prev.filter(m => m.id !== id));
    }
  };

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setShowLightbox(true);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
  };

  const nextMedia = () => {
    setCurrentIndex(prev => (prev + 1) % filteredMedia.length);
  };

  const prevMedia = () => {
    setCurrentIndex(prev => (prev - 1 + filteredMedia.length) % filteredMedia.length);
  };

  return (
    <div className="gallery-page">
      {isAdmin && (
        <AdminControls onAddMedia={() => openMediaForm()} onLogout={handleLogout} />
      )}

      {loginModalOpen && (
        <LoginModal 
          onClose={() => setLoginModalOpen(false)}
          onSubmit={submitLogin}
        />
      )}

      {showMediaModal && (
        <MediaModal 
          isEditing={!!editingMediaId}
          formData={formData}
          mediaPreview={mediaPreview}
          onClose={closeMediaForm}
          onFormChange={handleFormChange}
          onFileChange={handleFileChange}
          onCoverChange={handleCoverChange}
          onSave={saveMedia}
        />
      )}

      <CoverSection 
        activeCategory={activeCategory}
        coverImages={coverImages}
      />

      <GallerySection 
        mediaItems={filteredMedia}
        activeType={activeType}
        isAdmin={isAdmin}
        onTypeChange={handleTypeChange}
        onEditMedia={openMediaForm}
        onDeleteMedia={deleteMedia}
        onOpenLightbox={openLightbox}
      />

      {showLightbox && filteredMedia.length > 0 && (
        <Lightbox 
          media={filteredMedia}
          currentIndex={currentIndex}
          onClose={closeLightbox}
          onNext={nextMedia}
          onPrev={prevMedia}
        />
      )}
    </div>
  );
};

export default Gallery;