import React from 'react';
import './MediaModal.css';

const MediaModal = ({ 
  isEditing, 
  formData, 
  mediaPreview, 
  onClose, 
  onFormChange, 
  onFileChange, 
  onCoverChange, 
  onSave 
}) => {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{isEditing ? "Edit Media" : "Add Media"}</h2>
        <div className="image-preview">
          {mediaPreview ? (
            <img src={mediaPreview} alt="Preview" />
          ) : (
            <span>Media Preview</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="media-title">Title</label>
          <input 
            type="text" 
            id="media-title" 
            name="title"
            placeholder="Enter media title" 
            value={formData.title}
            onChange={onFormChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="media-desc">Description</label>
          <input 
            type="text" 
            id="media-desc" 
            name="desc"
            placeholder="Enter media description" 
            value={formData.desc}
            onChange={onFormChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="media-type">Type</label>
          <select 
            id="media-type" 
            name="type"
            value={formData.type}
            onChange={onFormChange}
          >
            <option value="photo">Photo</option>
            <option value="video">Video</option>
            <option value="short">Short</option>
            <option value="album">Album</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="media-category">Category</label>
          <select 
            id="media-category" 
            name="category"
            value={formData.category}
            onChange={onFormChange}
          >
            <option value="wedding">Wedding</option>
            <option value="birthday">Birthday</option>
            <option value="farewell">Farewell</option>
            <option value="christmas">Christmas</option>
            <option value="corporate">Corporate</option>
            <option value="anniversary">Anniversary</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="media-file">File / URL</label>
          <input 
            type="file" 
            id="media-file" 
            accept="image/*,video/*"
            onChange={onFileChange}
          />
        </div>
        {formData.type === "album" && (
          <div className="form-group">
            <label htmlFor="cover-photo">Cover Photo (For Album)</label>
            <input 
              type="file" 
              id="cover-photo" 
              accept="image/*"
              onChange={onCoverChange}
            />
          </div>
        )}
        <div className="modal-buttons">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default MediaModal;