import React, { useState, useEffect } from "react";
import styles from "./UpdateMedia.module.css";

export default function UpdateMedia({ media, onClose }) {
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    if (media) {
      setFormData({
        eventType: media.event_type || "",
        eventTitle: media.media_title || "",
        description: media.media_description || "",
        mediaLocation: media.media_location || "",
        createDate: media.media_date ? media.media_date.split("T")[0] : ""
      });
      setMediaType(media.media_type || "");

      if (media.media_url) {
        setFile({ name: "Existing Media", url: media.media_url });
      }

      setLoading(false);
    }
  }, [media]);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setUrl("");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      setFile(droppedFiles[0]);
      setUrl("");
    }
  };

  const handleDragOver = (e) => e.preventDefault();

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ❗️ Tum apna update logic yaha likh sakte ho
    console.log("Form data:", formData, "File:", file);
    alert("Submit logic yaha likhna hai");
  };

  const handleCancel = () => {
    onClose();
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Loading media details...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Update Media Item</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
<div className={styles.field}>
  <label>Event Type</label>
  <select
    name="eventType"
    value={formData.eventType}
    onChange={handleInputChange}
  >
    <option value="">-- Select Event Type --</option>
    <option value="wedding">Wedding</option>
    <option value="farewell">Farewell</option>
    <option value="birthday">Birthday</option>
    <option value="corporate">Corporate</option>
    <option value="anniversary">Anniversary</option>
  </select>
</div>


          <div className={styles.field}>
            <label>Event Title *</label>
            <input
              type="text"
              name="eventTitle"
              placeholder="Enter event title"
              value={formData.eventTitle}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Media Type</label>
            <select
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value)}
            >
              <option value="photo">Photo</option>
              <option value="video">Video</option>
              <option value="short">Short</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
            />
          </div>

          <div className={styles.field}>
            <label>Media Location</label>
            <input
              type="text"
              name="mediaLocation"
              placeholder="e.g. Delhi, India"
              value={formData.mediaLocation}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.field}>
            <label>Create Date</label>
            <input
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
                <div className={styles.dropzoneIcon}>📤</div>
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
                  onKeyPress={(e) => e.key === "Enter" && handleUrlAdd()}
                />
                <button type="button" onClick={handleUrlAdd}>
                  Add URL
                </button>
              </div>
            </>
          ) : (
            <div className={styles.singlePreview}>
              <div className={styles.previewItem}>
                {mediaType === "Video" ? (
                  <video
                    src={file.url || URL.createObjectURL(file)}
                    controls
                    width="100%"
                  />
                ) : (
                  <img
                    src={file.url || URL.createObjectURL(file)}
                    alt="Media preview"
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
            </div>
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
