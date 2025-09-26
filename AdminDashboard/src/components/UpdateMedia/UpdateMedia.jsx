import React, { useState } from "react";
import styles from "./UpdateMedia.module.css";

export default function UpdateMedia() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [mediaType, setMediaType] = useState("Photo");
  const [formData, setFormData] = useState({
    eventType: "",
    eventTitle: "",
    description: "",
    mediaLocation: "",
    createDate: ""
  });

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setUrl(""); // Clear URL if file is selected
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      setFile(droppedFiles[0]);
      setUrl(""); // Clear URL if file is dropped
    }
  };

  const handleUrlAdd = () => {
    if (url.trim()) {
      setFile({ name: "URL Media", url: url.trim() });
      setUrl("");
    }
  };

  const removeMedia = () => {
    setFile(null);
    setUrl("");
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!file) {
      alert("Please add a media file or URL");
      return;
    }

    if (!formData.eventTitle.trim()) {
      alert("Please enter an event title");
      return;
    }

    // Here you would typically send the data to your backend
    console.log("Media to update:", {
      ...formData,
      mediaType,
      file: file.url ? { type: "url", value: file.url } : { type: "file", value: file }
    });

    alert("Media updated successfully!");
  };

  const handleCancel = () => {
    setFile(null);
    setUrl("");
    setFormData({
      eventType: "",
      eventTitle: "",
      description: "",
      mediaLocation: "",
      createDate: ""
    });
    setMediaType("Photo");
  };

  return (
    <div className={styles.container}>
      <h2>Update Media Item</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="eventType">Event Type</label>
            <select 
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleInputChange}
            >
              <option value="">-- Select Event Type --</option>
              <option value="Wedding">Wedding</option>
              <option value="Concert">Concert</option>
              <option value="Birthday">Birthday</option>
              <option value="Corporate">Corporate</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="eventTitle">Event Title *</label>
            <input 
              id="eventTitle"
              type="text" 
              name="eventTitle"
              placeholder="Enter event title" 
              value={formData.eventTitle}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="mediaType">Media Type</label>
            <select 
              id="mediaType"
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value)}
            >
              <option value="Photo">Photo</option>
              <option value="Video">Video</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="description">Description</label>
            <textarea 
              id="description"
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className={styles.field}>
            <label htmlFor="mediaLocation">Media Location</label>
            <input 
              id="mediaLocation"
              type="text" 
              name="mediaLocation"
              placeholder="e.g. Delhi, India" 
              value={formData.mediaLocation}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="createDate">Create Date</label>
            <input 
              id="createDate"
              type="date" 
              name="createDate"
              value={formData.createDate}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className={styles.uploadSection}>
          <label className={styles.uploadLabel}>
            {file ? "📷 Current Media" : "📁 Add Media File"}
          </label>

          {!file ? (
            <>
              <div
                className={styles.dropArea}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById("fileInput").click()}
              >
                <input
                  id="fileInput"
                  type="file"
                  accept={mediaType === "Photo" ? "image/*" : "video/*"}
                  onChange={handleFileChange}
                  className={styles.fileInput}
                />
                <p>Drag & Drop a file here or click to select</p>
                <small>Only one {mediaType.toLowerCase()} file allowed</small>
              </div>

              <div className={styles.or}>OR</div>

              <div className={styles.urlInput}>
                <input
                  type="text"
                  value={url}
                  placeholder={`Enter ${mediaType.toLowerCase()} URL`}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUrlAdd()}
                />
                <button type="button" onClick={handleUrlAdd}>
                  Add URL
                </button>
              </div>
            </>
          ) : (
            <div className={styles.singlePreview}>
              <div className={styles.previewItem}>
                {file.url ? (
                  <img src={file.url} alt="Media preview" />
                ) : (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                  />
                )}
                <span
                  className={styles.removeBtn}
                  onClick={removeMedia}
                  title="Remove media"
                >
                  ×
                </span>
              </div>
              <div className={styles.fileInfo}>
                <p><strong>File:</strong> {file.name || file.url}</p>
                <p><strong>Type:</strong> {mediaType}</p>
                <p><strong>Size:</strong> {file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'URL'}</p>
              </div>
            </div>
          )}

          {file && (
            <p className={styles.fileCount}>
              1 media item selected • {mediaType}
            </p>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.updateBtn}>
            Update Media Item
          </button>
          <button type="button" className={styles.cancelBtn} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}